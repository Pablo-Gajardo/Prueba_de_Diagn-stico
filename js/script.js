document.addEventListener("DOMContentLoaded", function () {
    cargarBodegas();
    cargarMonedas();

    const inputs = document.querySelectorAll("#productoForm input:not([type='checkbox']), #productoForm select, #productoForm textarea");
    inputs.forEach(input => {
        input.addEventListener("input", () => validarCampo(input));
        input.addEventListener("change", () => validarCampo(input));
    });

    const materialesCheckbox = document.querySelectorAll("input[name='material[]']");
    materialesCheckbox.forEach(cb => {
        cb.addEventListener("change", validarMateriales);
    });

    document.getElementById("bodega").addEventListener("change", function () {
        cargarSucursales(this.value);
        validarCampo(this);
    });

    document.getElementById("productoForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        if (validarFormulario()) {
            await guardarProducto();
        }
    });
});

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

function validarCampo(input) {
    const id = input.id;
    const valor = input.value.trim();
    const span = document.getElementById("error" + id.charAt(0).toUpperCase() + id.slice(1));

    const validadores = {
        codigo: validarCodigo,
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

function validarFormulario() {
    let valido = true;
    let errores = [];

    const inputs = document.querySelectorAll("#productoForm input:not([type='checkbox']), #productoForm select, #productoForm textarea");
    inputs.forEach(input => {
        if (!validarCampo(input)) {
            valido = false;
            const id = input.id;
            const span = document.getElementById("error" + id.charAt(0).toUpperCase() + id.slice(1));
            if (span && span.textContent) errores.push(span.textContent);
        }
    });

    if (!validarMateriales()) {
        valido = false;
        errores.push("Debe seleccionar al menos dos materiales para el producto.");
    }

    if (!valido) {
        alert(errores.join("\n"));
    }

    return valido;
}

async function guardarProducto() {
    const btn = document.getElementById("guardarBtn");
    btn.disabled = true;
    btn.textContent = "Guardando...";

    try {
        const res = await fetch("php/guardar_producto.php", {
            method: "POST",
            body: new FormData(document.getElementById("productoForm"))
        });

        if (!res.ok) throw new Error("Error de conexión");

        const data = await res.text();
        alert(data);
        document.getElementById("productoForm").reset();

    } catch (err) {
        alert("Error de conexión: " + err.message);
    } finally {
        btn.disabled = false;
        btn.textContent = "Guardar Producto";
    }
}

async function cargarBodegas() {
    try {
        const res = await fetch("php/cargar_bodegas.php");
        if (!res.ok) throw new Error("Error de conexión");
        const data = await res.json();
        const select = document.getElementById("bodega");
        select.innerHTML = "<option value=''></option>";
        data.forEach(b => select.innerHTML += `<option value="${b.id}">${b.nombre}</option>`);
    } catch {
        alert("Error de conexión al cargar bodegas");
    }
}

async function cargarSucursales(bodegaId) {
    try {
        const res = await fetch(`php/cargar_sucursales.php?bodega=${bodegaId}`);
        if (!res.ok) throw new Error("Error de conexión");
        const data = await res.json();
        const select = document.getElementById("sucursal");
        select.innerHTML = "<option value=''></option>";
        data.forEach(s => select.innerHTML += `<option value="${s.id}">${s.nombre}</option>`);
    } catch {
        alert("Error de conexión al cargar sucursales");
    }
}

async function cargarMonedas() {
    try {
        const res = await fetch("php/cargar_monedas.php");
        if (!res.ok) throw new Error("Error de conexión");
        const data = await res.json();
        const select = document.getElementById("moneda");
        select.innerHTML = "<option value=''></option>";
        data.forEach(m => select.innerHTML += `<option value="${m.id}">${m.nombre}</option>`);
    } catch {
        alert("Error de conexión al cargar monedas");
    }
}
