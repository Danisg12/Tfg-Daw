<?php
require_once("conexion.php");

// Iniciar sesión
session_start();

// Verificar si hay un usuario en sesión y si es barbero
if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['rol'] !== 'barbero') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

// Obtener el ID del barbero de la sesión
$barberoId = $_SESSION['usuario']['id'];

$conexion = new Conexion();
$conectar = $conexion->conectar();

$response = array();

// Consulta SQL para obtener las citas del barbero
$sql = "SELECT * FROM citas WHERE ID_barbero = :barberoId";
$statement = $conectar->prepare($sql);
$statement->bindParam(':barberoId', $barberoId, PDO::PARAM_INT);
$statement->execute();

// Verificar si se obtuvieron resultados
if ($statement->rowCount() > 0) {
    $citas = array();

    // Obtener cada fila de resultados y agregarla al array de citas
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $citas[] = $row;
    }

    // Agregar las citas al response
    $response['success'] = true;
    $response['citas'] = $citas;
} else {
    // No se encontraron citas
    $response['success'] = false;
    $response['message'] = "No se encontraron citas";
}

// Devolver el response en formato JSON
echo json_encode($response);
?>
