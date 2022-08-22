<script context="module">
    export function load({url}){

        return {
            props: {
                page: url
            }
        }

    }
</script>

<script>
    import {onMount} from "svelte"
    import Header from  "../util/Header/Header.svelte"
    import Footer from "../util/Footer/Footer.svelte"
    import {allowedRoutes} from "../config"




    export let page;
    let login;
    

    $:page = page.pathname;

    
    onMount(()=>{


        login = localStorage.getItem("login")
        
        if (!login) {
            if (!allowedRoutes.includes(page)) {

                if ((page.split("/"))[1] != "view") {
                    window.location.href = "/"
                }

                
            } 
        }

        
    })

</script>

<Header {login}/>

<!-- {#if page != "/"}
<Header {login}/>
{/if} -->


<main style="min-height:90vh">
    <slot></slot>
</main>




<Footer/>


<style>
    :global(h1){font-family: 'Poppins', sans-serif; font-weight: bold;}
    :global(h2){font-family: 'Poppins', sans-serif; font-weight: bold;}
    :global(h3){font-family: 'Poppins', sans-serif; font-weight: bold;}
    :global(h4){font-family: 'Poppins', sans-serif; font-weight: bold;}
    :global(h5){font-family: 'Poppins', sans-serif; font-weight: bold;}
    :global(h6){font-family: 'Poppins', sans-serif; font-weight: bold;}
</style>