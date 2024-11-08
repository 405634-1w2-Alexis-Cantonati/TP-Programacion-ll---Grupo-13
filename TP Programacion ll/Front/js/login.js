document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();


    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    let data = {
        idUsuario: 0,
        NUsuario: usuario,
        constraseña: contrasena
    }
    console.log(data);
    
    fetch("https://localhost:7042/api/Usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data.token) {

                localStorage.setItem("jwt_token", data.token);

                window.location.href = "principal.html";
            } else {
                alert("Credenciales incorrectas.");
            }
        })
        .catch(error => {
            console.error("Error al iniciar sesión:", error);
            alert("Hubo un error al iniciar sesión.");
        });
});