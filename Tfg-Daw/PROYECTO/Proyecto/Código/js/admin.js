// Función para cargar los usuarios desde el servidor y actualizar la tabla
function cargarUsuarios() {
    // Realizar una petición AJAX para obtener los usuarios desde el servidor
    $.ajax({
        url: '../php/admin.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Verificar si la respuesta indica éxito y contiene datos de usuario
            if (response.success && response.usuario) {
                // Limpiar la tabla
                $('#tablaUsuarios tbody').empty();

                // Iterar sobre los usuarios recibidos y agregarlos a la tabla
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
            // Manejar errores si los hubiera
            console.error('Error al cargar usuarios:', error);
        }
    });
}

// Llamar a la función cargarUsuarios al cargar la página para mostrar los usuarios iniciales
$(document).ready(function() {
    cargarUsuarios();
});
