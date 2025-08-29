document.addEventListener("DOMContentLoaded", function () {
    cargarBodegas();
    cargarMonedas();

    const inputs = document.querySelectorAll("#productoForm input:not([type='checkbox']), #productoForm select, #productoForm textarea");
    inputs.forEach(input => {
        input.addEventListener("input", () => validarCampo(input));
        input.addEventListener("change", () => validarCampo(input));
    });

    const materialesCheckbox = document.querySelectorAll("input[name='material[]']");
    materialesCheckbox.forEach(cb => cb.addEventListener("change", validarMateriales));

    document.getElementById("bodega").addEventListener("change", function () {
        cargarSucursales(this.value);
        validarCampo(this);
    });


    document.getElementById("productoForm").addEventListener("submit", async function (e) {
        e.preventDefault();
        if (await validarFormulario()) await guardarFormulario();
    });
});

async function guardarFormulario() {
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
        if (!res.ok) throw new Error();
        const data = await res.json();
        const select = document.getElementById("bodega");
        select.innerHTML = "<option value=''></option>";
        data.forEach(b => select.innerHTML += `<option value="${b.id}">${b.nombre}</option>`);
    } catch {
        alert("Error al cargar bodegas");
    }
}

async function cargarSucursales(bodegaId) {
    try {
        const res = await fetch(`php/cargar_sucursales.php?bodega=${bodegaId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const select = document.getElementById("sucursal");
        select.innerHTML = "<option value=''></option>";
        data.forEach(s => select.innerHTML += `<option value="${s.id}">${s.nombre}</option>`);
    } catch {
        alert("Error al cargar sucursales");
    }
}

async function cargarMonedas() {
    try {
        const res = await fetch("php/cargar_monedas.php");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const select = document.getElementById("moneda");
        select.innerHTML = "<option value=''></option>";
        data.forEach(m => select.innerHTML += `<option value="${m.id}">${m.nombre}</option>`);
    } catch {
        alert("Error al cargar monedas");
    }
}
