<script>
import {protectedRoute} from "../../components/functions"
import {onMount} from "svelte"
import UserHero from "../../util/Hero/UserHero.svelte"
import {API, IMG} from "../../config"

onMount(()=>protectedRoute())


    let token;
    let data = {}
    let properties=[]

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
                console.log(data);
            }
        })



        await fetch(`${API}/property/singleuserproperty/${data._id}`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `<Bearer> ${token}`
            }
            
        
        })
        .then(res => res.json())
        .then((res)=>{
            console.log(res);

            if (res.status) {
                properties = res.data
                console.log(properties);
            }
        })


})


async function deletePost(_id) {

await fetch(`${API}/property/${_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `<Bearer> ${token}`
        }
        
    
    })
    .then(res => res.json())
    .then((res)=>{
        getData()
    })

}


    
</script>

<svelte:head>
  <link rel="icon" href="/img/favicon.png" />
  <title>My Acccount</title>
</svelte:head>


<div>

<UserHero />
<div class="containerr">
{#if  properties && (properties).length > 0}
{#each properties as property}
    <div class="property">

        {#if  property.photos && (property.photos).length > 0}
            <img width="300px" src={`${IMG}/${property.photos[0]}`} class="img-fluid" alt="">
        {:else}
        <img width="300px" src="/img/placeholder.png" alt="">
        {/if}

        <div class="prop-details py-2">
            <h3>{property.title}</h3>
            <p>{property.address_1} | {property.address_2}</p>
            <h5>For: {(property.for).toUpperCase()} | {property.city} </h5>
            <div class="btnbox">
                <a href={`/user/myproperties/update/${property._id}`} class="btn btnoutlinedanger w-70 mt-2 update">Update</a>
                <button on:click={()=>{deletePost(property._id)}} class="btn btn-danger w-70 mt-2 delete">Delete</button>
            </div>
        </div>
    </div>
{/each}
{:else}
<div class="empty">
    <img src="/img/empty.gif" alt="">
    <a href="/user/post" class="btn btn-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg> 
      Add Properties
    </a>
</div>
    
{/if}
   
</div>
</div>


<style lang=scss>
   .empty{
       min-height: 40vh;
       width: 100%;
       margin: 50px auto;
       display: flex;
       justify-content: center;
       align-items: center;
       flex-direction: column;
   }

   .containerr {
    width: 80%;
    margin: 3% auto;
    padding: 32px 0;
    border-radius: 12px;
    // box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    .property {
        background-color: #b6d5eb;
        color: #14213d;
        border: 1px solid rgb(190, 186, 186);
        border-radius: 8px;
        width: 90%;
        height: auto;
        display: flex;
        gap: 15px;
        padding: 16px;
        margin: 16px auto;
        
        .btnbox {
            display: flex;
            
            a.update {
                margin-right: 20px;
                border: 1.6px solid #14213d;

            }
            .delete {
                background-color: #14213d;
                border: none;
            }
        }
    }
    }
    @media(max-width:1000px) {
    .containerr {
        width: 98%;
    }
   }
   @media(max-width:826px) {
    .containerr {
        width: 70%;
        .property {
            flex-direction: column;
        }
    }
   }
  
</style>
