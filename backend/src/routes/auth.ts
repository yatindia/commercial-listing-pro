import "dotenv/config";
import express, { Application, Request, Response } from "express";
import {User} from "../model/User";
import config from "../config";
import jwt from "jsonwebtoken";
import mailer from "nodemailer";
import sgMail from "@sendgrid/mail"
import ejs from "ejs"
import path from "path"
import { response } from "../types/types";

sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);


var hbs = require("nodemailer-express-handlebars");



const jwtToken = process.env.JWT_TOKEN_KEY!;
const jwtToken2 = process.env.JWT_TOKEN_KEY2!;
const jwtOTPToken = process.env.JWT_OTP_KEY!;




const auth: Application = express();

auth.use(express.urlencoded({ extended: true }));


auth.post("/register", async (req: Request, res: Response) => {
  let response: response = {
    status: false,
    message: "Something Went wrong, Could Not signup at the moment.",
  };

  const emailCheck = (await User.findOne({ email: req.body.email, })) || false;



  if (emailCheck !== false) {

    response.message = `The email Already Exists Please Signin`;
  } 
  else {

    try {
      let userData = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        profile: req.body.profile
      };

      const passwordStrengthPattern = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i;
      const emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+/i;

      if (!(req.body.email).match(emailPattern)) {
        throw new Error("this is not a valid email address");
      }
      if (!req.body.password.match(passwordStrengthPattern)) {
        throw new Error("weak password");
      }
      let createUser = new User(userData);

      await createUser
        .save()
        .then(async () => {
          response.status = true;
          response.message =
            "Account Created verify before Login verifcation link sent to your email,It will expire in 1 hour";
        })
        .catch((error: any) => {
          response.status = false;
          response.message = error.message;
        });

      let token = jwt.sign( { email: req.body.email, }, jwtToken, { expiresIn: "1h", } );



      let emailBody = await ejs.renderFile( path.join(__dirname, "../views/email/email.ejs"), {
        link: `${config.API}/auth/verify?token=${token}`,
        purpose: "Account Activation"
      })
      let msg = {
        to: req.body.email,
        from: 'server@commerciallistingspro.com', // Use the email address or domain you verified above
        subject: 'Account Verification ✔',
        text: `${config.API}/auth/verify?token=${token}`,
        html: emailBody
      };


      sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      });



 
    } catch (error: any) {
      response.status = false;
      response.message = error.message;
      
    }
  }
  response.errorMessage = "he is it"

  return res.json({response});
});

auth.get("/verify", async (req: Request, res: Response) => {
  let response: response = {
    status: false,
    message: "somthing went wrong, try later",
  };

  // res.setHeader('Content-Type', 'text/html');

  try {
    let { token }: any = req.query;
    let user: any = jwt.verify(token, jwtToken, (error: any, decode: any) => {
      if (error) {
        return false;
      } else {
        return decode;
      }
    });
    user =
      (await User.findOne({
        email: user.email,
      })) || false;

    if (user) {

      User.findByIdAndUpdate(user._id, { accountVerified: true }).catch(() => {
        throw new Error();
      });

      auth.set("view engine", "hbs");
      auth.set("views", "./src/views/verifySuccess");
      res.render("index", {Client: config.Client});

    } else {
      throw new Error("the token is invalid");
    }
  } catch (error: any) {
    response.status = false;
    response.message = error.message;
  }

  // res.json(response)
});

auth.post("/login", async (req: any, res: Response) => {
  let response: response = {
    status: false,
    message: "somthing went wrong, try later",
  };

  try {
    let loggingUser = await User.findOne({ email: req.body.email });

    if (!loggingUser) {
      throw new Error("an account with this email does not exist");
    }

    if (loggingUser.password != req.body.password) {
      throw new Error("wrong password");
    } else if (loggingUser.accountVerified == false) {
      throw new Error("please verify your account");
    }

    let token = jwt.sign({ id: loggingUser._id }, jwtToken2);
    console.log(loggingUser, token);

    await User.findByIdAndUpdate(loggingUser._id, { login_token: token })
      .then(() => {
        response = {
          status: true,
          message: "logged in",
          data: { token },
        };
      })
      .catch(() => {
        throw new Error("token authorization failed");
      });
  } catch (error: any) {
    response = {
      ...response,
      status: false,
      message: error.message,
    };
  }

  res.json(response);
});

