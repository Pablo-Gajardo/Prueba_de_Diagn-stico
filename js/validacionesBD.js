async function validarCodigoUnico(input) {
    const valor = input.value.trim();
    const span = document.getElementById("errorCodigo");

    const mensajeFormato = validarCodigo(valor);
    if (mensajeFormato) {
        span.textContent = mensajeFormato;
        return false;
    }

    try {
        const res = await fetch(`php/verificar_codigo.php?codigo=${encodeURIComponent(valor)}`);
        if (!res.ok) throw new Error("Error de conexión");
        const data = await res.json();

        if (data.existe) {
            span.textContent = "El código del producto ya está registrado.";
            return false;
        } else {
            span.textContent = "";
            return true;
        }
    } catch {
        span.textContent = "No se pudo verificar el código.";
        return false;
    }
}

async function validarCampo(input) {
    const id = input.id;

    if (id === "codigo") return await validarCodigoUnico(input);

    const valor = input.value.trim();
    const span = document.getElementById("error" + id.charAt(0).toUpperCase() + id.slice(1));

    const validadores = {
        nombre: validarNombre,
        precio: validarPrecio,
        descripcion: validarDescripcion,
        bodega: validarBodega,
        sucursal: validarSucursal,
        moneda: validarMoneda
    };

    const mensaje = validadores[id] ? validadores[id](valor) : "";
    span.textContent = mensaje;
    return mensaje === "";
}

async function validarFormulario() {
    let valido = true;
    let errores = [];

    const inputs = document.querySelectorAll("#productoForm input:not([type='checkbox']), #productoForm select, #productoForm textarea");
    for (const input of inputs) {
        if (!(await validarCampo(input))) {
            valido = false;
            const id = input.id;
            const span = document.getElementById("error" + id.charAt(0).toUpperCase() + id.slice(1));
            if (span && span.textContent) errores.push(span.textContent);
        }
    }

    if (!validarMateriales()) {
        valido = false;
        errores.push("Debe seleccionar al menos dos materiales para el producto.");
    }

    if (!valido) {
        alert(errores.join("\n"));
    }

    return valido;
}
