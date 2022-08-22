
<script>
    import SearchBox from "../SearchBox/SearchBox.svelte"
    import HeroHeader from "../Header/HeroHeader.svelte"

    // export let login
</script>

<section class="hero">

    <!-- <HeroHeader {login}/> -->
 

        <div class="left">

            <h1 class='mb-4'>Get the best Commercial property deals</h1>
            <p>It's so simple to find the best real estate deals in your area with monthly like other sites out there. This ensures that we offer prospective buyers and investors with the freshest, hottest deals on the Internet. 

            </p>

            <SearchBox/>

        </div>

        <div class="right">



            <img width="100%" src="/img/heroBuilding.png" alt="">

        </div>
  
</section>


<style lang="scss">

    .hero {
       
        display: grid;
        justify-content: center;
        width: 80%;
        margin: auto;
        grid-template-columns: 1fr 1fr;

    }



    .hero > .left {
        padding-top: 5vh;
        margin-top: 12vh;

        h1 {
            color: #14213d;
        }
        p{
            width: 80%;
            color: #14213d;

        }
    }

    .hero > .right {
        background-color: #b6d5eb;
       
    }
    .hero > .right >img {
        width: 80%;
        display: block;
        margin: 12% auto;
    }

  
    




</style>