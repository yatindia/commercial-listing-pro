<script>
    import Hero from "../util/Hero/Hero.svelte"
    import {API, IMG} from "../config"



    import {onMount} from "svelte"


    let login;
     let properties;

    onMount(async ()=>{

        login = JSON.parse(localStorage.getItem("login"))

        let search={
            search:' ',
            skip:0,
            limit:6
          };

        const response = await fetch(`${API}/property/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login}`,
        },
       
      body: JSON.stringify(search),

      });
      const data = await response.json();
      properties = data.data[0];
      console.log(properties);
        
    })



</script>

<svelte:head>
<link rel="icon" href="/img/favicon.png" />
<title>Welcome Commercial Listings Pro</title>
</svelte:head>


<Hero {login} />

<section class="wrapper">
    <div class="container">
      <div class="row">
        <div class="col text-center mb-5">
           <h1 class="display-4">Recent Properties</h1>

        </div>
      </div>
    <div class="row">
      {#if properties}
        {#each properties as property}
           <div class="col-sm-12 col-md-6 col-lg-4 mb-4 rp"><div class="card text-white card-has-bg click-col" style={`background-image:url(${IMG}/${property.photos[0]});`}>
           <img class="card-img d-none" src="https://source.unsplash.com/600x00/?tech,street" alt="Goverment Lorem Ipsum Sit Amet Consectetur dipisi?">
          <div class="card-img-overlay d-flex flex-column">
           <div class="card-body">
              <small class="card-meta">{property.space_use}</small>
              <h4 class="card-title mt-0 "><a class="text-white" herf="#">{property.title}</a></h4>
             <small>
              <!-- <i class="far fa-clock"></i> -->
               {property.address_1}</small>
            </div>
            <div class="card-footer">
             <div class="media">
    <!-- <img class="mr-3 rounded-circle" src="https://assets.codepen.io/460692/internal/avatars/users/default.png" alt="Generic placeholder image" style="max-width:50px"> -->
    <div class="media-body">
      <h4>{property.building_size} Sq Ft</h4>
      <h6 class="my-0 text-white d-block">{property.state}</h6>
       <small>{property.city} , {property.zip_code}</small>
    </div>
  </div>
            </div>
          </div>
        </div></div>
        {/each}
      {/if}

      <!-- google ad -->
      
  
  
 
     
   
    
  </div>
    
  </div>

  </section>

  <div class='google'>

    <h4 class='pt-4'>Google Ad</h4>
  </div>
  <style>
      body {
  /* Created with https://www.css-gradient.com */
  background: #23EC55;
  background: -webkit-radial-gradient(top right, #23EC55, #2D51C1);
  background: -moz-radial-gradient(top right, #23EC55, #2D51C1);
  background: radial-gradient(to bottom left, #23EC55, #2D51C1);
}
h1 {
  color: #14213d;
}
.wrapper {
  margin: 10vh;
}

.card {
  border: none;
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
  overflow: hidden;
  border-radius: 20px;
  min-height: 450px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
}

.rp {
  background-image:url('/img/immig.jpg') no-repeat center contain/cover;
  background-position: center;
  background-size: contain;
}
@media (max-width: 768px) {
  .card {
    min-height: 350px;
  }
}
@media (max-width: 420px) {
  .card {
    min-height: 300px;
  }
}
.card.card-has-bg {
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
  background-size: 120%;
  background-repeat: no-repeat;
  background-position: center center;
}
.card.card-has-bg:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: inherit;
  -webkit-filter: grayscale(1);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
}
.card.card-has-bg:hover {
  transform: scale(0.98);
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.3);
  background-size: 130%;
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
}
.card.card-has-bg:hover .card-img-overlay {
  transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
  background: #234f6d;
  background: linear-gradient(0deg, rgba(4, 69, 114, 0.5) 0%, #044572 100%);
}
.card .card-footer {
  background: none;
  border-top: none;
}
.card .card-footer .media img {
  border: solid 3px rgba(255, 255, 255, 0.3);
}
.card .card-meta {
  color: #26BD75;
}
.card .card-body {
  transition: all 500ms cubic-bezier(0.19, 1, 0.22, 1);
}
.card:hover {
  cursor: pointer;
  transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
}
.card:hover .card-body {
  margin-top: 30px;
  transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
}
.card .card-img-overlay {
  transition: all 800ms cubic-bezier(0.19, 1, 0.22, 1);
  background: #234f6d;
  background: linear-gradient(0deg, rgba(35, 79, 109, 0.3785889356) 0%, #455f71 100%);
}
.google {
  width: 100vw;
  margin-bottom: 20px;
  height: 240px;
  background-color: rgb(170, 187, 240);
  text-align: center;
}
  </style>
  