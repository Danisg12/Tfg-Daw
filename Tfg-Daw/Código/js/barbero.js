$(document).ready(function() {
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || usuario.rol !== 'barbero') {
        window.location.href = 'index.html';
    } else {
        cargarCitas(usuario.id);
    }
});

function cargarCitas(barberoId) {
    $.ajax({
        url: '../php/citas.php',
        type: 'POST',
        data: {"barberoId": barberoId},
        dataType: 'json',
        success: function(response) {
            if (response.success && response.citas) {
                $('#tablaCitas tbody').empty();

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
        error: function(error) {
            console.error('Error al cargar citas:', error);
        }
    });
}

function editarCita(citaId) {
}

function eliminarCita(citaId) {
}
