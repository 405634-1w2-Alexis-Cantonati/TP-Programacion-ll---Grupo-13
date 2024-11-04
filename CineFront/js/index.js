async function cargar_generos() {
    try {
        const response = await fetch(`http://localhost:5079/api/Generos`);
        const generos = await response.json();
        const $generos = document.getElementById('generos');
        generos.forEach(element => {
            const $option = document.createElement('option');
            $option.value = element.id;
            $option.textContent = element.nombre;
            $generos.appendChild($option);
        });
    } catch (error) {
        console.error("Error al cargar los géneros:", error);
    }
}

async function consultar_peliculas() {
    try {
        const $generos = document.getElementById("generos");
        let seleccionado = $generos.value
        if (seleccionado) {

            const response = await fetch(`http://localhost:5079/api/Peliculas/${seleccionado}`);
            const peliculas = await response.json();
            const $tbody = document.getElementById('tbody');
            let tbody = ''
            console.log(peliculas)
            peliculas.forEach(element => {
                tbody += `
                <tr>
                    <td style="display: none;" >
                        ${element.id}
                    </td>
                    <td>
                        ${element.titulo}
                    </td>
                    <td>
                        ${element.director}
                    </td>
                    <td>
                        ${element.anio}
                    </td>
                    <td>
                        ${element.generoNavigation.nombre}
                    </td>
                    <td>
                        <button onClick='eliminar_pelicula(${element.id})' class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>`
            });
            $tbody.innerHTML = tbody

        }
    } catch (error) {
        console.error("Error al cargar películas:", error);
    }
}

async function eliminar_pelicula(id) {
    try {
        if (window.confirm("Seguro que desea registrar la baja de la película?")) {
            const response = await fetch(`http://localhost:5079/api/Peliculas/${id}`, {method: 'DELETE'});
            if(response.ok){
                consultar_peliculas()
            }else{
                alert('No se pudo eliminar la pelicula');
            }
            
        }
    } catch (error) {
        console.error("Error al registrar la baja de película:", error);
    }
}

function registrar_alta() {
    const $divError = document.getElementById("error");
    const $divOk = document.getElementById("ok");
    const $titulo = document.getElementById("titulo");
    const $director = document.getElementById("dire");
    const $anio = document.getElementById("anio");
    const $generos = document.getElementById("generos");

    let data = {
        titulo: $titulo.value,
        director: $director.value,
        anio: $anio.value,
        idGenero:  $generos.value, 
        estreno:true
    };

    fetch('http://localhost:5079/api/Peliculas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Especifica que el contenido es JSON
        },
        body: JSON.stringify(data) // Convierte el objeto `data` a una cadena JSON
    })
        .then(response => {
            if (response.ok) {
                $divOk.removeAttribute('hidden')
                document.querySelector('form').reset();
            } else {
                $divError.removeAttribute('hidden')
            }

            return response.json();

        })
        .then(data => {
            console.log('Respuesta del servidor:', data); // Maneja la respuesta del servidor
        })
        .catch(error => {
            console.error('Error:', error); // Manejo de errores
        });

}

//función para recargar la página:
function cerrar(id) {
    document.getElementById(id).hidden = true;
}