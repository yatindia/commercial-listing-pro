<script>
  // import {fade} from "svelte/transition"
  import {
    onMount
  } from 'svelte'
import {
  API,
  IMG
} from "../config"
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = 'pk.eyJ1Ijoic2F0aHlhZGV2IiwiYSI6ImNsM3R5bGh1cjBlZ2wzaXBjazI2ZTBnMm8ifQ.GLQgbjT3w49JfCTJ_iEsQA';


let fetchedCount;

let pagiVal = [];
let properties
let showpropValue;


let search = {
  search: ' ',
  skip: 0,
  limit: 5
};

let token;
onMount(async () => {
  token = JSON.parse(localStorage.getItem("login"))
})

onMount(async () => {


  const response = await fetch(`${API}/property/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(search),

  });
  const data = await response.json();
  console.log(data);
  properties = data.data[0];
  fetchedCount = data.data[1]
  // if (fetchedCount > 0) {
  //   for (let i = 0; i < fetchedCount; i++) {
  //     if (!(i % 5)) {
  //       pagiVal.push((i))
  //     }
  //   }
  // }

  let latt = 0;
  properties.forEach((property) => {
    latt = latt + property.gps.lat
  })
  latt = latt / properties.length


  let long = 0;
  properties.forEach((property) => {
    long = long + property.gps.lng
  })
  long = long / properties.length

  console.log(long, latt);
  const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [long, latt],
    zoom: 3,
  });

  map.on('load', () => {
    properties.forEach((location, i) => {

      let marker = new mapboxgl.Marker()
        .setLngLat(location.gps)
        .addTo(map)

      marker.getElement().addEventListener('click', () => {

        showpropValue = i + 1;
      });

    })
  });




  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },

      trackUserLocation: true,

      showUserHeading: true,
      trackUserLocation: true
    })
  )



});


let searchValue
const searchProperty = async (e) => {

  

  const response = await fetch(`${API}/property/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(search),

  });
  const data = await response.json();
  properties = data.data[0];

}

const next = async () => {
  search.skip += search.limit
  searchProperty()
}
const prev = async () => {
  search.skip -= search.limit
  searchProperty()
}

  </script>




<svelte:head>
<link rel="icon" href="/img/favicon.png" />
<title>Search - {searchValue?searchValue:"Property"}</title>
</svelte:head>

<div class='containe my-2'>
<input type="text" class="px-4 mx-2 p-2 geocoder mb-2" id="geocoder" placeholder="Search..." on:change={searchProperty} bind:value={search.search}>

<select class="custom-select p-2 m-1">
  <option selected>Lease</option>
  <option value="1">Buy</option>
  <option value="2">Lease</option>
  <option value="3">Rent</option>
</select>
<select class="custom-select p-2 m-1">
  <option selected>Property type</option>
  <option value="1">Office</option>
  <option value="2">Industry</option>
  <option value="3">Retail</option>
</select>
<select class="custom-select p-2 m-1">
  <option selected>Property size</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
<select class="custom-select p-2 m-1">
  <option selected>Floor no</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
  <option value="4">Four</option>
  <option value="5">Five</option>
  <option value="0">Ground floor</option>

