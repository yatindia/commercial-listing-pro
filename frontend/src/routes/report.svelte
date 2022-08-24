<script>
    import {onMount} from "svelte"
    import {API} from "../config"
    import Swal from "sweetalert2"

    let token = "loading"

    let report = {
        compliant_on: "",
        type: "property", 
        message: ""
    }

    onMount(()=>{
        token = JSON.parse(localStorage.getItem("login"))
    })


    const submit = async ()=>{
        
        console.log(API);

        await fetch(`${API}/user/report`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `<Bearer> ${token}`
            },
            body: JSON.stringify({report})
        })
        .then(res => res.json())
        .then(res => {
            if (res.status) {
                
                Swal.fire({
                    icon: "success",
                    title: "Report Submitted"
                })
            }else {

            }
        })
        .catch(err => {
            console.log(err);
        })
    }



</script>

<svelte:head>
    <title>
        CLSP - Report Portal | commerical listings pro
    </title>
</svelte:head>
<main>
    <form on:submit|preventDefault={()=>submit()}>
        <h1>CLSP Report Portal</h1>
        <div class="form-group">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label>Enter ID of User/Property</label>
          <input
          required 
            type="text" 
            class="form-control" 
            placeholder="Enter ID of User/Property"
            bind:value={report.compliant_on}
          >
        </div>

        <div class="form-group">
            <label for="exampleFormControlSelect1">You are reporting about a</label>
            <select required bind:value={report.type} class="form-control" id="exampleFormControlSelect1">
              <option value="property">Property</option>
              <option value="user">User</option>
            </select>
        </div>

        <div class="form-group">
            <label for="exampleFormControlTextarea1">Explaination for the report</label>
            <input 
            required
            type="text" 
            class="form-control" 
            placeholder="message"
            bind:value={report.message}
          >
        </div>

        <button type="submit" class="btn btn-danger">Place Report</button>
      </form>
</main>


<style lang="scss">

    main {
        width: 100%;
        max-width: 480px;
        margin: auto;
        padding-top: 2%;

        form {

            .form-group {
                margin: 5% auto
            }
        }
    }

</style>