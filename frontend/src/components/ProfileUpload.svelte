<script>
	import {createEventDispatcher} from "svelte"
	export let  avatar;
	let  fileinput;

	let dispatch = createEventDispatcher()
	
	const onFileSelected =(e)=>{
    let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 avatar = e.target.result
            };
}
	
</script>

<div id="up">
        {#if avatar}
		<div 
			on:click={()=>{fileinput.click()}}
			class="avatarBG" 
			style={`background-image: url(${avatar});`}>
			<img class="delete" src="/img/upload_1.png" alt="" /> 
		</div>
        {:else}

		<div 
		on:click={()=>{fileinput.click()}}
			class="avatarBG" 
			style={`background-image: url(/img/user.webp);`}>
			<img class="delete" src="/img/upload_1.png" alt="" /> 
		</div>
        {/if}
	
        <input style="display:none" type="file" accept=".png, .jpg, .jpeg" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
</div>

<style lang="scss"> 
	#up{
	    display:flex;
		align-items:center;
		justify-content:center;
		flex-flow:column;
		margin-bottom: 20px;
}
 
	.upload{
		display:flex;
		width:100px;
		cursor:pointer;
		
	}
	.avatarBG {
		width: 150px;
		height: unset;
		aspect-ratio: 1;
		background-size: cover;
		border: 3px #171e3c solid;
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
		border: 10px #171e3c solid;
		padding: 5px;
		border-radius: 5px;
	}
</style>