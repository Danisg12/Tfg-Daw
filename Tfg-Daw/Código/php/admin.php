<?php
require_once("conexion.php");

$conexion = new Conexion();
$conectar = $conexion->conectar();

$response = array();

$sql = "SELECT * FROM usuarios";
$statement = $conectar->prepare($sql);
$statement->execute();

if ($statement->rowCount() > 0) {
    $usuarios = array();

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $usuarios[] = $row;
    }

    $response['success'] = true;
    $response['message'] = "Usuarios encontrados";
    $response['usuario'] = $usuarios;
} else {
    $response['success'] = false;
    $response['message'] = "No se encontraron usuarios";
}

echo json_encode($response);
?>
