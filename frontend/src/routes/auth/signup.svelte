<script>
    import {slide} from "svelte/transition"
    import {API} from "../../config"
    import Swal from 'sweetalert2'
    import { passwordStrength } from 'check-password-strength'
    import ProfileUpload from "../../components/ProfileUpload.svelte";
    import axios from "axios";

    const passwordStrengthPattern =
        /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i;

    let form = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        mobileNumber: "",
        profile: ""
    }

   

    let isPasswordMacho;
    $: isPasswordMacho = passwordStrength(form.password)




    async function submit () {
        let error = "";

       if (form.password == "") {
        error = "Password cannot be empty"
       } else if (form.password != form.passwordConfirm) {
        error = "Password doesn't match"
       
       } else if ((form.password).match(passwordStrengthPattern) == null) {
        error = "Weak password detected, \n please enter a strong password"
       } else if ((form.profile) == null) {
        error = "No image Selected, \n please add a profile image"
       } 
        


        if (error != "") {
            Swal.fire({
                icon: "error",
                titleText: error
            })

            return false
        }else{

            const image = form.profile;
              let img = new FormData
              img.append("image", image)

              await axios({
                method: "post",
                url : `${API}/user/imageupload`,
                data: {image}
              })
              .then(res => {
                if (res.data.status) {
                  
                  return  res.data.data
                  
                }
              })
              .then(async (profileImage)=>{

                let sendData = {
                name: `${form.firstName} ${form.lastName}`,
                email: form.email,
                phoneNumber: form.mobileNumber,
                password: form.password,
                profile: profileImage
            }

      
                    await fetch(`${API}/auth/register`,{
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },

                        body: JSON.stringify(sendData)
                    })
                    .then(res => res.json())
                    .then(res => {

                        console.log(res.response.message);

                        if (res.response.status) {
                            Swal.fire({
                            icon: "success",
                            titleText: "Email Send",
                            text: "Please check your email & verify your account. \n Email is only valid for 1hr"
                        })
                        } else {
                            Swal.fire({
                            icon: "question",
                            titleText: "Somthing went wrong",
                            text: res.response.message
                        })
                        }
                    })

              })


        }



    }

</script>
<svelte:head>
  <link rel="icon" href="/img/favicon.png" />
  <title>Sign Up</title>
</svelte:head>

<section class="signup">

<div class="container-nl">
    <form on:submit|preventDefault={()=>{submit()}} autocomplete="false" in:slide>
        <h1 class="text-center">Signup</h1>
        <br>

        <div class="form-group">
            <div class="row">
                <div class="col">
                  <ProfileUpload bind:avatar={form.profile} />
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="exampleInputEmail1">First Name</label>
                        <input required bind:value={form.firstName} type="text" class="form-control" placeholder="Enter First Name">
                    </div>
                </div>

                <div class="col">
                    <div class="form-group">
                        <label for="exampleInputPassword1">Last Name</label>
                        <input required bind:value={form.lastName} type="text" class="form-control"  placeholder="Enter Last Name">
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input required bind:value={form.email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input required bind:value={form.password} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            <div 
            class:bg-danger={(isPasswordMacho.value == "Too weak" || isPasswordMacho.value == "Weak")}
            class:bg-warning={isPasswordMacho.value == "Medium"}
            class:bg-success={isPasswordMacho.value == "Strong"}
            class="d-flex justify-content-center mt-2 mb-4">
                <p 
                class:text-white={(isPasswordMacho.value == "Too weak" || isPasswordMacho.value == "Weak" || isPasswordMacho.value == "Strong")}
                class:text-dark={isPasswordMacho.value == "Medium"}
                class="m-0 p-2"> 
                {isPasswordMacho.value}  
                &nbsp;

                {@html

                (form.password).match(passwordStrengthPattern)
                 ?`<i class="fa-solid fa-circle-check"></i>`
                 :`<i class="fa-solid fa-circle-xmark"></i>`
                 }
            </p>
            </div>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Confim Password</label>
            <input required bind:value={form.passwordConfirm} type="text" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password">
        </div>

        <div class="form-group">
            <label for="exampleInputEmail1">Mobile Number</label>
            <input required bind:value={form.mobileNumber} type="text" class="form-control" placeholder="Enter Mobile Number">
        </div>

        <button type="submit" class="btn w-100 mt-2"  style="background-color:  #171e3c; color: #fff">Sign Up</button>

        <div class="form-group">
            <a 
            href="/auth/login" 
            style="color: #171e3c;"
            class="text-decoration-none d-block text-center w-100 mt-4">
                Already have an account? Login
            </a>
        </div>

        
    </form>
</div>

</section>

<style>
    .signup {
        min-height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("/img/city.png");
    
    }

    form {
        width: 95%;
        max-width: 400px;
        border: 5px solid  #B6D5EB;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.173);
    }

    .container-nl{
        width: 100%;
        min-height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.547);
    }
</style>