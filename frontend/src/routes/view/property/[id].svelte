<script context="module">
   

    export function load({params}) {
        return {
            props: {id: params.id}
        }
    }



</script>

<!-- svelte-ignore non-top-level-reactive-declaration -->
<script>
    export let id
    import { onMount} from 'svelte'
    import mapboxgl from "mapbox-gl";
    import { API, Client, IMG, PROF_IMG } from '../../../config';
    import { Email, HackerNews, Reddit, LinkedIn, Pinterest, Telegram, Tumblr, Vk, WhatsApp, Xing, Facebook, Twitter, Line } from 'svelte-share-buttons-component';
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2F0aHlhZGV2IiwiYSI6ImNsM3R5bGh1cjBlZ2wzaXBjazI2ZTBnMm8ifQ.GLQgbjT3w49JfCTJ_iEsQA';

    let property;
    let videoSRC
    let owner
    $: url = `${Client}/view/property/${id}`;
	$: title = `Hi, I have listed ${property?.title? property.title: "My Property"} in Commercial Listing Pro ${property?.for? "for "+property.for: ""}`;
	$: desc = 'User Commercial Listing Pro is not only a listing website for properties but also a new hub for Real Estate Developers and Realtors';
    let token

    onMount(async () => {

        token = window.localStorage.getItem("login");
        token = JSON.parse(token)

        await fetch(`${API}/property/post/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(response => {
            property = response.data
            property = {...property}
            owner = response.datum

            let link = (property.video).split("?v=")
        videoSRC = `https://www.youtube.com/embed/${link[link.length-1]}`
            let map
       map = new mapboxgl.Map({
                container: "map",
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [ property.gps.lng, property.gps.lat],
                zoom: 12,
              });
         map.on('load', ()=>{
            new mapboxgl.Marker({
                    color: "red",
                    draggable: false
                    })
                    .setLngLat([ property.gps.lng, property.gps.lat])
                    .addTo(map)
        })
        })
        

        


        
                        
                    


       

    })


</script>

<svelte:head>
  <link rel="icon" href="/img/favicon.png" />
  <title>Property - { property? property.title:""}</title>
</svelte:head>




