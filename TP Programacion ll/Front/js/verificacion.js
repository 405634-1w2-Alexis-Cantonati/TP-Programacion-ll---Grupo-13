const token = localStorage.getItem("jwt_token");

if (!token) {
    window.location.href = "login.html";
} else {
    console.log("Token encontrado, acceso permitido.");
}