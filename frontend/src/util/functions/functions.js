export function logout() {

    localStorage.clear("login")
    window.location.href = "/";
}


export function checkSignIn () {

    if (localStorage.getItem("login")) {
        
        window.location.href = "/account"
    }
}