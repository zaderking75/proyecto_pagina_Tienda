function Favoritos({ favoritos, eliminarFavorito, PLANTS }) {
  return (
    <section className="favoritos-panel">
      <h2>Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No tienes productos favoritos.</p>
      ) : (
        <div className="products">
          {favoritos.map(fid => {
            const item = PLANTS.find(p => p.id === fid);
            return (
              <div className="card" key={item.id}>
                <div className="producto-info">
                  <img src={item.image} alt={item.name} className="producto-img" />
                  <div className="producto-texto">
                    <h2>{item.name}</h2>
                    <p>
                      <strong>Precio:</strong> ${item.price}
                    </p>
                    <p>
                      <strong>Tamaño:</strong> {item.size}
                    </p>
                    <p>
                      <strong>Método de Plantado:</strong> {item.planting}
                    </p>
                    <p>
                      <strong>Descripción:</strong> {item.description}
                    </p>
                    <button onClick={() => eliminarFavorito(item.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
export default Favoritos;
