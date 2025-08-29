<?php
include("conexion.php");

$codigo = $_POST['codigo'];
$nombre = $_POST['nombre'];
$bodega = $_POST['bodega'];
$sucursal = $_POST['sucursal'];
$moneda = $_POST['moneda'];
$precio = $_POST['precio'];
$materiales = implode(",", $_POST['material']);
$descripcion = $_POST['descripcion'];

// Verificar unicidad del código
$stmt = $conn->prepare("SELECT COUNT(*) FROM productos WHERE codigo = :codigo");
$stmt->bindParam(":codigo", $codigo);
$stmt->execute();
if ($stmt->fetchColumn() > 0) {
    echo "El código del producto ya está registrado.";
    exit;
}

// Insertar producto
$sql = "INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, materiales, descripcion)
        VALUES (:codigo, :nombre, :bodega, :sucursal, :moneda, :precio, :materiales, :descripcion)";
$stmt = $conn->prepare($sql);
$stmt->execute([
    ":codigo" => $codigo,
    ":nombre" => $nombre,
    ":bodega" => $bodega,
    ":sucursal" => $sucursal,
    ":moneda" => $moneda,
    ":precio" => $precio,
    ":materiales" => $materiales,
    ":descripcion" => $descripcion
]);

echo "Producto registrado exitosamente.";
?>
