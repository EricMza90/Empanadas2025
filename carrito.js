// Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar mensaje flotante de producto agregado
function mostrarAviso() {
  const avisoExistente = document.querySelector(".aviso-carrito");
  if (avisoExistente) avisoExistente.remove();

  const aviso = document.createElement("div");
  aviso.className = "aviso-carrito";
aviso.textContent = "Producto Agregado al Carrito";
  document.body.appendChild(aviso);

  setTimeout(() => {
    aviso.remove();
  }, 2000);
}

// Agregar producto al carrito
function agregarAlCarrito(producto, tipo, cantidad) {
  const precioUnitario = producto.precio;

  // Buscar si ya existe el mismo producto y tipo
  const existente = carrito.find(item =>
    item.id === producto.id && item.tipo === tipo
  );

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      tipo: tipo,
      cantidad: cantidad,        // cantidad en empanadas (6, 12...)
      precioUnitario: precioUnitario // precio por docena completa
    });
  }

  guardarCarrito();
  mostrarAviso();
}

// Renderizar carrito y controles en pedido.html
function renderCarrito() {
  const contenedorCarrito = document.getElementById("carrito-container");
  if (!contenedorCarrito) return;

  contenedorCarrito.innerHTML = "<h2>🛒 TU PEDIDO</h2>";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML += `<p style="text-align:center; font-size:1.2rem; color:#555; margin-top:20px;">CARRITO VACÍO</p>`;
    return;
  }

  const lista = document.createElement("ul");
  lista.className = "lista-carrito";

  let totalGeneral = 0;

  carrito.forEach((item, index) => {
    // unidades en docenas (ej: 6 empanadas = 0.5 docenas)
    const unidades = item.cantidad / 12;
    const totalItem = item.precioUnitario * unidades;
    totalGeneral += totalItem;

    const li = document.createElement("li");
    li.className = "item-carrito";
    li.innerHTML = `
      <div class="info-producto">
        <strong>${item.nombre}</strong> - 
        ${item.tipo} - 
        ${item.cantidad} empanadas - 
        $${totalItem.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
      </div>
      <div class="botones-carrito">
        <button class="menos" data-index="${index}">-</button>
        <button class="mas" data-index="${index}">+</button>
        <button class="eliminar" data-index="${index}">🗑️</button>
      </div>
    `;
    lista.appendChild(li);
  });

  contenedorCarrito.appendChild(lista);

  const total = document.createElement("p");
  total.className = "total";
  total.innerHTML = `<strong>Total: $${totalGeneral.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</strong>`;
  contenedorCarrito.appendChild(total);

  // Selector forma de pago
  const pagoDiv = document.createElement("div");
  pagoDiv.style.marginTop = "20px";
  pagoDiv.innerHTML = `
    <label for="forma-pago" style="font-weight: 600;">Forma de pago: </label>
    <select id="forma-pago" style="padding:5px 10px; font-size:1rem; margin-left:10px;">
      <option value="Efectivo">Efectivo</option>
      <option value="Mercado Pago">Mercado Pago</option>
    </select>
  `;
  contenedorCarrito.appendChild(pagoDiv);

// Contenedor centrado para el botón
const contenedorBoton = document.createElement("div");
contenedorBoton.style.textAlign = "center";
contenedorBoton.style.marginTop = "20px";

// Botón enviar pedido
const botonEnviar = document.createElement("button");
botonEnviar.textContent = "Hacer Pedido";
botonEnviar.style.padding = "10px 25px";
botonEnviar.style.fontSize = "1.1rem";
botonEnviar.style.backgroundColor = "#4caf50";
botonEnviar.style.color = "white";
botonEnviar.style.border = "none";
botonEnviar.style.borderRadius = "8px";
botonEnviar.style.cursor = "pointer";
botonEnviar.style.fontWeight = "700";

// Agregar botón al contenedor centrado
contenedorBoton.appendChild(botonEnviar);
contenedorCarrito.appendChild(contenedorBoton);

 botonEnviar.addEventListener("click", () => {
  const formaPago = document.getElementById("forma-pago").value;

  if (!formaPago) {
    alert("Por favor seleccioná una forma de pago.");
    return;
  }

  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let mensaje = "Hola! Quiero hacer el siguiente pedido:%0A";

  carrito.forEach((item) => {
    mensaje += `- ${item.nombre} (${item.tipo}) - ${item.cantidad} empanadas%0A`;
  });

  const totalPedido = carrito.reduce((acc, item) => {
    const unidades = item.cantidad / 12;
    return acc + item.precioUnitario * unidades;
  }, 0);

  mensaje += `%0ATotal: $${totalPedido.toFixed(0)}%0A`;
  mensaje += `Forma de pago: ${formaPago}`;

  // Reemplazá el número con el tuyo
  const numeroWhatsapp = "549XXXXXXXXXX";
  const url = `https://wa.me/${+5492614197967}?text=${mensaje}`;
  window.open(url, "_blank");

  // 🧹 Vaciar carrito
  carrito = [];
  guardarCarrito();
  renderCarrito();

  // ✅ Mostrar mensaje de confirmación
  const mensajeEnviado = document.createElement("div");
  mensajeEnviado.textContent = "✅ Pedido enviado con éxito";
  mensajeEnviado.style.position = "fixed";
  mensajeEnviado.style.bottom = "30px";
  mensajeEnviado.style.left = "50%";
  mensajeEnviado.style.transform = "translateX(-50%)";
  mensajeEnviado.style.background = "#4caf50";
  mensajeEnviado.style.color = "white";
  mensajeEnviado.style.padding = "12px 24px";
  mensajeEnviado.style.borderRadius = "8px";
  mensajeEnviado.style.fontSize = "1rem";
  mensajeEnviado.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  mensajeEnviado.style.zIndex = "1000";

  document.body.appendChild(mensajeEnviado);

  setTimeout(() => {
    mensajeEnviado.remove();
  }, 3000);
});

  // Botones para modificar cantidades
  document.querySelectorAll(".menos").forEach(btn =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrito[index].cantidad -= 6;
      if (carrito[index].cantidad < 6) {
        carrito.splice(index, 1);
      }
      guardarCarrito();
      renderCarrito();
    })
  );

  document.querySelectorAll(".mas").forEach(btn =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrito[index].cantidad += 6;
      guardarCarrito();
      renderCarrito();
    })
  );

  document.querySelectorAll(".eliminar").forEach(btn =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      guardarCarrito();
      renderCarrito();
    })
  );
}

// Renderizar carrito al cargar la página (pedido.html)
document.addEventListener("DOMContentLoaded", () => {
  renderCarrito();
});
