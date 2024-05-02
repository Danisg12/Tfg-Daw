$(document).ready(function(){
    $("#iniciar").click(function(){
        var usuario = $("#nombre_usuario").val();
        var contrasena = $("#contrasena").val();
        
        if(usuario != '' && contrasena != ''){
            $.ajax({
                url: '../php/buscar_usuario.php', 
                type: 'post',
                data: {"usuario": usuario, "contrasena": contrasena, "nocache": Math.random()},
                dataType: 'json', 
                success: function(response){
                    console.log("Respuesta del servidor:", response);
                    if(response.success){ 
                        window.alert("Inicio de sesión exitoso");
                    } else {
                        window.alert("Error: " + response.message);
                    }
                },
                error: function(xhr, status, error){ 
                    console.error("Error en la solicitud AJAX:", error);
                    console.error("Estado de la solicitud:", status);
                    console.error("Respuesta del servidor:", xhr.responseText);
                    window.alert("Error en la solicitud AJAX: " + error);
                }
            });
        } else {
            window.alert("Por favor, complete todos los campos");
        }
    });

    $("#chk_registro").change(function(){
        if(this.checked) {
            $("#registro_fields").show();
            $("#iniciar").text("Registrarse");
        } else {
            $("#registro_fields").hide();
            $("#iniciar").text("Iniciar sesión");
        }
    });

    $("#iniciar").click(function(){
        var usuario = $("#nombre_usuario").val();
        var contrasena = $("#contrasena").val();
        var registro = $("#chk_registro").prop("checked");

        if(registro) {
            var nombre = $("#nombre").val();
            var correo = $("#correo").val();
            var telefono = $("#telefono").val();
            var rol = $("#rol").val();

            
            console.log("Registrarse con los siguientes datos:");
            console.log("Nombre: " + nombre);
            console.log("Correo: " + correo);
            console.log("Teléfono: " + telefono);
            console.log("Rol: " + rol);
        } else {
           
            console.log("Iniciar sesión con los siguientes datos:");
            console.log("Usuario: " + usuario);
            console.log("Contraseña: " + contrasena);
        }
    });
});
