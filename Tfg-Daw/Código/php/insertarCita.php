<?php
require_once("conexion.php");

$response = array();

try {
    $conexion = new Conexion();
    $conectar = $conexion->conectar();

    if ($conectar === null) {
        throw new Exception("Database connection failed");
    }

    $ID_cliente = $_POST['Cliente'];
    $ID_barbero = $_POST['ID_barbero']; 
    $ID_servicio = $_POST['Servicio'];
    $Fecha = $_POST['Fecha'];
    $Hora = $_POST['Hora'];
    
    $params = array(
        ":ID_cliente" => $ID_cliente,
        ":ID_barbero" => $ID_barbero,
        ":ID_servicio" => $ID_servicio,
        ":Fecha" => $Fecha,
        ":Hora" => $Hora
    );

    $sql = "INSERT INTO citas (ID_cliente, ID_barbero, ID_servicio, Fecha, Hora) VALUES (:ID_cliente, :ID_barbero, :ID_servicio, :Fecha, :Hora)";
    $pdo = $conectar->prepare($sql);
    $pdo->execute($params);
    
    if ($pdo->rowCount() > 0) {
        $response['success'] = true;
        $response['message'] = "Cita registrada exitosamente";
    } else {
        $response['success'] = false;
        $response['message'] = "Error al registrar la cita";
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "Error: " . $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
