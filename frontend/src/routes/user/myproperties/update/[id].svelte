<script context="module">
  export function load({params}) {


      return {
          props: {id: params.id}
      }
  }
</script>

<script>
  import { API } from "../../../../config";
  import { protectedRoute } from "../../../../components/functions";

  import ImageUpdate from "../../../../components/ImageUpdate.svelte";
  import axios from "axios"
  import Countries from "../../../../util/Data/Countries"
  import States from "../../../../util/Data/States"
  import Property from "../../../../util/Data/Property";


  import { onMount } from "svelte";
  onMount(() => protectedRoute());

  import mapboxgl from "mapbox-gl";
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2F0aHlhZGV2IiwiYSI6ImNsM3R5bGh1cjBlZ2wzaXBjazI2ZTBnMm8ifQ.GLQgbjT3w49JfCTJ_iEsQA'


    let data = Property
    let mapElement;
    let map
    let highlights
    let current_position = [data.gps.lng, data.gps.lat]
    export let id


        onMount(async () => {

       

          let token = window.localStorage.getItem("login");
            token = JSON.parse(token)

            await fetch(`${API}/property/post/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => res.json())
            .then(res => {

              data = res.data

              let ims = []


              let inf = (res.data.photos).map(async (element)=>{
                return await fetchFile(element)
              })

              for (let index = 0; index < (res.data.photos).length; index++) {
                const element = (res.data.photos)[index];
                ims = [...ims , fetchFile(element)]
                
              }

              return inf

              
            }).then(async (mg)=>{
             

              const map = new mapboxgl.Map({
                container: "map",
                style: 'mapbox://styles/mapbox/streets-v11',
                center:[data.gps.lng, data.gps.lat],
                zoom: 5,
              });



     
              map.on("load", () =>{
                let marker = new mapboxgl.Marker({
                    color: "red",
                    draggable: true
                    })
                    .setLngLat([data.gps.lng, data.gps.lat])
                    .addTo(map)
                marker.on("drag", (arg)=>{
                  data.gps.lng = arg.target._lngLat.lng
                  data.gps.lat = arg.target._lngLat.lat
                })
              })
            })
      });
    
    
      let addFloor = () =>{
        data.floors = [
          ...data.floors,
          {
            floor_number:0,
            floor_size: 0,
            term: "",
            rate: 0,
            space_use: "",
            condition: "",
            amenities: [""],
            period_of_tenure: 0,
            avaliable: true,
          }
        ]
      }

      async function submit() {

        let token = JSON.parse(localStorage.getItem("login"))
        let result = []

     
        if ( data.photos && (data.photos).length == 0) {
          alert("Please upload atleast 1 image")
          return false;
        }
        if ( (data.photos).find((e)=>{ return e=="" })  == "") {
          alert("Please upload atleast 1 image")
          return false;
        }

        console.log((data.photos).find((e)=>{ return e=="" }) == "");
        if ( !data.floors) {
          alert("Please add atleast 1 floor")
          return false;
        }

    
          data.photos.forEach( async (image) => {

          let img = new FormData
          img.append("image", image)

          await axios({
            method: "post",
            url : `${API}/property/imageupload`,
            headers: {"Authorization": `<Bearer> ${token}`},
            data: {image}
          })
          .then(res => {
            if (res.data.status) {
              result = [...result, res.data.data]
            }
          })
          });

          console.log({ lat:data.gps.lat, lng:data.gps.lng});


          await fetch(`${API}/property/${data._id}`, {
            method:"PUT", headers: {
              "Content-Type" : "application/json",
              "Authorization": `<Bearer> ${token}`
              
              }, body: JSON.stringify({property: {...data, gps: { lat:data.gps.lat, lng:data.gps.lng}}})})
            .then(res => res.json())
            .then(res => {
              if (res.status) {
                alert("Success")
                // window.location.reload()
              }else {
                alert(res.message)
              }
            })
        
      }





async function fetchFile(url) {
   let datum = await fetch(url).then(res => res.blob()).then( async (file) => {
    
            let dataURI = await blobToDataUrl(file);
        return dataURI
   
    })

    return datum
}

async function blobToDataUrl(blob) {

  return new Promise(r => {let a=new FileReader(); a.onload=r; a.readAsDataURL(blob)}).then(e => e.target.result);
}
let  fileinput;
let avatar;
const onFileSelected = (e)=>{

  let token = window.localStorage.getItem("login");
  token = JSON.parse(token)

  let image = e.target.files[0];
          let reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = async (e) => {
               avatar = e.target.result

               await axios({
                  method: "post",
                  url: `${API}/property/imageupdate`,
                  headers: {
                      "Authorization": `<Bearer> ${token}`
                  },
                  data: {
                      image:avatar,
                      _id: id
                  }
                  })
                  .then(async (res) => {
                  if (res.data.status) {

                    refresh()

                  }
              })
          };
}


const refresh = async ()=>{
  console.log("res");
  let token = window.localStorage.getItem("login");
  token = JSON.parse(token)
  await fetch(`${API}/property/post/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    .then(res => res.json())
                    .then(res => {
                      data = res.data
                    })
}

</script>


<div >
  <h1 class="text-center mt-5">UPDATE PROPERTY</h1>
  <form on:submit|preventDefault={()=>{submit()}}>
    <div class="img">
      {#await data.photos}
        -
      {:then photos} 
        {#if (data.photos).length > 0}
        <div class="container row img-container">
          
        {#each data.photos as photo, i}
          <span class="img-span">
            <ImageUpdate on:delete={()=>refresh()} bind:src={photo} {id}/>
          </span>
        {/each}
        
      </div>
        {/if}
        
      {/await}
   
   {#if (data.photos).length < 10}
   <div class="container img-btn">
      <input style="display:none" type="file" accept=".png, .jpg, .jpeg" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
    <button on:click={()=>{fileinput.click();}} type="button" style="width: 200px ;" class="btn btn-danger">Add Image ({(data.photos).length}/10)</button>
  </div>
   {/if}
  
    </div>
    <div class="container">
      <div class="row">

        <div class="col-sm-4">
          <label for="#">Property Title</label>
          <div class="form-group">
            <input required bind:value={data.title} class="form-control" type="text" placeholder="Title">
          </div>
        </div>

        <div class="col-sm-4">
          <label for="#">Property Type</label>
          <select bind:value={data.type} class="form-control">
            <option value="building">Building</option>
            <option value="condo">Condo</option>
          </select>
        </div>
        <div class="col-sm-4">
          <label for="#">Property Use Type</label>
          <select bind:value={data.space_use} class="form-control">
            <option value="office"> Office </option>
            <option value="personal"> Personal </option>
            <option value="warehouse"> Warehouse </option>
            <option value="medical"> Medical </option>
            <option value="academic"> Academic </option>
            <option value="others"> Others </option>
          </select>
        </div>


      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="form-group col-sm-4">
          <label for="#">Property Sale Type</label>
          <select bind:value={data.for} class="form-control">
            <option value="sale"> Sale </option>
            <option value="rent"> Rent </option>
            <option value="lease"> Lease </option>
          </select>
        </div>
        <div class="col-sm-4">
          <label for="#">Address 1</label>
          <div class="form-group">
            <input required bind:value={data.address_1} class="form-control" type="text" placeholder="Address 1">
          </div>
        </div>
     
        <div class="col-sm-4">
          <label for="#">Address 2</label>
          <div class="form-group">
            <input required bind:value={data.address_2} class="form-control" type="text" placeholder="Address 2">
          </div>
        </div>
      </div>
    </div>


    <div class="container">
      <div class="row">

        <div class="col-6 col-sm-6 col-lg-6 col-xl-3 mt-5">
          <label for="#">Country</label>
          <select bind:value={data.country}  class="form-control">
            <option value="">Select Country</option>
            {#each Countries as Country}
            <option value="{Country}">{Country}</option>
            {/each}
          </select>
        </div>
        <div class="col-6 col-sm-6 col-lg-6 col-xl-3 mt-5">
          <label for="#">State</label>
          <select  bind:value={data.state} class="form-control">
            {#if data.country != ""}
            {#each States[data.country] as State}
            <option value="{State}">{State}</option>
            {/each}
            {/if}
           
          </select>
        </div>

        <div class="col-6 col-sm-6 col-lg-6 col-xl-3 mt-5">
          <label for="#">City</label>
          <div class="form-group">
            <input required bind:value={data.city} class="form-control" type="text" placeholder="City">
          </div>
        </div>

        <div class="col-6 col-sm-6 col-lg-6 col-xl-3 mt-5">
          <label for="#">Zip Code</label>
          <div class="form-group">
            <input required class="form-control" bind:value={data.zip_code
          } type="text" placeholder="ZIP Code">
          </div>
        </div>

      </div>
    </div>


    <div class="container">
      <div class="row">


        <div class="col-6 col-sm-6 col-lg-6 col-xl-6">
          <label for="#">Zoning</label>
          <div class="form-group">
            <input required bind:value={data.zoning} class="form-control" type="text" placeholder="Zoning">
          </div>
        </div>

        <div class="col-6 col-sm-6 col-lg-6 col-xl-6">
          <label for="#">Year Build</label>
          <div class="form-group">
            <input required bind:value={data.year_built} class="form-control" type="text" placeholder="Year built">
          </div>
        </div>

      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-6 col-sm-6 col-lg-6 col-xl-6">
          <label for="#">Is Renovated?</label>
          <select bind:value={data.renovated} class="form-control">
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
  
        </div>

        <div  class="col-6 col-sm-6 col-lg-6 col-xl-6">
          <label for="#">Year Renovated</label>
          <div class="form-group">
            <input required disabled={!data.renovated} bind:value={data.renovated_year} class="form-control" type="text" placeholder="Renovated Year">
          </div>
        </div>

      </div>
    </div>


    <div class="container">
      <div class="row">

        <div class="col-6 col-sm-6 col-lg-6 col-xl-6">
          <label for="#">Building Size (SF)</label>
          <input bind:value={data.building_size} class="form-control" type="text" placeholder="Building Size">
        </div>

        <div class="col-6 col-sm-6 col-lg-6 col-xl-6">
          <label for="#">Lot Size (SF)</label>
          <input required bind:value={data.lot_size} class="form-control" type="text" placeholder="Lot Size">
        </div>

      </div>
    </div>


    <div class="container">
      <div class="row">

        <div class="col-6 col-sm-6 col-lg-6 col-xl-3 mt-5">
          <label for="#">Construction Type</label>
          <select bind:value={data.construction_type} class="form-control">
            <option value="metal">Metal</option>
            <option value="wood">Wood</option>
            <option value="concrete">Concrete</option>
          </select>
        </div>

        <div class="col-6 col-sm-6 col-lg-6 col-xl-3 mt-5">
          <label for="#">Sewer</label>
          <select bind:value={data.sewer} class="form-control">
            <option value="city">City</option>
            <option value="self">Self</option>
          </select>
        </div>

        <div class="col-6 col-sm-6 col-lg-6 col-xl-3 mt-5">
          <label for="#">Electricity</label>
          <select bind:value={data.electricity} class="form-control">
            <option value="commercial">Commerical</option>
            <option value="Domestic">Domestic</option>
          </select>
        </div>

        <div class="col-6 col-sm-6 col-lg-6 col-xl-3 mt-5">
          <label for="#">Youtube Video Link</label>
          <input required bind:value={data.video} class="form-control" type="text" placeholder="Enter Youtube Video Link">
         </div>


      </div>
    </div>

  <div class="container">
    
    <div class="list">
      <h3>Highlights</h3>
      <ul class="list-group">
        {#if data.highlights !=[]}
          {#each data.highlights as highlight, i}
          <li class="list-group-item d-flex justify-content-start">
            <button 
            on:click={()=>{
              (data.highlights).splice(i,1)
              data.highlights=data.highlights
            }}
              type="button" 
              class="btn btn-danger me-2">
              Delete
            </button>
            <p>{highlight}</p> 
          </li>
          {/each}
        {/if}
        

      </ul>
    </div>

    <div class="container highlights pt-2 pb-2">

     <div class="row">
       <div class="col-sm-10">
        <input bind:value={highlights} class="form-control m-0" type="text" placeholder="Enter Highlights">
       </div>
      
      <button 
        on:click={()=>{
          data.highlights = [
            ...data.highlights,
            highlights
          ]
          highlights = ""
        }}
        type="button" 
        class="col-sm-2 btn btn-outline-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill"         
              viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg> 
        Highlights
      </button>
     </div>

    </div>

  </div>


<label for="#"></label>


  <div class="floors" id="accordionExample">
    {#each data.floors as floor, i}

    <div class="floor">

      <div class="row mt-3">
        <div class="col-sm-3">
          <label for="#">Floor Number #</label>
          <input class="form-control" type="text" bind:value={floor.floor_number}>
        </div>

        <div class="col-sm-3">
          <label for="#">SIZE (SQFT)</label>
          <input class="form-control" type="text" bind:value={floor.floor_size}>
        </div>

        <div class="col-sm-3">
          <label for="#">PERIOD OF TENURE</label>
          <input class="form-control" type="text" bind:value={floor.period_of_tenure}>
        </div>

        <div class="col-sm-3">
          <label for="#">TERM</label>
          <select class="form-select" bind:value={floor.term} name="" id="">
            <option value="negotiable">Negotiable</option>
            <option value="non-negotiable">Non-Negotiable</option>
          </select>
        </div>

      </div>

      <div class="row mt-3">
        
        <div class="col-sm-3">
          <label for="#">RATE</label>
          <input class="form-control" type="text" bind:value={floor.rate}>
        </div>
        <div class="col-sm-3">
          <label for="#">SPACE USE</label>
          <select bind:value={floor.space_use} class="form-control">
            <option value="office"> Office </option>
            <option value="personal"> Personal </option>
            <option value="warehouse"> Warehouse </option>
            <option value="medical"> Medical </option>
            <option value="academic"> Academic </option>
            <option value="others"> Others </option>
          </select>
        </div>

        <div class="col-sm-3">
          <label for="#">CONDITION</label>
          <select bind:value={floor.condition} class="form-control">
            <option value="partially built"> Partially Built </option>
            <option value="ready to use"> Ready to use</option>
            <option value="needs repair"> Needs repair </option>
            <option value="fully furnished"> Fully furnished </option>
          </select>
        </div>
        <div class="col-sm-3">
          <label for="#">AVAILABLE</label> 
          <select class="form-select" bind:value={floor.avaliable} name="" id="">
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </div>
      
      
      
      
  

      <ul class="list-group amenity">
        {#if floor.amenities}
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-2">Amenities</h5>
          </div>
            <ul>
              {#each floor.amenities as amenity, index}
              <li class="amenities">
                <input class="form-control" type="text" bind:value={amenity} placeholder={`Amenities No ${index+1}`}>
                <button 
                on:click={()=>{
                  (data.floors[i].amenities).splice(index, 1)
                  data.floors[i].amenities = data.floors[i].amenities
                }} 
                type="button" class="btn btn-danger">
                  Remove
                </button>
              </li>
              {/each}
            </ul>
            <button on:click={()=>{ floor.amenities = [...floor.amenities, ""]}} type="button" class="btn btn-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill"         
                viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg> 
                Amenities
            </button>
        {/if}
    </ul>
  
    <button 
    on:click={()=>{
      (data.floors).splice(i, 1)
      data.floors = data.floors
    }} 
    type="button" class="btn btn-danger">
      
        Remove Floor
    </button>
    </div>


    {/each}
 <div class="d-flex justify-content-center align-items-center">
  <button class="btn btn-danger" on:click={()=>{addFloor()}} type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill"         
              viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
              </svg> 
    Add Floor

  </button>
 </div>
</div>



  <div class="container">
    <div class="col-12" id="map"></div>
  </div>


  <div class="d-flex justify-content-center align-items-center mb-5">
    <button type="submit" class="btn btn-primary">Submit the property</button>
  </div>
    
  </form>
</div>



<style lang="scss">

  .highlights {
    padding: 50px auto;
  }

  .amenities {
    display: grid;
    grid-template-columns: 0.8fr 0.2fr;
    margin: 10px auto;
    gap: 5px;
  }

  .amenity {
    border: 2px rgb(65, 65, 65) solid;
    padding: 2% 5%; 
    margin: 2% auto;
  }

  .floors {
    width: 80%;
    margin: auto;
  
  }

  .floor {
    border: 2px rgb(255, 0, 0) solid;
    border-radius: 5px;
    margin: 2% auto;
    padding: 2% 5%;
  
  }
  .container{
    margin: 35px auto;
  
  }
  .img-span {
    display: inline;
    widows: unset;
  }
  .img {

    .img-container{
      display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    }

    .img-span {
      display: inline;
      width: unset;
    }
  }

  label {
    display: block;
  }

  #map { 
    
        width: 100%;
        height: 50vh; 

        
      }
  .container {
    background-color: rgb(255, 250, 255);
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(11, 0, 132, 0.07);
  }
</style>