<?php
include("conexion.php");

$codigo = $_GET['codigo'] ?? '';

$stmt = $conn->prepare("SELECT COUNT(*) FROM productos WHERE codigo = :codigo");
$stmt->bindParam(":codigo", $codigo);
$stmt->execute();
$existe = $stmt->fetchColumn() > 0;

echo json_encode(['existe' => $existe]);
?>
