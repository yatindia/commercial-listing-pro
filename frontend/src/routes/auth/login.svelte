<script>
   import {slide} from "svelte/transition"
   import {API} from "../../config"
   import Swal from "sweetalert2"
   import {checkSignIn} from "../../util/functions/functions"
   import {onMount} from "svelte"

   onMount(()=>checkSignIn())



   let form = {
       email: "ascdaffffffffsd@dfsl",
       password: "Mirage20#@"
   }

   async function reverify(){
            await fetch(`${API}/auth/reverification`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({email:form.email})
            })
            .then(res => res.json())
            .then((res)=>{
                if (res.response.status) {
                    Swal.fire(
                        'Email Send',
                        'Please verify your account!',
                        'success'
                        )
                } else {
                    Swal.fire(
                    'Somthing went wild?',
                    'Please try again later',
                    'question'
                    )
                }
            })
   }


   async function submit () {
        let error = "";

       if (form.email == "") {
        error = "Email cannot be empty"
       } else if (form.password == "") {
        error = "Password cannot be empty"
       
       } 
        


        if (error != "") {
            Swal.fire({
                icon: "error",
                titleText: error
            })
            return false

        }else{

      
          
            await fetch(`${API}/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(form)
            })
            .then(res => res.json())
            .then(res => {


                if (res.status) {
                    localStorage.setItem("login", JSON.stringify(res.data.token))
                    window.location.href = "/user/account"
                } else if(res.message = "please verify your account"){
                    Swal.fire({
                        icon: "question",
                        titleText: "Verification pending",
                        title: res.message
                    })

                    Swal.fire({
                        title: 'Verification pending',
                        titleText: "would you like to reverify",
                        showDenyButton: true,
                        confirmButtonText: 'Send',
                        denyButtonText: `Don't send`,
                        }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            reverify()
                        } 
                    })


                } else {
                    Swal.fire({
                        icon: "question",
                        titleText: "Somthing Happened",
                        title: res.message
                    })
                }
            })

        }





    }


   
</script>

<svelte:head>
  <link rel="icon" href="/img/favicon.png" />
  <title>Login</title>
</svelte:head>

<section class="signup">

    <form on:submit|preventDefault={()=>submit()} in:slide>

        <div class="cover">
            <h1 class="text-center">Log In</h1>
            <br>
    
      
    
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input bind:value={form.email} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
    
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input bind:value={form.password} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
    
            
            <div class="form-group form-check mt-2">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Keep Me Logged In</label>
            </div>
            <button type="submit" class="btn w-100 mt-2" style="background-color:  #171e3c; color: #fff">Login</button>
    
            <div class="form-group">
                <a href={`./forgotPassword?email=${encodeURIComponent(form.email)}`} class="text-decoration-none d-block text-center w-100 mt-4"
                style="color: #171e3c;"
                >
                   Forgot password
                </a>
            </div>
            <div class="form-group">
                <a 
                    href="/auth/signup" 
                    class="text-decoration-none d-block text-center w-100 mt-2" 
                    style="color: #171e3c;"
                >
                   Don't have an account? Signup
                </a>
            </div>
        </div>

        
    </form>

</section>



<style>
    .signup {
        min-height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #B6D5EB
    }


    form {
        width: 95%;
        max-width: 400px;
        border: 1px solid #B6D5EB;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.173);
    }

 
</style>