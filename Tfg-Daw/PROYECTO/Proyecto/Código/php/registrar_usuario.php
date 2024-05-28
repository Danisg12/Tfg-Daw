<?php
require_once("conexion.php");

$conexion = new Conexion();
$conectar = $conexion->conectar();

$response = array();

$nombre_usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];
$nombre = $_POST['nombre'];
$rol = $_POST['rol'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];



$params = array(
    ":nombre_usuario" => $nombre_usuario,
    ":contrasena" => $contrasena,
    ":nombre" => $nombre,
    ":rol" => $rol,
    ":correo" => $correo,
    ":telefono" => $telefono
);

$sql = "INSERT INTO usuarios (Nombre, Correo_electronico, Telefono, Usuario, Contrasena, Rol) VALUES (:nombre, :correo, :telefono, :nombre_usuario, :contrasena, :rol   )";
$pdo = $conectar->prepare($sql);
$pdo->execute($params);
if ($pdo->rowCount() > 0) {
    $response['success'] = true;
    $response['message'] = "Usuario registrado exitosamente";
} else {
    $response['success'] = false;
    $response['message'] = "Error al registrar usuario";
}

header('Content-Type: application/json');
echo json_encode($response);
?>
