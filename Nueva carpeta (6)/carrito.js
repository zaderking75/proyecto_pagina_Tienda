

function cargarCarrito() {
    const guardado = localStorage.getItem('carrito');
    carrito = guardado ? JSON.parse(guardado) : [];
}

function renderizarCarrito() {
    const contenedor = document.getElementById('carrito-contenido');
    const mensajeVacio = document.getElementById('mensaje-vacio');
    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        mensajeVacio.style.display = 'block';
        return;
    }
    mensajeVacio.style.display = 'none';

    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto-carrito';
        productoDiv.innerHTML = `
  <img src="${producto.imagen || 'https://via.placeholder.com/120'}" alt="${producto.nombre}" style="width:120px; height:100px; object-fit:cover; border-radius:10px; margin-right:20px;">
  <div class="producto-info" style="flex:1;">
    <h3>${producto.nombre}</h3>
    <p class="descripcion">${producto.descripcion || ''}</p>
    <p class="precio">Precio: $${producto.precio || ''}</p>
  </div>
  <div class="producto-controles" style="display:flex; align-items:center; gap:8px;">
    <button class="btn-disminuir">-</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button class="btn-aumentar">+</button>
    <button class="btn-eliminar">🗑️</button>
  </div>
`;


        productoDiv.querySelector('.btn-disminuir').onclick = () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                carrito.splice(index, 1);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        };
        productoDiv.querySelector('.btn-aumentar').onclick = () => {
            producto.cantidad++;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        };
        productoDiv.querySelector('.btn-eliminar').onclick = () => {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        };

        contenedor.appendChild(productoDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    renderizarCarrito();
});
