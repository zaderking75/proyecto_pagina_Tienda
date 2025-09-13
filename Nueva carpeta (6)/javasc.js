let carrito = []; 

function actualizarContadorCarrito() {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contadorEl = document.getElementById('carrito-contador');
  contadorEl.textContent = totalCantidad > 0 ? totalCantidad : '0';
}
/*  */
function anadirAlCarrito(event, productName) {
  event.stopPropagation();
  event.preventDefault();

  const productoExistente = carrito.find(item => item.nombre === productName);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre: productName, cantidad: 1 });
  }
  
  actualizarContadorCarrito();

  alert(productName + " añadido al carrito. Cantidad: " + carrito.find(item => item.nombre === productName).cantidad);
  console.log("Carrito actual:", carrito);
}
/*  */
function irACarrito() {
    window.location.href = './carrito.html';
}

function irAFavoritos() {
  window.location.href = './favoritos.html';
}

function irAPerfil() {
  window.location.href = './perfil.html';
}


// Inicializa contador cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarrito();
});






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

window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {  
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});


