// funciones globales de validación de formato

function validarMateriales() {
    const materiales = document.querySelectorAll("input[name='material[]']:checked");
    const span = document.getElementById("errorMaterial");
    if (materiales.length < 2) {
        span.textContent = "Seleccione al menos 2 materiales";
        return false;
    } else {
        span.textContent = "";
        return true;
    }
}

function validarCodigo(valor) {
    if (!valor) return "El código del producto no puede estar en blanco.";
    if (valor.length < 5 || valor.length > 15) return "El código del producto debe tener entre 5 y 15 caracteres.";
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(valor)) return "El código del producto debe contener letras y números.";
    return "";
}

function validarNombre(valor) {
    if (!valor) return "El nombre del producto no puede estar en blanco.";
    if (valor.length < 2 || valor.length > 50) return "El nombre del producto debe tener entre 2 y 50 caracteres.";
    return "";
}

function validarPrecio(valor) {
    if (!valor) return "El precio del producto no puede estar en blanco.";
    if (!/^\d+(\.\d{1,2})?$/.test(valor)) return "El precio del producto debe ser un número positivo con hasta dos decimales.";
    return "";
}

function validarDescripcion(valor) {
    if (!valor) return "La descripción del producto no puede estar en blanco.";
    if (valor.length < 10 || valor.length > 1000) return "La descripción del producto debe tener entre 10 y 1000 caracteres.";
    return "";
}

function validarBodega(valor) {
    return !valor ? "Debe seleccionar una bodega." : "";
}

function validarSucursal(valor) {
    return !valor ? "Debe seleccionar una sucursal para la bodega seleccionada." : "";
}

function validarMoneda(valor) {
    return !valor ? "Debe seleccionar una moneda para el producto." : "";
}
