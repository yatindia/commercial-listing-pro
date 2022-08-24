import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import  jwt  from "jsonwebtoken";
import Stripe from 'stripe';
import Property from "./model/Property";
import config from "../config"
const stripe = new Stripe(
  "sk_test_51JuLLQIhf6Tv4HB9mFwvZEmOG0MnL3zcHZAHuzQHdP3enQcLKkaBuZig3UnZLX2bI3iLKKjOb0g2NoHQxNbecTkO00kFtr8Xfd" , {apiVersion: '2022-08-01'});


const connect = () => {
  try { mongoose.connect(`mongodb+srv://yat_REproject:YaTrE123%24%25%5E@cluster0.segtq.mongodb.net/test`);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};


app.use(cors())

// app.use(express.json());
// app.use(cors({
//     origin: true,
//   }))
//   app.use(bodyParser.json())
//   app.use(bodyParser.urlencoded({ extended: false }))

  // server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js



// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_6ae6cde2632030e04dbebcdb8d5d251268149a59e9acc45d6e3a7cc56c3f3140";

app.post('/webhook', express.raw({type: "*/*"}), async(req, res) => {
  console.log('ok');


  const sig:any = req.headers['stripe-signature']
  const payload = req.body
  let secret:any = "whsec_DW0TBXRKwaX9eVD1jN8aEbKTbgNp4XAJ"
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret)
      let userId = JSON.parse((req.body).toString('utf8')).data.object.metadata.id || false
      console.log(userId);
      
      if (userId !== false) {
         await Property.findByIdAndUpdate(userId, {$set: {isPro: true}})
      }
  } catch (error) {
      console.log("error");
      res.sendStatus(500)
      return
  }
  res.sendStatus(200)
  

});



app.get('/' , (req , res) => {
    console.log('ok');
res.send('hi')
})
app.post("/payment/:id", async (req, res) => {


    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: 'Premium', 
                    },
                    unit_amount: 30 * 100,
                },
                quantity: 1,
            },
             ],
             metadata: {
                id : req.params.id
            },
        mode: 'payment',
        success_url: `${config.client}/user/payment/paymentSuccess`,
        cancel_url: `${config.client}/user/payment/paymentFailure`,
      });

      res.send({ url: session.url });
});
 

  

const port = 8000
app.listen(port, () =>{
  connect();
 console.log(`Listening on port ${port}`)});