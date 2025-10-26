function Carrito({ items, eliminarItem, aumentarCantidad, disminuirCantidad }) {
  return (
    <section className="carrito-panel">
      <h2>Carrito de compras</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="products">
          {items.map(item => (
            <div className="card" key={item.id}>
              <div className="producto-info">
                <img src={item.image} alt={item.name} className="producto-img" />
                <div className="producto-texto">
                  <h2>{item.name}</h2>
                  <p><strong>Precio:</strong> ${item.price}</p>
                  <p><strong>Tamaño:</strong> {item.size}</p>
                  <p><strong>Método de Plantado:</strong> {item.planting}</p>
                  <p><strong>Descripción:</strong> {item.description}</p>
                  <p><strong>Cantidad:</strong> {item.quantity}</p>
                  <div className="cantidad-buttons">
                    <button onClick={() => disminuirCantidad(item.id)}>-</button>
                    <button onClick={() => aumentarCantidad(item.id)}>+</button>
                  </div>
                  <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button disabled={items.length === 0}>Comprar</button>
    </section>
  );
}

export default Carrito;