$(document).ready(function() {
    // Verificar si hay un usuario en sesión
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || usuario.rol !== 'barbero') {
        window.location.href = 'index.html'; // Redirigir si no es un barbero
    } else {
        cargarCitas(usuario.id);
    }
});

function cargarCitas(barberoId) {
    // Realizar una petición AJAX para obtener las citas del barbero desde el servidor
    $.ajax({
        url: '../php/citas.php',
        type: 'POST',
        data: {"barberoId": barberoId},
        dataType: 'json',
        success: function(response) {
            // Verificar si la respuesta indica éxito y contiene datos de citas
            if (response.success && response.citas) {
                // Limpiar la tabla
                $('#tablaCitas tbody').empty();

                // Iterar sobre las citas recibidas y agregarlas a la tabla
                response.citas.forEach(function(cita) {
                    console.log(cita);
                    var fila = `<tr>
                                    <td>${cita.ID_cita}</td>
                                    <td>${cita.ID_cliente}</td>
                                    <td>${cita.ID_barbero}</td>
                                    <td>${cita.ID_servicio}</td>
                                    <td>${cita.Fecha_hora}</td>
                                    <td>${cita.Estado_cita}</td>
                                    <td>
                                        <button onclick="editarCita(${cita.ID_cita})">Editar</button>
                                        <button onclick="eliminarCita(${cita.ID_cita})">Eliminar</button>
                                    </td>
                                </tr>`;
                    $('#tablaCitas tbody').append(fila);
                });
            } else {
                console.error('Error al cargar citas:', response.message);
            }
        },
        error: function(xhr, status, error) {
            // Manejar errores si los hubiera
            console.error('Error al cargar citas:', error);
        }
    });
}

function editarCita(citaId) {
    // Lógica para editar una cita
}

function eliminarCita(citaId) {
    // Lógica para eliminar una cita
}
