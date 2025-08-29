<?php
include("conexion.php");

$stmt = $conn->query("SELECT id, nombre FROM monedas ORDER BY nombre ASC");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
