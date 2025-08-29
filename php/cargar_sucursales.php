<?php
include("conexion.php");

$bodegaId = $_GET['bodega'] ?? 0;

$stmt = $conn->prepare("SELECT id, nombre FROM sucursales WHERE bodega_id = :bodega ORDER BY nombre ASC");
$stmt->bindParam(':bodega', $bodegaId, PDO::PARAM_INT);
$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
