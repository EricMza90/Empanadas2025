const productos = [
  {
    id: 1,
    nombre: "Carne",
    precio: 11500,
    imagen: "./imagenes/carne.png"
  },
  {
    id: 2,
    nombre: "Jamón y Queso",
    precio: 11800,
    imagen: "./imagenes/jyq.png"
  },
  {
    id: 3,
    nombre: "Pollo",
    precio: 11500,
    imagen: "./imagenes/pollo.png"
  },
  {
    id: 4,
    nombre: "Capresse",
    precio: 11500,
    imagen: "./imagenes/caprese.png"
  },
  {
    id: 5,
    nombre: "Fugazza con Queso",
    precio: 11500,
    imagen: "./imagenes/cebolla-queso.png"
  },
  {
    id: 6,
    nombre: "Fugazza con Queso Azul",
    precio: 11500,
    imagen: "./imagenes/fugazza-roquefort.png"
  },
  {
    id: 7,
    nombre: "Humita",
    precio: 11500,
    imagen: "./imagenes/humita.png"
  },
  {
    id: 8,
    nombre: "Verdura con Queso",
    precio: 11500,
    imagen: "./imagenes/verdura.png"
  },
];

const contenedor = document.getElementById("productos");

productos.forEach((producto) => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio.toLocaleString()}</p>

    <div class="opciones">
      <label>
        Tipo:
        <select class="tipo">
          <option value="crudas">Crudas</option>
          <option value="cocidas">Cocidas</option>
        </select>
      </label>

      <label>
        Cantidad:
        <select class="cantidad">
          <option value="12">Docena</option>
          <option value="6">Media Docena</option>
        </select>
      </label>
    </div>

    <button class="agregar">Agregar al Carrito</button>
  `;
  contenedor.appendChild(div);

  const botonAgregar = div.querySelector(".agregar");
  const cantidadSelect = div.querySelector(".cantidad");

  // Actualiza texto botón con precio correcto
  function actualizarTextoBoton() {
    const cantidad = parseInt(cantidadSelect.value);
    const total = (cantidad === 12) ? producto.precio : producto.precio / 2;
    botonAgregar.textContent = `Agregar al carrito - $${total.toLocaleString()}`;
  }

  cantidadSelect.addEventListener("change", actualizarTextoBoton);
  actualizarTextoBoton();

  botonAgregar.addEventListener("click", () => {
    const tipo = div.querySelector(".tipo").value;
    const cantidad = parseInt(cantidadSelect.value);

    // En vez de alert, se agrega al carrito
    agregarAlCarrito(producto, tipo, cantidad);
  });
});
