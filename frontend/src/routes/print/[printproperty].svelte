<script context="module">
   

    export function load({params}) {
        return {
            props: {id: params.printproperty}
        }
    }



</script>

<!-- svelte-ignore non-top-level-reactive-declaration -->
<script>
    export let id
    import { onMount} from 'svelte'
    import mapboxgl from "mapbox-gl";
    import { API, Client, IMG, PROF_IMG } from '../../config';
    import { Qr } from '@sveltevk/qr';
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2F0aHlhZGV2IiwiYSI6ImNsM3R5bGh1cjBlZ2wzaXBjazI2ZTBnMm8ifQ.GLQgbjT3w49JfCTJ_iEsQA';

    let property;
    let videoSRC
    let owner
    $: url = `${Client}/view/property/${id}`;
	$: title = `Hi, I have listed ${property?.title? property.title: "My Property"} in Commercial Listing Pro ${property?.for? "for "+property.for: ""}`;
	$: desc = 'User Commercial Listing Pro is not only a listing website for properties but also a new hub for Real Estate Developers and Realtors';
    let token
    let map = null

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

                    
                  
                        window.print();
                        window.location.href = "/"
                        
        })
     })
        

    })


</script>

<svelte:head>
  <link rel="icon" href="/img/favicon.png" />
  <title>Property - { property? property.title:""}</title>
</svelte:head>




<div id="wrapper">
    <div class="banner-image-logo">
        <img src="/img/logo.png"
            alt="First slide">
    </div>
    {#if property}
    <div class="banner-image">
        <img class="d-block"
            src={`${IMG}/${property.photos[0]}`} 
            alt="First slide">
    </div>
    {/if}
    
        
    {#if property}

    <table style="margin:auto; width: 70%;" class="table">
        <thead>
          <tr>
            <th scope="col">Property ID</th>
            <th scope="col">Location</th>
        
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
                {property._id}
            </td>
            <td>
                {property.address_1}, {property.address_2}
                <br/>
                {property.city}, {property.state},
                <br/>
                {property.country}, {property.zip_code}
            </td>
          </tr>
        </tbody>
      </table>





    <table style="margin:auto; width: 70%;" class="table">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">For</th>
            <th scope="col">Purpose</th>
            <th scope="col">Year Built</th>
            <th scope="col">Area</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{property.type}</td>
            <td>{property.for}</td>
            <td>{property.space_use}</td>
            <td>{property.year_built}</td>
            <td>{property.building_size}</td>
          </tr>
        </tbody>
      </table>

      <div class="accordion" id="accordionExample">
        {#each property.floors as floor, i}
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`}

                    aria-expanded="false" aria-controls={`#collapse${i}`}>
                    Floor #{floor.floor_number} | {floor.floor_size} SQFT 
                </button>
            </h2>
            <div id={`collapse${i}`} class="accordion-collapse show " aria-labelledby="headingOne"
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


    <table style="margin:5% auto 5% auto; width: 70%;" class="table">
        <thead>
          <tr>
            <th scope="col">Renovated</th>
            <th scope="col">Construction Type</th>
            <th scope="col">Zoning</th>
            <th scope="col">Sewer</th>
            <th scope="col">Electricity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{property.renovated?  property.renovated_year:"No"}</td>
            <td>{property.construction_type}</td>
            <td>{property.zoning}</td>
            <td>{property.sewer}</td>
            <td>{property.electricity}</td>
          </tr>
        </tbody>
    </table>



  
      <div class="container mt-5`" style="width:70%">

        <div class="row nl-row">
       

          <div>

            <h4 class="title-d">Contact</h4>
           
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
                    <img width="50%" src={`${PROF_IMG}/${owner.profile}`} alt="">
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
            </div>
            {/if}
           </div>

          
           <div>
            <h4 class="title-d">Scan 'n' Share</h4>
            <Qr text={`${Client}/view/property${id}`} 
                qrSize={256} isShowLogo 
                logoData="/img/favicon.png" 
                foregroundColor="#fff"
                isShowBackground={true}
                backgroundColor="#C1202C"
            />
           </div>

        </div>
      </div>
<br>
<br>
{/if}
<div class="container mt-5" style="width:70%">
    <div class="row">
        <!-- {#if property && property.video}
        <div>
            <Qr text={property.video} 
            qrSize={256} isShowLogo 
            logoData="/img/yt.png" 
            foregroundColor="#fff"
            isShowBackground={true}
            backgroundColor="#C1202C"
        />
        </div>
        {/if} -->

        <h3>Property Map</h3>

        <div>
            <div style="width:100%;height:315px" class="col-12 map" id="map"></div>
        </div>
       
    
    </div>
</div>

<br>
<br>
{#if property}
    {#if property.highlights[0]}
    <div class="container mb-5" style="width:70%, margin-top: 20%">
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



</div>




<style lang="scss">


@media print {
    @page { margin: 0; }
//   body { margin: 1.6cm; }

       #wrapper {
          width: 100%;
          display: block !important;
      }

      .banner-image-logo {
        width: 30%;
        margin: auto 15%;

        img {
            width: 80%
        }
    }
      .banner-image {
        width: 70%;
        max-height: 250px;
        margin: auto;
        overflow: hidden;

        img {
            width: 100%;
        }
    }

    .nl-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    
}

#wrapper {
          width: 100%;
          display: none;
      }
.banner-image-logo {
        width: 30%;
        margin: auto 15%;

        img {
            width: 80%
        }
    }

    .banner-image {
        width: 70%;
        margin: 25px auto 0 auto;
        background-color: #171e3c;
        
        img {
            width: 100%;
        }
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