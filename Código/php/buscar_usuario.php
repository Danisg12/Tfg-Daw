<?php
require_once("conexion.php");
session_start();

$conexion = new Conexion();
$conectar = $conexion->conectar();

$response = array();

$nombre_usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

$params = array(
    ":nombre_usuario" => $nombre_usuario
);

$sql = "SELECT * FROM usuarios WHERE Usuario = :nombre_usuario";
$pdo = $conectar->prepare($sql);
$pdo->execute($params);

if ($pdo->rowCount() > 0) {
    $row = $pdo->fetch(PDO::FETCH_ASSOC);
    $contrasena_hash = $row['Contrasena'];

    if ($contrasena == $contrasena_hash) {
        
        $_SESSION['usuario'] = array(
            'id' => $row['ID_usuario'],
            'nombre' => $row['Usuario'],
            'rol' => $row['Rol']
        );

        $response['success'] = true;
        $response['message'] = "Usuario y contraseña válidos";
        $response['id'] = $row['ID_usuario']; 
        $response['rol'] = $row['Rol']; 
    } else {
        $response['success'] = false;
        $response['message'] = "Contraseña incorrecta";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Usuario no encontrado";
}
echo json_encode($response);
?>
