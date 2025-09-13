document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.btn-favorito').addEventListener('click', function() {
    this.classList.toggle('liked');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const btnAgregar = document.getElementById('agregar-carrito');
  if (!btnAgregar) return;

  btnAgregar.addEventListener('click', function (event) {
    event.preventDefault();
    const cantidadInput = document.getElementById('cantidad');
    let cantidad = parseInt(cantidadInput.value, 10);
    if (isNaN(cantidad) || cantidad < 1) {
      alert("Por favor ingresa una cantidad válida (mayor que 0) para agregar al carrito.");
      cantidadInput.value = 1;
      cantidadInput.focus();
      return;
    }

    const nombre = btnAgregar.getAttribute('data-nombre');
    const imagen = btnAgregar.getAttribute('data-imagen');
    const precio = parseInt(btnAgregar.getAttribute('data-precio'), 10);
    const descripcion = btnAgregar.getAttribute('data-descripcion');

    // Cargar, agregar y guardar producto
    cargarCarrito();
    let productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carrito.push({
        nombre: nombre,
        cantidad: cantidad,
        imagen: imagen,
        precio: precio,
        descripcion: descripcion
      });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} añadido al carrito. Cantidad: ${cantidad}`);
    actualizarContadorCarrito();
  });
});
