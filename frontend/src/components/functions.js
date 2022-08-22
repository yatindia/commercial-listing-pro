
export function protectedRoute(){

    let login = localStorage.getItem("login")

    if(login === null){

        window.location.href = "/"
    }
}