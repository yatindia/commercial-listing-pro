<script>
    import {API} from "../../config"
    import {protectedRoute} from "../../components/functions"
    
    import {onMount} from "svelte"
    onMount(()=>protectedRoute())

    let body = 0;
    let token;
    let data = {}
    let propertiess = {}
    let firstname = ""
    let lastname = ""
    
    let newPassword = ""
    let oldPassword = ""

    onMount(async ()=>{

        token = JSON.parse(localStorage.getItem("login"))

        await fetch(`${API}/user`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `<Bearer> ${token}`
            }
        })
        .then(res => res.json())
        .then((res)=>{
            if (res.status) {
                data = res.data
                console.log(res.data);
            }
        })

        


    })


const sendNumber = async (e) => {
    let phoneNumber = {phoneNumber: data.phoneNumber}

    await fetch(`${API}/auth/sendOTP`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `<Bearer> ${token}`
            },
      body: JSON.stringify(phoneNumber),
            
        })
        .then(res => res.json())
        .then((res)=>{
            if (res.status) {
                data = res.data
                console.log(res.data);
            }
        })
}

    
</script>
<svelte:window on:resize={()=>console.log(body)} bind:innerWidth={body} />

    <svelte:head>
        <link rel="icon" href="/img/favicon.png" />
        <title>Settings</title>
      </svelte:head>

<div class="containerr bg-lite">
    <div class="userdetails">
        <h4>
            <strong class="mb-0">User details</strong>

        </h4>
        <h5><span>Name    :</span>{data.name}</h5>
        <h5><span>E-mail  :</span>{data.email}</h5>
        <!-- <h3><span class="fs">Phone   :</span>{data.phoneNumber}</h3> -->
        <!-- {#if  !data.mobileVerified}
        <form on:submit|preventDefault = {
            sendNumber
        }>
            <h6 class="text-danger mb-4">Phone number not verified</h6>
            <input bind:value={data.phoneNumber} type="text" class="form-control" aria-describedby="emailHelp"
                                placeholder="Enter email">
            <button class="btn btn-danger w-100 mt-2" type="submit">Verify mobile</button>
        </form>
           
        {/if} -->
        <!-- <button class="btn btn-danger w-100 mt-4">
            Log-out
        </button> -->
    </div>
    <!-- <div class="line"></div> -->
    <hr width="1" size="auto">
    <div >
        <div>
            <div class="col mb-4">
                <h4>
                    <strong class="mb-0">Update Email</strong>

                </h4>
                <form on:submit|preventDefault={()=>{}} >
                    <div class="cover">
                        <div class="form-group mt-2">
                            <input bind:value={data.email} type="text" class="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder="Enter email">
                        
                        </div>
                 
                        <button type="submit" class="btn btndanger w-100 mt-2">
                            Update email
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div>
            <div class="col mt-4">
                <h4>
                <strong class="mb-0">Updat password</strong>

                </h4>
                <form on:submit|preventDefault={()=>{}} >
                    <div class="cover">
                        <div class="form-group mt-2">
                            <label for="exampleInputEmail1">New Password</label>
                            <input bind:value={newPassword} type="text" class="form-control my-2" placeholder="Enter New Password">
                        </div>
                        <div class="form-group mt-2">
                            <label for="exampleInputEmail1">Old Password</label>
                            <input bind:value={oldPassword} type="text" class="form-control my-2" placeholder="Enter New Password">
                        </div>
                 
                        <button type="submit" class="btn btndanger w-100 mt-2">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>




<style lang="scss">
   .containerr {
    width: 36%;
    background-color: #b6d5eb;
    color: #14213d;
    margin: 3% auto;
    height: auto;
    padding: 36px 42px;
    display: flex;
    flex-direction: column;
    gap: 3%;
    // justify-content: space-around;
    border-radius: 12px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

    p {
        font-size: 36px;
    }
    h5 {
    color: #153375;
    }

    span {
        font-size: 16px;
        margin-right: 6px;
    }
    .userdetails {
        
        // border-right: 2px solid rgb(179, 176, 176);
        // padding-right: 52px;
        h3 {
            padding-bottom: 12px;
            border-bottom: 1px solid rgb(196, 192, 192);
        }
        
    }
    .btndanger {
    background-color: #14213d;
    color: #fff;
    border: 1px solid #14213d;

  }
   }
   @media(max-width:976px) {
    .containerr {
        width: 60%;
        flex-direction: column;
    }
   }
   @media(max-width:678px) {
    .containerr {
        width: 75%;
    }
   }
</style>






































































































































    <!-- <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8 mx-auto">
                <h2 class="h3 mb-4 page-title">Settings</h2>
                <div class="my-4">
                    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">General</a>
                        </li>
                 
                    </ul>

                    <hr class="my-4" />
                    <strong class="mb-0">Account</strong>
                    <p>Please edit you details here.</p>
                    <div class="list-group mb-5 shadow">
                        <div class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col">
                                    <strong class="mb-0">Notify me about new features and updates</strong>
                                    <form on:submit|preventDefault={()=>{}} autocomplete="false">
                                        <h1 class="text-center">Signup</h1>
                                        <br>
                                
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="exampleInputEmail1">First Name</label>
                                                        <input required bind:value={data.name} type="text" class="form-control" placeholder="Enter First Name">
                                                    </div>
                                                </div>
                                
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="exampleInputPassword1">Last Name</label>
                                                        <input required bind:value={data.name} type="text" class="form-control"  placeholder="Enter Last Name">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Mobile Number</label>
                                            <input required bind:value={data.phoneNumber} type="text" class="form-control" placeholder="Enter Mobile Number">
                                        </div>
                                
                                        <button type="submit" class="btn btn-danger w-100 mt-2">Update</button>
                        
                                
                                        
                                    </form>
                                </div>
                   
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col">
                                    <strong class="mb-0">Update Email</strong>
                                    <form on:submit|preventDefault={()=>{}} >
                                        <div class="cover">
                                            <div class="form-group">
                                                <input bind:value={data.email} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                    placeholder="Enter email">
                                            
                                            </div>
                                     
                                            <button type="submit" class="btn btn-danger w-100 mt-2">
                                                Update email
                                            </button>
                                        </div>
                                    </form>
                                </div>
                               
                            </div>
                        </div>
                        <div class="list-group-item">
                            <div class="row align-items-center">
                                <div class="col">
                                    <strong class="mb-0">Updat password</strong>
                                    <form on:submit|preventDefault={()=>{}} >
                                        <div class="cover">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">New Password</label>
                                                <input bind:value={newPassword} type="text" class="form-control" placeholder="Enter New Password">
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Old Password</label>
                                                <input bind:value={oldPassword} type="text" class="form-control" placeholder="Enter New Password">
                                            </div>
                                     
                                            <button type="submit" class="btn btn-danger w-100 mt-2">
                                                Update Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </div> -->













































































































































































































































































































































































<!-- <style>
 
    .main-bar {
        min-height: 50vh;
        padding: 5vh;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .signup {

        display: flex;
        justify-content: center;
        margin-bottom: 10px;

    }


    form {
        width: 95%;
        max-width: 800px;
        border: 1px solid red;
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.173);
    }



    body{
    color: #8e9194;
    background-color: #f4f6f9;
}
.list-group {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: 0.25rem;
}

.list-group-item-action {
    width: 100%;
    color: #4d5154;
    text-align: inherit;
}
.list-group-item-action:hover,
.list-group-item-action:focus {
    z-index: 1;
    color: #4d5154;
    text-decoration: none;
    background-color: #f4f6f9;
}
.list-group-item-action:active {
    color: #8e9194;
    background-color: #eef0f3;
}

.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #ffffff;
    border: 1px solid #eef0f3;
}
.list-group-item:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}
.list-group-item:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
}
.list-group-item.disabled,
.list-group-item:disabled {
    color: #6d7174;
    pointer-events: none;
    background-color: #ffffff;
}
.list-group-item.active {
    z-index: 2;
    color: #ffffff;
    background-color: #1b68ff;
    border-color: #1b68ff;
}
.list-group-item + .list-group-item {
    border-top-width: 0;
}
.list-group-item + .list-group-item.active {
    margin-top: -1px;
    border-top-width: 1px;
}

