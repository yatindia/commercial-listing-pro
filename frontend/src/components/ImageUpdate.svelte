<script>
	import {createEventDispatcher} from "svelte"
	import {API, IMG} from "../config"
	export let  src;
	export let id

	let dispatch = createEventDispatcher()
	$:console.log(id);

	async function deleteImage(_img) {
		let token = window.localStorage.getItem("login");
          token = JSON.parse(token)

		//   console.log(_img, id);

		await fetch(`${API}/property/imagedelete`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
					filename: _img,
					_id: id
					})
				})
				.then(res => res.json())
				.then((res)=>{
				if (res.status) {

					dispatch("delete")
				}
			})
				
		}



		

	
</script>
<div id="up">


		<div 
			on:click={()=>{  deleteImage(src)}}
			class="avatarBG" 
			style={`background-image: url(${IMG}/${src});`}>
			<img class="delete" src="/img/delete.png" alt="" /> 
		</div>
    
</div>
<style lang="scss"> 
	#up{
	    display:inline-flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
}
 
	.upload{
		display:flex;
		width:100px;
		cursor:pointer;
		
	}
	.avatarBG {
		width: 100px;
		height: 100px;
		background-size: cover;
		border: 3px red solid;
		border-radius: 5px;
		&:hover {
			background-color: #000 !important;

			.delete {
		
			opacity: 1;
		}

			
		}

		.delete {
			width: 100%;
			padding: 25%;
			opacity: 0;
			background-color: rgba(0, 0, 0, 0.481);
		}
	}
	.avatar{
		display:flex;
		height:100px;
		width:100px;
		border: 10px red solid;
		padding: 5px;
		border-radius: 5px;
	}
</style>