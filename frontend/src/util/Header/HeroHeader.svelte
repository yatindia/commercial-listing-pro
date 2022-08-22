<script>
    import {logout} from "../functions/functions"
    export let login
    
</script>

<div class="semi-nav nav-p1">

    <ul>
        <a href="/">
            <li>
                <img src="/img/redLogo.png" alt="">
            </li>
        </a><a href="/home">
            <li>HOME</li>
        </a><a href="/about">
            <li>ABOUT</li>
        </a>
    </ul>

</div>
<div class="semi-nav nav-p2">
    <ul>

       {#if login}
        <a href="/user/account">
            <li>ACCOUNT</li>
        </a>
        <a on:click|preventDefault={()=>logout()} href="/">
            <li>LOGOUT</li>
        </a>
       {:else}
        <a href="/auth/login">
            <li>Login</li>
        </a>
        <a href="/auth/signup">
            <li>Signup</li>
        </a>
       {/if}

    </ul>
</div>


<style lang="scss">
        .semi-nav{
        height: 10vh;
        min-height: 150px;
    }

    .nav-p1{

        ul {

            display: grid;
            grid-template-columns: 6fr 2fr 2fr;
            justify-content: center;
            align-items: center;
            list-style: none;
           
            a {
                padding: 20px;
                text-decoration: none;

                li {
                    color: #14213d;
                    text-align: center;
                    font-size: 150%;
                    font-weight: bold;

                    img {
                        width: 70%;
                    }
                }
            }
        }
    }

   

    .nav-p2{
        background-color: #b6d5eb;

        ul {
            width: 50%;
            margin-left: 50%;
            display: grid;
            grid-template-columns:1fr 1fr;
            justify-content: end;
            align-items: center;
            list-style: none;

            a {
                padding: 20px;
                text-decoration: none;

                li {
                    color: #14213d;
                    text-align: center;
                    font-size: 150%;
                    font-weight: bold;

                    img {
                        width: 100%;
                    }
                }
            }
            }
    }
</style>