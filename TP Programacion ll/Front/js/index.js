document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleTheme');
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '🌞';
    }

    toggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        body.classList.toggle('dark-mode');


        if (body.classList.contains('dark-mode')) {
            toggleButton.textContent = '🌞';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            toggleButton.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});


function cargarVista(url, callback = null) {
    fetch(url)
        .then((res) => {
            return res.text()
        })
        .then((text) => {
            const $globalText = document.getElementById('global-text')
            $globalText.innerHTML = text
            if (callback) {
                callback()
            }
            document.getElementById('titulo').setAttribute('hidden', "")
        })
};

async function consultarMascota() {
    try {
        const response = await fetch("https://localhost:7042/api/Mascota");
        const mascotas = await response.json();
        const $tbody = document.getElementById("tbody")
        let tbody = ""
        document.getElementById("b1").removeAttribute("hidden")
        document.getElementById("b2").removeAttribute("hidden")
        mascotas.forEach(element => {
            tbody += `
            <tr>
                <td>
                    ${element.idCliente}
                </td>
                <td>
                    ${element.idTipo}
                </td>
                <td>
                    ${element.nombre}
                </td>
                <td>
                    ${element.edad}
                </td>
                <td>
                    <button onClick='eliminar_mascota(${element.idMascota})' class="btn btn-danger">Eliminar</button>
                </td>
               <td><button onClick='modificar_mascota(${element.idMascota})' class="btn btn-info">Modificar</button></td>
            </tr>`
        });
        
        $tbody.innerHTML = tbody;
    }
    catch (error) {
        console.error("Error al cargar las mascotas:", error);
    }
};