.list-group-horizontal {
    flex-direction: row;
}
.list-group-horizontal > .list-group-item:first-child {
    border-bottom-left-radius: 0.25rem;
    border-top-right-radius: 0;
}
.list-group-horizontal > .list-group-item:last-child {
    border-top-right-radius: 0.25rem;
    border-bottom-left-radius: 0;
}
.list-group-horizontal > .list-group-item.active {
    margin-top: 0;
}
.list-group-horizontal > .list-group-item + .list-group-item {
    border-top-width: 1px;
    border-left-width: 0;
}
.list-group-horizontal > .list-group-item + .list-group-item.active {
    margin-left: -1px;
    border-left-width: 1px;
}

@media (min-width: 576px) {
    .list-group-horizontal-sm {
        flex-direction: row;
    }
    .list-group-horizontal-sm > .list-group-item:first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0;
    }
    .list-group-horizontal-sm > .list-group-item:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0;
    }
    .list-group-horizontal-sm > .list-group-item.active {
        margin-top: 0;
    }
    .list-group-horizontal-sm > .list-group-item + .list-group-item {
        border-top-width: 1px;
        border-left-width: 0;
    }
    .list-group-horizontal-sm > .list-group-item + .list-group-item.active {
        margin-left: -1px;
        border-left-width: 1px;
    }
}

@media (min-width: 768px) {
    .list-group-horizontal-md {
        flex-direction: row;
    }
    .list-group-horizontal-md > .list-group-item:first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0;
    }
    .list-group-horizontal-md > .list-group-item:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0;
    }
    .list-group-horizontal-md > .list-group-item.active {
        margin-top: 0;
    }
    .list-group-horizontal-md > .list-group-item + .list-group-item {
        border-top-width: 1px;
        border-left-width: 0;
    }
    .list-group-horizontal-md > .list-group-item + .list-group-item.active {
        margin-left: -1px;
        border-left-width: 1px;
    }
}

