document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.btn-favorito').addEventListener('click', function() {
    this.classList.toggle('liked');
  });

  document.getElementById('agregar-carrito').addEventListener('click', function() {
    const cantidadInput = document.getElementById('cantidad');
    let cantidad = parseInt(cantidadInput.value, 10);
    if (isNaN(cantidad) || cantidad < 1) {
      alert("Por favor ingresa una cantidad válida (mayor que 0) para agregar al carrito.");
      cantidadInput.value = 1;
      cantidadInput.focus();
      return;
    }
    alert(`Venus atrapamoscas añadido al carrito. Cantidad: ${cantidad}`);
  });
});
