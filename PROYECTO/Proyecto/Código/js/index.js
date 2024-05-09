$(document).ready(function(){
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

    $("#btn_iniciar").click(function(){
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

    $("#btn_registrar").click(function(){
        var usuario = $("#nombre_usuario").val();
        var contrasena = $("#contrasena").val();
        var nombre = $("#nombre").val();
        var correo = $("#correo").val();
        var telefono = $("#telefono").val();
        var rol = $("#rol").val();
        console.log(rol);
        if(usuario != '' && contrasena != ''&& nombre !=''&& correo !=''&& telefono !='' && rol !=''){
            $.ajax({
                url: '../php/registrar_usuario.php', 
                type: 'post',
                data: {"usuario": usuario, "contrasena": contrasena, "nombre": nombre,"correo": correo,"telefono": telefono,"rol": rol,"nocache": Math.random()},
                dataType: 'json', 
                success: function(response){
                    console.log("Respuesta del servidor:", response);
                    if(response.success){ 
                        window.alert("Registro exitoso");
                    } else {
                        window.alert("Error: " + response.message);
                    }
                },
            });
        } 
    });
});
