//ABMC DE ATENCIONES

async function consultarAtenciones() {
    try {
        const response = await fetch("https://localhost:7042/api/Atencion");
        const atenciones = await response.json();
        const $tbody = document.getElementById("tbody")
        document.getElementById("thead").removeAttribute("hidden")
        console.log(atenciones);

        let tbody = ""
        atenciones.forEach(element => {
            tbody += `
            <tr>
                <td>
                    ${element.idMascota}
                </td>
                <td>
                    ${element.fecha}
                </td>
                <td>
                    ${element.descripcion}
                </td>
                <td>
                    ${element.importe}
                </td>
                <td>
                    <button onClick='eliminarAtencion(${element.idAtencion})' class="btn btn-danger">Eliminar</button>
                </td>
               <td><button onClick='consultarAtencionId(${element.idAtencion})' class="btn btn-info">Modificar</button></td>
            </tr>`
        });

        $tbody.innerHTML = tbody;
    }
    catch (error) {
        console.error("Error al cargar las atenciones:", error);
    }
};

async function eliminarAtencion(id) {
    try {
        if (window.confirm("Seguro que desea registrar la baja de la atencion?")) {
            console.log(id);

            const response =
                await fetch(`https://localhost:7042/api/Atencion?id=${id}`, { method: 'DELETE' });
            if (response.ok) {
                consultarAtenciones()
            } else {
                alert('No se pudo eliminar la atencion');
            }
        }
    } catch (error) {
        console.error("Error al registrar la baja de la atencion:", error);
    }
}

async function crearAtencion() {
    const idAtencion = 0;
    const mascotaId = document.getElementById("mascotaSelect").value;
    const Descripcion = document.getElementById("Descripcion").value
    const Importe = document.getElementById("Importe").value


    const datos = {
        idAtencion: 0,
        idMascota: mascotaId,
        //configura dia y hora locales
        fecha: new Date().toLocaleString("sv-SE").replace(" ", "T"),
        descripcion: Descripcion,
        importe: parseFloat(Importe)
    };

    try {
        const respuesta = await fetch(`https://localhost:7042/api/Atencion`, {
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
// metodo que se activa cuando cargas el alta de atenciones, sirve para cargar
// los nombres de las mascotas en un select y asignarle el valor del id
async function cargarMascotas(selectedId = null) {
    try {
        const response = await fetch('https://localhost:7042/api/Mascota');
        if (!response.ok) throw new Error('Error al obtener datos de la API');

        const mascotas = await response.json();

        const mascotaSelect = document.getElementById('mascotaSelect');
        mascotaSelect.innerHTML = '<option value="">Selecciona una mascota</option>';

        mascotas.forEach(mascota => {
            const option = document.createElement('option');
            option.value = mascota.idMascota;      
            option.textContent = mascota.nombre; 
            mascotaSelect.appendChild(option);
        });
        if (selectedId) {
            mascotaSelect.value = selectedId; // para que aparesca la masctota seleccionada cuando modifiques una
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
async function consultarAtencionId(id) {
    try {
        console.log(id);

        const response = await fetch(`https://localhost:7042/api/Atencion/${id}`);
        const atencion = await response.json();
        const $tbody = document.getElementById("tbody");
        document.getElementById("thead").setAttribute("hidden", "")
        let tbody = `
            <div>
                <h2 class="text-center">Modificar atencion</h2>
                    <div class="form-group">
                        <label for="mascotaSelect">Mascota:</label>
                        <select id="mascotaSelect" name="mascotaSelect" class="form-control">
                            
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripcion:</label>
                        <input type="datetime" class="form-control" id="fecha" value="${atencion.fecha}" required>
                    </div>
                    <div class="form-group">
                        <label for="fecha">Fecha:</label>
                        <input type="text" class="form-control" id="descripcion" value="${atencion.descripcion}" required>
                    </div>
                    <div class="form-group">
                        <label for="importe">Importe:</label>
                        <input type="number" class="form-control" id="importe" min="0" value="${atencion.importe}" required>
                    </div>
                    
                    <div class="botonera">
                        <button type="button" class="btn btn-secondary" onclick="modificarAtencion(${id})">Enviar</button>
                        <a href="principal.html" class="btn btn-secondary">Inicio</a>
                    </div>
                </form>
            </div>`
        $tbody.innerHTML = tbody;
        await cargarMascotas(atencion.idMascota);
    } catch (error) {
        console.error("Error al obtener los datos de la atencion:", error);
    }
}

async function modificarAtencion(id) {
    try {
        const idAtencion = id;
        const idMascota = document.getElementById('mascotaSelect').value;
        const descripcion = document.getElementById('descripcion').value;

        //paso la fecha
        const fechaOriginal = document.getElementById('fecha').value;
        //formateo la fecha para que la acepte la api
        const fecha = fechaOriginal.toLocaleString("sv-SE", { 
            hour12: false, 
            timeZoneName: "short" 
          }).replace(" ", "T").slice(0, 16);  // Elimina los segundos y milisegundos
        const importe = parseFloat(document.getElementById('importe').value);

        // Asegurarse que no este vacio, porque hay una opcion sin valor en el select
        if (!idMascota) {
            alert("Selecciona una mascota válida.");
            return;
        }

        const atencionModificada = {
            idAtencion,
            idMascota: parseInt(idMascota),
            fecha,
            descripcion,
            importe
        };

        const response = await fetch(`https://localhost:7042/api/Atencion`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atencionModificada)
        });

        if (!response.ok) throw new Error("Error al modificar la atención");

        alert("Atención modificada exitosamente.");

        cargarVista('abmc-atenciones/consulta.html')
        
    } catch (error) {
        console.error("Error al modificar la atención:", error);
        alert("Hubo un problema al modificar la atención.");
    }
}