auth.post("/resetpassword", async (req: Request, res: Response) => {
  let response: response = {
    status: false,
    message: "somthing went wrong, try later",
  };

  await User.findOne({ email: req.body.email })
    .then(async (res: any) => {
      if (!res) {
        // console.log('hh')
        throw new Error("user does not exist.");
      }
      if (!res.accountVerified) {
        throw new Error("user account not verified.");
      }

      let token = jwt.sign(
        {
          email: req.body.email,
        },
        jwtToken2
      );

      let emailBody = await ejs.renderFile( path.join(__dirname, "../views/password/password.ejs"), {
        link: `${config.API}/auth/passwordquery?token=${token}`,
        purpose: "Password Reset"
      })
      let msg = {
        to: req.body.email,
        from: 'server@commerciallistingspro.com', // Use the email address or domain you verified above
        subject: 'Account Password Reset ✔',
        text: `${config.API}/auth/passwordquery?token=${token}}`,
        html: emailBody
      };


      sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      });







      response.status = true;
      response.message = "please check your e-mail To Reset Password";
    })
    .catch((error: any) => {
      response = { ...response, status: false, message: error.message };
    });

  res.json(response);
});

auth.get("/passwordquery", async (req: Request, res: Response) => {
  let response: response = {
    status: false,
    message: "somthing went wrong, try later",
  };

  // res.setHeader('Content-Type', 'text/html');

  try {
    let { token }: any = req.query;
    let user: any = jwt.verify(token, jwtToken2, (error: any, decode: any) => {
      if (error) {
        return false;
      } else {
        return decode;
      }
    });
    user =
      (await User.findOne({
        email: user.email,
      })) || false;

    if (user) {
      User.findByIdAndUpdate(user._id, { accountVerified: true }).catch(() => {
        throw new Error();
      });
      let newuser = { email: user.email };
      auth.set("view engine", "hbs");
      auth.set("views", "./src/views/passwordUpdate");
      res.render("index", { newuser, API: config.API, Client: config.Client  });
    } else {
      throw new Error("the token is invalid");
    }
  } catch (error: any) {
    response.status = false;
    response.message = error.message;
  }
});

auth.post("/updatepassword", async (req: Request, res: Response) => {
  let response: response = {
    status: false,
    message: "somthing went wrongo, try later",
  };
  console.log(req.body);
  try {
    const passwordStrengthPattern =
      /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i;
    if (!req.body.password.match(passwordStrengthPattern)) {
      throw new Error("weak password");
    } else {
     let user:any =
      (await User.findOne({
        email: req.body.email,
      }));
      await User.findByIdAndUpdate(user._id, {
        password: req.body.password,
      });

      response.message = "Password Updated Successfully";
    }
  } catch (error: any) {
    response.status = false;
    response.message = error.message;
  }

  res.json(response);
});

auth.post("/reverification", async (req: any, res: Response) => {
  let response: response = {
    status: false,
    message: "somthing went wrong, try later",
  };

  try {
    await User.findOne({ email: req.body.email }).then(async (user: any) => {
      if (!user) {
        throw new Error("user does not exist create new account.");
      }
      if (user && !user.accountVerified) { let token = jwt.sign( { email: req.body.email, }, process.env.JWT_TOKEN_KEY! );

        let emailBody = await ejs.renderFile( path.join(__dirname, "../views/email/email.ejs"), {
          link: `${config.API}/auth/verify?token=${token}`,
          purpose: "Account Activation"
        })
        let msg = {
          to: req.body.email,
          from: 'server@commerciallistingspro.com', // Use the email address or domain you verified above
          subject: 'Account Re Verification ✔',
          text: `${config.API}/auth/verify?token=${token}`,
          html: emailBody
        };
  
  
        sgMail
        .send(msg)
        .then(() => {}, error => {
          console.error(error);
  
          if (error.response) {
            console.error(error.response.body)
          }
        });
  


        response.status = true;
        response.message =
          "verifcation link sent to your email,It will expire in 1 hour";
      }
    });
  } catch (error: any) {
    response.status = false;
    response.message = error.message;
  }
  return res.json({
    response,
  });
});


export default auth;



