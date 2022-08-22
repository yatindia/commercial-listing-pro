
<script>
    import {logout} from "../functions/functions"
  export let login
</script>


<nav class="navbar navbar-expand-lg navbar-light bgdanger">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img class="logo" src="/img/logo.png" alt="">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
      </ul>
<div class="d-flex">

{#if login !== null}

<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">

      <li class="nav-item ">
        <a class="nav-link" href="/user/account">Account |</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/user/post">New Post |</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/user/myproperties">My Properties |</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/search">Search |</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/user/settings">Settings |</a>
      </li>
      <li class="nav-item logout">
        <button on:click={()=> logout()} class="btn btn-light">
          Logout &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
      </button>
      </li>
      <!-- <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/">Action</a>
          <a class="dropdown-item" href="/">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/">Something else here</a>
        </div>
      </li> -->

    </ul>
</div>

{:else}
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item active">
          <a class="nav-link" href="/auth/login">Login</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="/auth/signup">Signup </a>
        </li>


      </ul>
  </div>
{/if}
</div>
    </div>
  </div>
</nav>






























<style>


.nav-link {
  color: #14213d

}

    .navbar1 {

        width: 100%;
        height: 10vh;
        background-color: #c1202c;
        /* box-shadow: 0px 0 10px rgba(70, 21, 21, 0.274); */
    }

    .logo {
        height: 5vh;
        margin: 2vh;
    }

    a {
        text-decoration: none !important;
    }

    ul {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ul a li {
        font-size: 20px;
        font-weight: bold;
        color: #14213d;
        padding: 0 10px 0 10px;
    }
    nav.bgdanger {
    background-color: #B6D5EB;
  }
  .logout {
    color: #14213d;
  }



</style>