</select>
</div>
<!-- class="my-5" -->
<main>
  <div class="containerr">
    <!--Grid row-->
    <div class="row">
      <div class="col-7 mb-4 bg-light" id="map">
        <!-- <div class="text">Google Ad</div> -->
      

     
    </div>
      <!--Grid column-->
      <div class="col-5 mb-4" id="prop-container">
        <!--Section: Content-->
        

        <section class="prop-box">

          {#if showpropValue}
          <div  
          on:click={()=>{window.location.href= `/view/property/${properties[showpropValue-1].uid}`}}
          class='ind-property' style="padding: 10px;">
            <!-- svelte-ignore a11y-missing-attribute -->
            <img src={`${IMG}/${properties[showpropValue-1].photos[0]}`} width="100%">
            <div class="d-flex justify-content-between px-2 py-4">
              <div>
                <h5> {properties[showpropValue-1].address_1}</h5>
                <small>{properties[showpropValue-1].state},{properties[showpropValue-1].city}</small>
              </div>
             
              <div>
                <p>From {properties[showpropValue-1].year_built}</p>
                <p>{properties[showpropValue-1].building_size} Sq Ft</p>
              </div>
            </div>
           
          </div>
          {/if}
          

          {#if properties}
          {#each properties as property }

         
          <!-- Post -->
         <a href="/view/property/{property.uid}" style="all:unset">
          <div class="row property" id="property">
            <div class="col-md-5 mb-2 image-box"  style={`width:100%;aspect-ratio:1/1;background-image: url(${IMG}/${property.photos[0]});`} >
              
                  <!-- <div class="col-md-5 mb-2 image-box"  style={`width:100%;aspect-ratio:1/1;background-image: url("/img/imagesr2.jpeg")`} > -->
                  <!-- // <img src="/img/imagesr2.jpeg" class="img-fluid"/>
                  // <img src="/img/imagesr2.jpeg" class="img-fluid"/>
                  // <img src="/img/imagesr2.jpeg" class="img-fluid"/> -->


               
              
            </div>

            <div class="col-sm-7">
              <h5> {property.address_1}</h5>
              <small>{property.state},{property.city}</small>
              <div class='prop-details'>
                <p>From {property.year_built}</p>
                <p>{property.building_size} Sq Ft</p>
              </div>


            </div>
          </div>
         </a>
          {/each}
          {/if}
 
         



        </section>

        <div class="container my-3 d-flex justify-content-center">
          
          <ul class="pagination pagination">
            {#if  search.skip != 0}
            <li class="page-item">
              <a on:click={()=>{prev()}} class="page-link" aria-label="Previous" name="previous">&laquo;</a>
            </li>
            {/if}
            

   
            <li class="page-item">  
              <!-- svelte-ignore a11y-missing-attribute -->
              <a class="page-link" >
                {parseInt(search.skip/search.limit)+1} 
                of
                {fetchedCount && Math.ceil( fetchedCount/search.limit)}
              </a>
            </li>      
         

            {#if fetchedCount && search.skip+search.limit < fetchedCount}
            <li class="page-item">
              <a on:click={()=>{next()}} class="page-link" aria-label="Next" name="next">&raquo;</a>
            </li>
            {/if}

            

          </ul>
        </div>
        
        <!--Section: Content-->
      </div>
     

      
      
      
    </div>
   

    <!-- Pagination -->
    <!-- <nav class="my-4" aria-label="...">
      <ul class="pagination pagination-circle justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav> -->
  </div>
</main>



<style lang="scss">
.containerr {
  .map {
    // border: #C1202C solid 2px;
    // height: 65vh;
    // position: sticky;
    // top: 0vh;
  }
  .prop-box {
    height: 65vh;
    overflow-y: scroll;
    
    
    .prop-details {
      margin-top:6px
    } p{
      margin: 0;
      padding:0;
    }
  }
}
.property {
      background-color:aliceblue;
      padding:6px;
      margin: 0 6px;
      border: 3px transparent solid;
      transition: all 0.2s;
    }
.property:hover {
        border: 3px solid #1c366e;
        border-radius: 8px;
      }


      .image-box {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    // display: flex;
    //   margin-top: 12px;
    //   height: 110px;
    // width: 180px;
    // overflow: hidden;
    // img {
    //   transition: all 0.2s ease-in-out;
    //   :hover {
    //     transform: translateX(-180px,0);
    //   }
    // }
    }

    .ind-property {
      border-bottom: 1px solid grey;
    }
     @media(max-width:768px){
      .containerr {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        position: relative;
        #map {
          position: absolute;
          top: 0;
          left: 0;
          height: 200px;
          width: 100%;
        }
        #prop-container {
          width: 100%;
          padding-top:220px
          
        }
      }
     }


  </style>

