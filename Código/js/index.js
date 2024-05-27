$(document).ready(function(){
    // Cambio de estado del formulario entre iniciar sesión y registro
    $("#chk_registro").change(function(){
        if(this.checked) {
            $("#registro_fields").show();
            $("#btn_iniciar").hide();
            $("#btn_registrar").show();
        } else {
            $("#registro_fields").hide();
            $("#btn_iniciar").show();
            $("#btn_registrar").hide();
        }
    });

    // Mostrar u ocultar el campo de contraseña para barbero
    $("#rol").change(function() {
        if($(this).val() === "barbero") {
            $("#contrasena_barbero").show();
        } else {
            $("#contrasena_barbero").hide();
        }
    });

    // Acción de iniciar sesión
    $("#btn_iniciar").click(function(){
        var usuario = $("#nombre_usuario").val();
        var contrasena = $("#contrasena").val();

        if(usuario !== '' && contrasena !== ''){
            $.ajax({
                url: '../php/buscar_usuario.php', 
                type: 'post',
                data: {"usuario": usuario, "contrasena": contrasena, "nocache": Math.random()},
                dataType: 'json', 
                success: function(response){
                    console.log("Respuesta del servidor:", response);
                    if(response.success){ 
                        // Guardar la información del usuario en localStorage
                        localStorage.setItem('usuario', JSON.stringify(response));
                        // Redirigir según el rol del usuario
                        if(response.rol === "barbero") {
                            window.location.href = "../html/barbero.html";
                        } else if (response.rol === "cliente") {
                            window.location.href = "../html/cliente.html";
                        } else if (response.rol === "administrador") {
                            window.location.href = "../html/admin.html";
                        } else {
                            window.alert("Rol de usuario no reconocido");
                        }
                    } else {
                        window.alert("Error: " + response.message);
                    }
                },
            });
        } else {
            window.alert("Por favor, complete todos los campos");
        }
    });

    // Acción de registrar usuario
    $("#btn_registrar").click(function(){
        var usuario = $("#nombre_usuario").val();
        var contrasena = $("#contrasena").val();
        var nombre = $("#nombre").val();
        var correo = $("#correo").val();
        var telefono = $("#telefono").val();
        var rol = $("#rol").val();
        var contrasenaBarbero = $("#id_contrasena_barbero").val();

        if(usuario !== '' && contrasena !== '' && nombre !== '' && correo !== '' && telefono !== '' && rol !== ''){
            if(rol === "barbero" && contrasenaBarbero !== "aklopsd") {
                window.alert("La contraseña del barbero es incorrecta. Por favor, ingresa 'aklopsd'.");
            } else {
                $.ajax({
                    url: '../php/registrar_usuario.php', 
                    type: 'post',
                    data: {"usuario": usuario, "contrasena": contrasena, "nombre": nombre,"correo": correo,"telefono": telefono,"rol": rol,"nocache": Math.random()},
                    dataType: 'json', 
                    success: function(response){
                        console.log("Respuesta del servidor:", response);
                        if(response.success){ 
                            window.alert("Registro exitoso");
                            // Resetear el formulario después de un registro exitoso
                            $("#nombre_usuario").val("");
                            $("#contrasena").val("");
                            $("#nombre").val("");
                            $("#correo").val("");
                            $("#telefono").val("");
                            $("#rol").val("");
                            $("#contrasena_barbero").val("");
                            $("#registro_fields").hide();
                            $("#btn_iniciar").show();
                            $("#btn_registrar").hide();
                            $("#chk_registro").prop("checked", false);
                        } else {
                            window.alert("Error: " + response.message);
                        }
                    },
                });
            }
        } else {
            window.alert("Por favor, complete todos los campos");
        }
    });
});
