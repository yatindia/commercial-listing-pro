<script context="module">
    export function load({url}){


        return {
            props: {
                email : url
            }
        }

    }
</script>

<script>

    export let email
    $:email = email.searchParams.get("email") || '';
</script>

<svelte:head>
  <link rel="icon" href="/img/favicon.png" />
  <title>Password Recovery</title>
</svelte:head>

<section class="signup">

    <form>

        <div class="cover">
            <h1 class="text-center">Recover Password</h1>
            <br>    
    
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input bind:value={email} type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
 
            <button type="submit" class="btn btn-danger w-100 mt-2">Recover Password</button>
    
            <div class="form-group">
                <a href="/auth/signup" class="text-decoration-none text-danger d-block text-center w-100 mt-4">
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
        background-color: #c1202c
    }


    form {
        width: 95%;
        max-width: 400px;
        border: 1px solid red;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.173);
    }

 
</style>