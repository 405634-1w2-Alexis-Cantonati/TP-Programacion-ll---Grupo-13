var data = [
    { "nombre": "Federico", "apellido": "Sosa", "legajo": 412302 },
    { "nombre": "Alexis", "apellido": "Cantonati", "legajo": 405634 },
    { "nombre": "Lautaro", "apellido": "Diego", "legajo": 404903 }
];

var index = 0;

function mostrarDatos() {
    setTimeout(() => {
        document.getElementById("nombre").value = data[index].nombre;
        document.getElementById("apellido").value = data[index].apellido;
        document.getElementById("legajo").value = data[index].legajo;
    }, 10)
}

function siguiente() {
    index = (index + 1) % data.length;
    mostrarDatos();
}

function anterior() {
    index = (index - 1 + data.length) % data.length;
    mostrarDatos();
}

