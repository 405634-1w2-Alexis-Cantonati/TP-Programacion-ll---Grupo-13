document.getElementById("formRegistro").addEventListener("submit", function (event) {
    event.preventDefault();


    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    let data = {
        idUsuario: 0,
        NUsuario: usuario,
        constraseña: contrasena
    }

    fetch("https://localhost:7042/api/Usuario/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json(),


        )
        .then(data => {
            let aux = data.message
            console.log(aux);

            if (aux == 1) {
                alert("Gracias por registrarse. Ahora puede ingresar sus credenciales.")
                window.location.href = "login.html";
            }
            else if (aux == 2) {
                alert("El nombre de usuario ya esta en uso. Elija otro.");
            } else {
                throw new Error
            }
        })
        .catch(error => {
            console.error("Error al registrar el usuario:", error);
            alert("Hubo un error al registrar el usuario.");
        });
});