<?php
require_once("conexion.php");

$response = array();

try {
    $conexion = new Conexion();
    $conectar = $conexion->conectar();

    if ($conectar === null) {
        throw new Exception("Database connection failed");
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Obtener todas las citas
        $sql = "SELECT * FROM citas";
        $stmt = $conectar->prepare($sql);
        $stmt->execute();
        $citas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response['success'] = true;
        $response['citas'] = $citas;
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
        if ($_POST['action'] === 'delete') {
            // Eliminar cita
            $id = $_POST['id'];
            $sql = "DELETE FROM citas WHERE ID_cita = :id";
            $stmt = $conectar->prepare($sql);
            $stmt->execute([':id' => $id]);

            $response['success'] = true;
            $response['message'] = "Cita eliminada exitosamente";
        } elseif ($_POST['action'] === 'update') {
            // Actualizar cita
            $id = $_POST['id'];
            $id_cliente = $_POST['id_cliente'];
            $id_barbero = $_POST['id_barbero'];
            $id_servicio = $_POST['id_servicio'];
            $fecha_hora = $_POST['fecha_hora'];
            $estado_cita = $_POST['estado_cita'];

            $sql = "UPDATE citas SET ID_cliente = :id_cliente, ID_barbero = :id_barbero, ID_servicio = :id_servicio, Fecha_hora = :fecha_hora, Estado_cita = :estado_cita WHERE ID_cita = :id";
            $stmt = $conectar->prepare($sql);
            $stmt->execute([
                ':id' => $id,
                ':id_cliente' => $id_cliente,
                ':id_barbero' => $id_barbero,
                ':id_servicio' => $id_servicio,
                ':fecha_hora' => $fecha_hora,
                ':estado_cita' => $estado_cita
            ]);

            $response['success'] = true;
            $response['message'] = "Cita actualizada exitosamente";
        }
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