@media (min-width: 992px) {
    .list-group-horizontal-lg {
        flex-direction: row;
    }
    .list-group-horizontal-lg > .list-group-item:first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0;
    }
    .list-group-horizontal-lg > .list-group-item:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0;
    }
    .list-group-horizontal-lg > .list-group-item.active {
        margin-top: 0;
    }
    .list-group-horizontal-lg > .list-group-item + .list-group-item {
        border-top-width: 1px;
        border-left-width: 0;
    }
    .list-group-horizontal-lg > .list-group-item + .list-group-item.active {
        margin-left: -1px;
        border-left-width: 1px;
    }
}

@media (min-width: 1200px) {
    .list-group-horizontal-xl {
        flex-direction: row;
    }
    .list-group-horizontal-xl > .list-group-item:first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0;
    }
    .list-group-horizontal-xl > .list-group-item:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0;
    }
    .list-group-horizontal-xl > .list-group-item.active {
        margin-top: 0;
    }
    .list-group-horizontal-xl > .list-group-item + .list-group-item {
        border-top-width: 1px;
        border-left-width: 0;
    }
    .list-group-horizontal-xl > .list-group-item + .list-group-item.active {
        margin-left: -1px;
        border-left-width: 1px;
    }
}

.list-group-flush {
    border-radius: 0;
}
.list-group-flush > .list-group-item {
    border-width: 0 0 1px;
}
.list-group-flush > .list-group-item:last-child {
    border-bottom-width: 0;
}

.list-group-item-primary {
    color: #0e3685;
    background-color: #bfd5ff;
}
.list-group-item-primary.list-group-item-action:hover,
.list-group-item-primary.list-group-item-action:focus {
    color: #0e3685;
    background-color: #a6c4ff;
}
.list-group-item-primary.list-group-item-action.active {
    color: #ffffff;
    background-color: #0e3685;
    border-color: #0e3685;
}

.list-group-item-secondary {
    color: #0a395d;
    background-color: #bdd6ea;
}
.list-group-item-secondary.list-group-item-action:hover,
.list-group-item-secondary.list-group-item-action:focus {
    color: #0a395d;
    background-color: #aacae4;
}
.list-group-item-secondary.list-group-item-action.active {
    color: #ffffff;
    background-color: #0a395d;
    border-color: #0a395d;
}

.list-group-item-success {
    color: #107259;
    background-color: #c0f5e8;
}
.list-group-item-success.list-group-item-action:hover,
.list-group-item-success.list-group-item-action:focus {
    color: #107259;
    background-color: #aaf2e0;
}
.list-group-item-success.list-group-item-action.active {
    color: #ffffff;
    background-color: #107259;
    border-color: #107259;
}

.list-group-item-info {
    color: #005d83;
    background-color: #b8eafe;
}
.list-group-item-info.list-group-item-action:hover,
.list-group-item-info.list-group-item-action:focus {
    color: #005d83;
    background-color: #9fe3fe;
}
.list-group-item-info.list-group-item-action.active {
    color: #ffffff;
    background-color: #005d83;
    border-color: #005d83;
}

.list-group-item-warning {
    color: #855701;
    background-color: #ffe7b8;
}
.list-group-item-warning.list-group-item-action:hover,
.list-group-item-warning.list-group-item-action:focus {
    color: #855701;
    background-color: #ffde9f;
}
.list-group-item-warning.list-group-item-action.active {
    color: #ffffff;
    background-color: #855701;
    border-color: #855701;
}

.list-group-item-danger {
    color: #721c24;
    background-color: #f5c6cb;
}
.list-group-item-danger.list-group-item-action:hover,
.list-group-item-danger.list-group-item-action:focus {
    color: #721c24;
    background-color: #f1b0b7;
}
.list-group-item-danger.list-group-item-action.active {
    color: #ffffff;
    background-color: #721c24;
    border-color: #721c24;
}

.list-group-item-light {
    color: #7f8081;
    background-color: #fcfcfd;
}
.list-group-item-light.list-group-item-action:hover,
.list-group-item-light.list-group-item-action:focus {
    color: #7f8081;
    background-color: #ededf3;
}
.list-group-item-light.list-group-item-action.active {
    color: #ffffff;
    background-color: #7f8081;
    border-color: #7f8081;
}

.list-group-item-dark {
    color: #17191c;
    background-color: #c4c5c6;
}
.list-group-item-dark.list-group-item-action:hover,
.list-group-item-dark.list-group-item-action:focus {
    color: #17191c;
    background-color: #b7b8b9;
}
.list-group-item-dark.list-group-item-action.active {
    color: #ffffff;
    background-color: #17191c;
    border-color: #17191c;
}
</style> -->