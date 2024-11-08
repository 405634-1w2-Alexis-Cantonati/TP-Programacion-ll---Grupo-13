async function obtenerMascotas() {
    const response = await fetch('https://localhost:7042/api/Mascota');
    return await response.json();
}

async function cargarGrafico() {
    const mascotas = await obtenerMascotas();
    
    const tipoCounts = {};

    mascotas.forEach(mascota => {
        const tipoNombre = mascota.idTipoNavigation.nombre; 
        tipoCounts[tipoNombre] = (tipoCounts[tipoNombre] || 0) + 1;
    });


    const etiquetas = Object.keys(tipoCounts); 
    const valores = Object.values(tipoCounts); 

    const ctx = document.getElementById('graficoMascotas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Cantidad de Mascotas',
                data: valores,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, // para que solo muestre enteros
                        callback: function(value) { return Number(value).toFixed(0); } // saca los decimales
                    }
                }
            }
        }
    });
}

async function cargarDatosClientes() {
    try {
        const responseClientes = await fetch('https://localhost:7042/api/Cliente');
        const responseMascotas = await fetch('https://localhost:7042/api/Mascota');

        const clientes = await responseClientes.json();
        const mascotas = await responseMascotas.json();

        const nCliente = clientes.length;
        const nMascotas = mascotas.length;

        cargarGraficoClientes(nCliente, nMascotas);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}
function cargarGraficoClientes(nCliente,nMascotas) {
    const ctx = document.getElementById('graficoClientes').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Numero De Clientes', 'Numero De Mascotas'],
            datasets: [{
                label: 'Clientes y Mascotas',
                data: [nCliente, nMascotas],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

async function cargarDatosGenero() {
    try {
        const response = await fetch('https://localhost:7042/api/Cliente');

        const clientes = await response.json();
        let mujeres = 0
        let hombres = 0
        let noBinario = 0

        clientes.forEach(cliente => {
            if (cliente.sexo === "Femenino") mujeres++
            if (cliente.sexo === "Masculino") hombres++
            if (cliente.sexo === "No Binario") noBinario++
        });

        cargarGraficoGeneros(hombres, mujeres, noBinario);
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}
function cargarGraficoGeneros(hombres, mujeres, noBinario) {
    const ctx = document.getElementById('graficoGenero').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Numero De Hombres', 'Numero De Mujeres', 'Numero de no Binario'],
            datasets: [{
                label: 'Cantidad por genero',
                data: [hombres, mujeres, noBinario],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

async function cargarDatosImportes() {
    try {
        const response = await fetch('https://localhost:7042/api/Atencion');
        if (!response.ok) throw new Error('Error al obtener datos de la API');
        
        const atenciones = await response.json();

        const importes = atenciones.map(atencion => atencion.importe);
        
        const maxImporte = Math.max(...importes);
        const minImporte = Math.min(...importes);
        const avgImporte = importes.reduce((acc, curr) => acc + curr, 0) / importes.length;

        cargarGraficoImportes(maxImporte, minImporte, avgImporte);
    } catch (error) {
        console.error("Error al cargar los datos de importes:", error);
    }
}

function cargarGraficoImportes(maxImporte, minImporte, avgImporte) {
    const ctx = document.getElementById('miGrafico').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Más Caro', 'Más Barato', 'Media'],
            datasets: [{
                label: 'Importe ($)',
                data: [maxImporte, minImporte, avgImporte],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}


