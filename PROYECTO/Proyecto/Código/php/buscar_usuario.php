<?php
require_once("conexion.php");

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

    // Verificar la contraseña
    if ($contrasena == $contrasena_hash) {
        // Contraseña correcta
        $response['success'] = true;
        $response['message'] = "Usuario y contraseña válidos";
    } else {
        // La contraseña no coincide
        $response['success'] = false;
        $response['message'] = "Contraseña incorrecta";
    }
} else {
    // El usuario no existe
    $response['success'] = false;
    $response['message'] = "Usuario no encontrado";
}

// Establecer el tipo de contenido como JSON
header('Content-Type: application/json');

// Devuelve la respuesta como JSON
echo json_encode($response);
?>
