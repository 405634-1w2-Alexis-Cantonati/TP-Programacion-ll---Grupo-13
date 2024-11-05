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
        document.getElementById("thead").removeAttribute("hidden")
        console.log(mascotas);

        let tbody = ""
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
                    <button onClick='eliminarMascota(${element.idMascota})' class="btn btn-danger">Eliminar</button>
                </td>
               <td><button onClick='consultarMascotaId(${element.idMascota})' class="btn btn-info">Modificar</button></td>
            </tr>`
        });

        $tbody.innerHTML = tbody;
    }
    catch (error) {
        console.error("Error al cargar las mascotas:", error);
    }
};

async function eliminarMascota(id) {
    try {
        if (window.confirm("Seguro que desea registrar la baja de la mascota?")) {
            console.log(id);

            const response =
                await fetch(`https://localhost:7042/api/Mascota?id=${id}`, { method: 'DELETE' });
            if (response.ok) {
                consultarMascota()
            } else {
                alert('No se pudo eliminar la mascota');
            }
        }
    } catch (error) {
        console.error("Error al registrar la baja de mascota:", error);
    }
}

async function consultarMascotaId(id) {
    try {
        console.log(id);

        const response = await fetch(`https://localhost:7042/api/Mascota/${id}`);
        const mascota = await response.json();
        const $tbody = document.getElementById("tbody");
        document.getElementById("thead").setAttribute("hidden", "")
        let tbody = `
            <div>
                <h2 class="text-center">Modificar mascota</h2>
                    <div class="form-group">
                        <label for="tipo">Tipo:</label>
                        <select id="tipo" name="tipo" class="form-control">
                            <option value="1"> Perro</option>
                            <option value="2">Gato</option>
                            <option value="3">Ave</option>
                            <option value="4">Nutria</option>
                            <option value="5">Conejo</option>
                            <option value="6">Delfin</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" value="${mascota.nombre}" required>
                    </div>
                    <div class="form-group">
                        <label for="edad">Edad:</label>
                        <input type="number" class="form-control" id="edad" min="0" value="${mascota.edad}" required>
                    </div>
                    
                    <div class="botonera">
                        <button type="button" class="btn btn-secondary" onclick="modificarMascota()">Enviar</button>
                        <a href="/TP Programacion ll/Front/principal.html" class="btn btn-secondary">Inicio</a>
                    </div>
                </form>
            </div>`

        $tbody.innerHTML = tbody;

    } catch (error) {
        console.error("Error al obtener los datos de la mascota:", error);
    }
}

async function crearMascota() {
    const idMascota = 0;
    const idTipo = parseInt(document.getElementById("tipoMascota").value);
    const nombreMascota = document.getElementById('nombreMascota').value;

    const idCliente = document.getElementById("nombreCliente").value;


    const datos = {
        idMascota: 0,
        idTipo: idTipo,
        idCliente: idCliente,
        nombre: nombreMascota,
        edad: edad
    };

    try {
        const respuesta = await fetch(`https://localhost:7042/api/Mascota`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            document.getElementById('ok').hidden = false;
        } else {
            document.getElementById('error').hidden = false;
        }
    } catch (error) {
        document.getElementById('error').hidden = false;
    }
}

function cerrar() {
    document.getElementById('error').hidden = true;
    document.getElementById('ok').hidden = true;
}

async function modificarMascota() {

}

/*async function obtenerIdCliente(cliente) {
    const response = await fetch('https://localhost:7042/api/Cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });
    var a = await response.json()
    return a.idCliente
}*/

async function cargarClientes(modo) {

    try {
        const $clientes = document.getElementById('nombreCliente');
        $clientes.innerHTML = '';
        const response = await fetch(`https://localhost:7042/api/Cliente`);
        const clientes = await response.json();

        clientes.forEach(cliente => {
            const $option = document.createElement('option');
            $option.value = cliente.idCliente;
            $option.textContent = cliente.nombre;
            $clientes.appendChild($option);
        });

    } catch (error) {
        console.error("Error al cargar los clientes:", error);
    }

}



//falta la funcion de modificar --> se supone que ya esta
//en el formulario de modificar debo traer tambien la fecha de atencion y el nombre de cliente -->se supone ya esta pero ahora tira un 400 al enviar
//en transaccion es lo mismo que consultar pero trae todos los datos
//en dashboard tengo que ver que muestro