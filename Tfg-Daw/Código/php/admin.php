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
        // Obtener todos los usuarios
        $sql = "SELECT * FROM usuarios";
        $stmt = $conectar->prepare($sql);
        $stmt->execute();
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response['success'] = true;
        $response['usuario'] = $usuarios;
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
        if ($_POST['action'] === 'delete') {
            // Eliminar usuario
            $id = $_POST['id'];
            $sql = "DELETE FROM usuarios WHERE ID_usuario = :id";
            $stmt = $conectar->prepare($sql);
            $stmt->execute([':id' => $id]);

            $response['success'] = true;
            $response['message'] = "Usuario eliminado exitosamente";
        } elseif ($_POST['action'] === 'update') {
            // Actualizar usuario
            $id = $_POST['id'];
            $nombre = $_POST['nombre'];
            $correo = $_POST['correo'];
            $telefono = $_POST['telefono'];
            $rol = $_POST['rol'];

            $sql = "UPDATE usuarios SET Nombre = :nombre, Correo_electronico = :correo, Telefono = :telefono, Rol = :rol WHERE ID_usuario = :id";
            $stmt = $conectar->prepare($sql);
            $stmt->execute([
                ':id' => $id,
                ':nombre' => $nombre,
                ':correo' => $correo,
                ':telefono' => $telefono,
                ':rol' => $rol
            ]);

            $response['success'] = true;
            $response['message'] = "Usuario actualizado exitosamente";
        }
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
