<?php
require_once("conexion.php");

if (!isset($_POST['date'])) {
    echo json_encode([]);
    exit;
}

$fecha = $_POST['date'];

try {
    $conexion = new Conexion();
    $conectar = $conexion->conectar();

    if ($conectar === null) {
        throw new Exception("Database connection failed");
    }

    $sql = "SELECT Hora FROM citas WHERE Fecha = :fecha";
    $pdo = $conectar->prepare($sql);
    $pdo->bindParam(':fecha', $fecha, PDO::PARAM_STR);
    $pdo->execute();

    $reservedTimes = [];
    while ($row = $pdo->fetch(PDO::FETCH_ASSOC)) {
        $reservedTimes[] = $row['Hora'];
    }

    $availableTimes = [];
    $startTimes = ['08:00', '16:00'];
    $endTimes = ['14:00', '20:00'];
    $interval = 15; 

    foreach ($startTimes as $index => $start) {
        $startTime = new DateTime($fecha . ' ' . $start);
        $endTime = new DateTime($fecha . ' ' . $endTimes[$index]);

        while ($startTime < $endTime) {
            $timeStr = $startTime->format('H:i');
            if (!in_array($timeStr, $reservedTimes)) {
                $availableTimes[] = $timeStr;
            }
            $startTime->modify("+{$interval} minutes");
        }
    }

    echo json_encode($availableTimes);
} catch (Exception $e) {
    echo json_encode([]);
}
?>
