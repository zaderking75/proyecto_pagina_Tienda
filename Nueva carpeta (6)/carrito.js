 // JS para controlar scroll y mensaje vacio
    document.addEventListener('DOMContentLoaded', () => {
      const carritoContenido = document.getElementById('carrito-contenido');
      const productos = carritoContenido.querySelectorAll('.producto-carrito');
      const mensajeVacio = document.getElementById('mensaje-vacio');
      
      if (productos.length === 0) {
        // No hay productos, ocultar scroll y mostrar mensaje
        carritoContenido.style.overflowY = 'hidden';
        mensajeVacio.style.display = 'block';
      } else {
        // Hay productos, permitir scroll y ocultar mensaje vacio
        carritoContenido.style.overflowY = 'auto';
        mensajeVacio.style.display = 'none';
      }
    });