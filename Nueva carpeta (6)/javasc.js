let carrito = [];

function cargarCarrito() {
    const guardado = localStorage.getItem('carrito');
    carrito = guardado ? JSON.parse(guardado) : [];
}

function actualizarContadorCarrito() {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contadorEl = document.getElementById('carrito-contador');
  if (contadorEl) contadorEl.textContent = totalCantidad > 0 ? totalCantidad : '0';
}

function anadirAlCarrito(event, nombre, imagen, precio, descripcion) {
    event.preventDefault();
    cargarCarrito();
    let productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, cantidad: 1, imagen, precio, descripcion });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(nombre + ' añadido al carrito. Cantidad: ' + carrito.find(item => item.nombre === nombre).cantidad);
    actualizarContadorCarrito();
    console.log('Carrito actualizado:', carrito);
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    actualizarContadorCarrito();
});




function irACarrito() {
  window.location.href = './carrito.html';
}

function irAFavoritos() {
  window.location.href = './favoritos.html';
}

function irAPerfil() {
  // Este comportamiento depende de si quieres ir a login o perfil directamente
  window.location.href = './login.html';
}

function mostrarCarrito() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
  } else {
    let mensaje = "Productos en el carrito:\n";
    carrito.forEach(item => {
      mensaje += item.nombre + " x " + item.cantidad + "\n";
    });
    alert(mensaje);
  }
}

window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarrito();

  const usuario = localStorage.getItem('usuarioLogueado');
  const nombreUsuarioEl = document.getElementById('nombre-usuario');
  const btnCerrarSesion = document.getElementById('btnCerrarSesion');
  const iconoPerfil = document.getElementById('icono-perfil');

  // Mostrar el nombre de usuario y botón cerrar sesión si hay usuario logueado
  if (usuario && nombreUsuarioEl && btnCerrarSesion) {
    nombreUsuarioEl.textContent = usuario;
    btnCerrarSesion.style.display = 'inline-block';
  } else {
    if (nombreUsuarioEl) nombreUsuarioEl.textContent = '';
    if (btnCerrarSesion) btnCerrarSesion.style.display = 'none';
  }

  // Evento para cerrar sesión
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogueado');
      alert('Sesión cerrada. Puedes seguir viendo la tienda.');
      if (nombreUsuarioEl) nombreUsuarioEl.textContent = '';
      btnCerrarSesion.style.display = 'none';
      // No hacer redirección para que el usuario pueda seguir en la tienda
    });
  }

  // Evento para el ícono de perfil, redirige a login si no está logueado
  if (iconoPerfil) {
    iconoPerfil.addEventListener('click', () => {
      const usuarioActivo = localStorage.getItem('usuarioLogueado');
      if (usuarioActivo) {
        alert(`Bienvenido ${usuarioActivo}, accediendo a tu perfil...`);
        // Puedes redirigir a perfil.html si implementas esa página
        // window.location.href = 'perfil.html';
      } else {
        window.location.href = 'login.html';
      }
    });
  }
});


