<?php
require_once("conexion.php");

// Establecer conexión con la base de datos
$conexion = new Conexion();
$conectar = $conexion->conectar();

$response = array();

// Consulta SQL para obtener todos los usuarios
$sql = "SELECT * FROM usuarios";
$statement = $conectar->prepare($sql);
$statement->execute();

// Verificar si se obtuvieron resultados
if ($statement->rowCount() > 0) {
    $usuarios = array();

    // Obtener cada fila de resultados y agregarla al array de usuarios
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $usuarios[] = $row;
    }

    // Agregar los usuarios al response
    $response['success'] = true;
    $response['message'] = "Usuarios encontrados";
    $response['usuario'] = $usuarios;
} else {
    // No se encontraron usuarios
    $response['success'] = false;
    $response['message'] = "No se encontraron usuarios";
}

// Devolver el response en formato JSON
echo json_encode($response);
?>