<div>
    {#if property}
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <ol class="carousel-indicators">
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
            <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
            {#each property.photos as photo}
            <div class="carousel-item active">
                <img class="d-block w-100"
                    src={`${IMG}/${photo}`} 
                    alt="First slide">
            </div>

            {/each}
            
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>

    <div class="social-container">
        <h3>Share { property? property.title:"Property"} To More</h3>
        <div class="social">
            <Email subject="{title}" body="{desc} {url}" />
        <HackerNews class="share-button" {title} {url} />
        <Reddit class="share-button" {title} {url} />
        <LinkedIn class="share-button" {url} />
        <Pinterest class="share-button" {url} media="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/200px-Svelte_Logo.svg.png" description={title} />
        <Telegram class="share-button" text={title} {url} />
        <Vk class="share-button" {title} {url} />
        <WhatsApp class="share-button" text="{title} {url}" />
        <Xing class="share-button" {title} {url} />
        <Facebook class="share-button" quote="{title}" {url} />
        <Twitter class="share-button" text="{title}" {url} hashtags="github,svelte" via="username" related="other,users" />
        <Line class="share-button" {url} />
        </div>
    </div>


    
    
    <div class="accordion" id="accordionExample">
        {#each property.floors as floor, i}
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`}

                    aria-expanded="false" aria-controls={`#collapse${i}`}>
                    Floor #{floor.floor_number} | {floor.floor_size} SQFT 
                </button>
            </h2>
            <div id={`collapse${i}`} class:show={i ==0} class:collapsed={i != 0} class="accordion-collapse collapse " aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
    
                    <table class="table">
                        <thead>
                            <tr>
    
                                <th scope="col">SPACE</th>
                                <th scope="col">SIZE</th>
                                <th scope="col">TERM</th>
                                <th scope="col">RATE</th>
                                <th scope="col">SPACE USE</th>
                                <th scope="col">CONDITION</th>
                                <th scope="col">AVAILABLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{floor.floor_number}st Floor</td>
                                <td>{floor.floor_size} SF</td>
                                <td>{floor.term}</td>
                                <td>{floor.rate}</td>
                                <td>Office</td>
                                <td>{floor.condition}</td>
                                <td>{floor.avaliable?"Yes":"No"}</td>
    
                            </tr>
                        </tbody>
                    </table>

                    <ul class="list-group">
                        {#if floor.amenities}
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-2">Amenities</h5>
                          </div>
                            {#each floor.amenities as amenity}
                            <li class="list-group-item">{amenity}</li>
                            {/each}
                        {/if}
                    </ul>
                </div>
            </div>
        </div>
        {/each}
       
    </div>

    {/if}
    
        
    {#if property}
    <div class="container mt-5`" style="width:70%">
        <div class="row">
          <div class="col-sm">

            <h3 class="title-d">Quick Summary</h3>
            <div class="list-group">
                <li class="d-flex justify-content-between"> 
                    <strong>Property ID:</strong>
                    <span>{property.uid}</span>
                </li>

                <li class="d-flex justify-content-between"> 
                    <strong>Location:</strong> 
                    <span>

                        {property.address_1}, {property.address_2}
                        <br/>
                        {property.city}, {property.state},
                        <br/>
                        {property.country}, {property.zip_code}
                    </span>
                </li>

                <li class="d-flex justify-content-between">
                    <strong>Property Type:</strong>
                    <span>{property.type}</span>
                </li>

                <li class="d-flex justify-content-between">
                    <strong>Property For:</strong>
                    <span>{property.for}</span>
                </li>

                <li class="d-flex justify-content-between">
                    <strong>Property Use Purpose:</strong>
                    <span>{property.space_use}</span>
                </li>
                <li class="d-flex justify-content-between">
                    <strong>Year Property Built:</strong>
                    <span>{property.year_built}</span>
                </li>

                {#if property.renovated}
                <li class="d-flex justify-content-between">
                    <strong>Property Renovated</strong>
                    <span>{property.building_size} <strong>SQFt</strong></span>
                </li>
                {/if}

                {#if property.renovated}
                <li class="d-flex justify-content-between">
                    <strong>Property Lot Size</strong>
                    <span>{property.lot_size} <strong>SQFt</strong></span>
                </li>
                {/if}

                <li class="d-flex justify-content-between">
                    <strong>Area:</strong>
                    <span>{property.building_size} <strong>SQFt</strong></span>
                </li>

                <li class="d-flex justify-content-between">
                    <strong>Construction Type:</strong>
                    <span>{property.construction_type}</span>
                </li>
                <li class="d-flex justify-content-between">
                    <strong>Zoning:</strong>
                    <span>{property.zoning}</span>
                </li>
                <li class="d-flex justify-content-between">
                    <strong>Sewer:</strong>
                    <span>{property.sewer}</span>
                </li>
                <li class="d-flex justify-content-between">
                    <strong>Electricity:</strong>
                    <span>{property.electricity}</span>
                </li>
             
                
            </div>

          </div>

          <div class="col-sm">

             <h3 class="title-d">Property Owner/Agent</h3>
           
            {#if token == null}
                <div 
                style="
                width: 100%; 
                height: unset; 
                aspect-ratio: 2; 
                display: flex; 
                justify-content: center; 
                align-items: center;
                background-color: #b7d4ea;
                ">
                    <a target="_blank" href="/auth/login" style="background-color: #171e3c; color: #fff" class="btn">Please Sign in to view the details</a>
                </div>
            {:else}
            <div class="list-group">
                <li class="d-flex justify-content-between"> 
                   <div style={`
                       width: 50%; 
                       height: unset; 
                       aspect-ratio: 1; 
                       background-image: url(${PROF_IMG}/${owner.profile});
                       background-size: cover;
                       margin:auto
                       
                   `}>

                   </div>
               </li>
                <li class="d-flex justify-content-between"> 
                   <strong>Name:</strong>
                   <span>{owner.name}</span>
               </li>

              <li class="d-flex justify-content-between"> 
                   <strong>Email:</strong> 
                   <span>{owner.email}</span>
               </li>

               <li class="d-flex justify-content-between">
                   <strong>Phone:</strong>
                   <span>{owner.phoneNumber}</span>
               </li>

               <li class="d-flex justify-content-between">
                <strong>Download PDF</strong>
                <span>
                    <a
                    class="btn btn-danger"
                    target="_blank"
                    href={`/print/${property.uid}`}>
                    Download
                    </a>
                </span>
            </li>
           </div>

            {/if}
          </div>

        </div>
      </div>

    {#if property.highlights[0]}
    <div class="container mt-5 mb-5" style="width:70%">
        <div class="row">
          <div class="col-sm">

            <h3 class="title-d">Property Highlights</h3>
            <div class="list-group">
                <ul class="list-group list-group-flush">
                   
                        {#each property.highlights as highlight, i}
                        <li class="list-group-item highlight"><strong>{i+1}.</strong> {highlight}</li>
                        {/each}
                    
                </ul>
            </div>
          </div>

        </div>
      </div>
      {/if}

    
    
    {/if}

    <div class="container mt-5" style="width:70%">
        <div class="row">
            {#if property && property.video}
                <div class="col-sm">
                    <iframe width="560" height="315" 
                    src={videoSRC}
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                    <!-- <iframe width="100%" height="315" 

                    src={property.video} 
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  -->
                </div>
            {/if}

            <div class="col-sm">
                <div style="width:100%;height:315px" class="col-12 map" id="map"></div>
            </div>
        
        </div>
    </div>


    <div class="ad">
        <h1>AD</h1>
    </div>





</div>




<style lang="scss">

    .ad {
        background-color: grey;
        display: grid;
        place-content: center;
        aspect-ratio: 16/4;
        margin:5vh auto;
        width: 70%;
    }

    .social-container {
        width:80%;
        margin: 2% auto;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        flex-direction: column;

    }
    .carousel {
        width: 70%;
        height: 50vh;
        overflow: hidden;
        margin: auto
    }

    .accordion {
        width: 70%;
        margin: 25px auto 0 auto;
    }

    .amenities-list {
        
        ul {
            display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }

    .title-d , strong {
        color: #171e3c;;
    }


    .accordion-button:not(.collapsed) {
        color: #171e3c;;
    background-color: #b8d3e9;
    }

    .list-group > li:nth-child(odd) {
        background-color: #b8d3e9;
    }

    .highlight {
        background-color: #ffffff !important;
    }

    .list-group > li {
        padding: 10px;
    }
    .list-group {
        padding: 5px;
        box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 40px;
    }
</style>