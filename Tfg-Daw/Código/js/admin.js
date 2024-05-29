$(document).ready(function() {
    cargarUsuarios();
    cargarCitas();
});

function cargarUsuarios() {
    $.ajax({
        url: '../php/admin.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success && response.usuario) {
                $('#tablaUsuarios tbody').empty();

                response.usuario.forEach(function(usuario) {
                    var fila = `<tr>
                                    <td>${usuario.ID_usuario}</td>
                                    <td>${usuario.Usuario}</td>
                                    <td>${usuario.Nombre}</td>
                                    <td>${usuario.Correo_electronico}</td>
                                    <td>${usuario.Telefono}</td>
                                    <td>${usuario.Rol}</td>
                                    <td>
                                        <button onclick="editarUsuario(${usuario.ID_usuario})">Editar</button>
                                        <button onclick="eliminarUsuario(${usuario.ID_usuario})">Eliminar</button>
                                    </td>
                                </tr>`;
                    $('#tablaUsuarios tbody').append(fila);
                });
            } else {
                console.error('Error al cargar usuarios:', response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar usuarios:', error);
        }
    });
}

function cargarCitas() {
    $.ajax({
        url: '../php/citas.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success && response.citas) {
                $('#tablaCitas tbody').empty();

                response.citas.forEach(function(cita) {
                    var fila = `<tr>
                                    <td>${cita.ID_cita}</td>
                                    <td>${cita.ID_cliente}</td>
                                    <td>${cita.ID_barbero}</td>
                                    <td>${cita.ID_servicio}</td>
                                    <td>${cita.Fecha}</td>
                                    <td>${cita.Hora}</td>
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
            console.error('Error al cargar citas:', error);
        }
    });
}

function editarUsuario(id) {
    var nombre = prompt("Nuevo nombre:");
    var correo = prompt("Nuevo correo electrónico:");
    var telefono = prompt("Nuevo teléfono:");
    var rol = prompt("Nuevo rol:");

    if (nombre && correo && telefono && rol) {
        $.ajax({
            url: '../php/admin.php',
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'update',
                id: id,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                rol: rol
            },
            success: function(response) {
                if (response.success) {
                    cargarUsuarios();
                    alert(response.message);
                } else {
                    console.error('Error al actualizar usuario:', response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al actualizar usuario:', error);
            }
        });
    }
}

function eliminarUsuario(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        $.ajax({
            url: '../php/admin.php',
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'delete',
                id: id
            },
            success: function(response) {
                if (response.success) {
                    cargarUsuarios();
                    alert(response.message);
                } else {
                    console.error('Error al eliminar usuario:', response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar usuario:', error);
            }
        });
    }
}

function editarCita(id) {
    var id_cliente = prompt("Nuevo ID cliente:");
    var id_barbero = prompt("Nuevo ID barbero:");
    var id_servicio = prompt("Nuevo ID servicio:");
    var fecha_hora = prompt("Nueva fecha y hora (YYYY-MM-DD HH:MM):");
    var estado_cita = prompt("Nuevo estado de la cita:");

    if (id_cliente && id_barbero && id_servicio && fecha_hora && estado_cita) {
        $.ajax({
            url: '../php/citas.php',
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'update',
                id: id,
                id_cliente: id_cliente,
                id_barbero: id_barbero,
                id_servicio: id_servicio,
                fecha_hora: fecha_hora,
                estado_cita: estado_cita
            },
            success: function(response) {
                if (response.success) {
                    cargarCitas();
                    alert(response.message);
                } else {
                    console.error('Error al actualizar cita:', response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al actualizar cita:', error);
            }
        });
    }
}

function eliminarCita(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
        $.ajax({
            url: '../php/citas.php',
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'delete',
                id: id
            },
            success: function(response) {
                if (response.success) {
                    cargarCitas();
                    alert(response.message);
                } else {
                    console.error('Error al eliminar cita:', response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar cita:', error);
            }
        });
    }
}
