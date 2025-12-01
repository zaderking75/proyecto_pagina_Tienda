import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlantaService from '../services/PlantaService';
import AuthService from '../services/AuthService';
import FavoritoService from '../services/FavoritoService';
import '../styles/panelDetailProducto.css';

const ProductoDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [planta, setPlanta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);


    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        if (id) {
            PlantaService.getAllPlanta().then(res => {
                const encontrada = res.data.find(p => p.id === parseInt(id));
                if (encontrada) {
                    setPlanta(encontrada);
                    const yaEsFavorito = FavoritoService.esFavorito(encontrada.id);
                    setEsFavorito(yaEsFavorito);
                }
                setLoading(false);
            })
        .catch(err => {
                console.error("Error:", err);
                setLoading(false);
            });
        }
    }, [id]);
    const handleCantidadChange = (e) => {
        let valorInput = parseInt(e.target.value);


        if (isNaN(valorInput) || valorInput < 1) valorInput = 1;

        if (valorInput > planta.stock) {
            alert(`¡Solo tenemos ${planta.stock} unidades disponibles!`);
            valorInput = planta.stock;
        }
        setCantidad(valorInput);
    };

    const handleComprar = () => {
        const usuario = AuthService.getCurrentUser();
        if (!usuario) {
            alert("Inicia sesión para comprar.");
            navigate("/login");
            return;
        }
        const cantidadAAgregar = parseInt(cantidad);
        const stockReal = parseInt(planta.stock);
        if (cantidadAAgregar > stockReal) {
            alert("No hay suficiente stock.");
            return;
        }let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

        const indice = carritoActual.findIndex(item => item.id === planta.id);

        if (indice !== -1) {
            const cantidadEnCarrito = parseInt(carritoActual[indice].cantidad);
            const nuevaCantidadTotal = cantidadEnCarrito + cantidadAAgregar;

            if (nuevaCantidadTotal > stockReal) {
                alert(`No puedes añadir ${cantidadAAgregar} más. Ya tienes ${cantidadEnCarrito} en el carrito y el stock máximo es ${stockReal}. Solo podrías llevar ${stockReal - cantidadEnCarrito} más.`);
                return;
            }

            carritoActual[indice].cantidad = nuevaCantidadTotal;
        } else {
            carritoActual.push({ ...planta, cantidad: cantidad });
        }

        localStorage.setItem("carrito", JSON.stringify(carritoActual));
        alert(`Agregaste ${cantidadAAgregar} unidades de ${planta.name} al carrito.`);

        window.location.reload();
    };
    const handleToggleFavorito = () => {
        if (planta) {
            FavoritoService.toggleFavorito(planta.id);
            setEsFavorito(!esFavorito);
        }
    };

    if (loading) return <div style={{padding:'50px', textAlign:'center'}}>Cargando...</div>;
    if (!planta) return <div style={{padding:'50px', textAlign:'center'}}>Producto no encontrado</div>;
    const agotado = planta.stock <= 0;

    return (
        <div className="detalle-wrapper">
            <div className="producto-detalle">

                <div className="producto-info">
                    <img
                        src={planta.image}
                        alt={planta.name}
                        className="producto-img-detalle"
                        style={agotado ? { filter: 'grayscale(100%)', opacity: 0.7 } : {}}
                    />

                    <div className="producto-texto">
                        <h2>{planta.name}</h2>

                        <p className="precio-grande">
                            <strong>Precio:</strong> ${planta.price.toLocaleString('es-CL')}
                        </p>

                        <p><strong>Tamaño:</strong> {planta.size || "No especificado"}</p>
                        <p><strong>Plantado:</strong> {planta.planting || "No especificado"}</p>
                        <p><strong>Descripción:</strong> {planta.description}</p>
                        {agotado ? (
                            <h3 style={{color: 'red', marginTop: '20px'}}>🚫 PRODUCTO AGOTADO</h3>
                        ) : (
                            <>
                                <label htmlFor="cantidad">Cantidad:</label>
                                <input
                                    type="number"
                                    id="cantidad"
                                    min="1"
                                    max={planta.stock}
                                    value={cantidad}
                                    onChange={handleCantidadChange}
                                />
                                <span style={{fontSize: '0.9rem', color: '#666', marginLeft: '10px'}}>
                                    (Disponibles: {planta.stock})
                                </span>
                            </>
                        )}

                        <div className="botones-contenedor">
                            <button
                                className="btn-comprar-detalle"
                                onClick={handleComprar}
                                disabled={agotado}
                                style={agotado ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
                            >
                                {agotado ? "Sin Stock" : "Añadir al Carrito"}
                            </button>

                            <button
                                className={`btn-favorito-detalle ${esFavorito ? 'liked' : ''}`}
                                onClick={handleToggleFavorito}
                                title={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
                                style={{
                                    fontSize: '2rem',
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    color: esFavorito ? 'red' : '#ccc',
                                    marginLeft: '15px'
                                }}
                            >
                                {esFavorito ? "❤️" : "🤍"}
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/")}
                    style={{marginTop: '20px', background: 'transparent', border: '1px solid #ccc', padding: '10px', cursor: 'pointer', width: 'fit-content'}}
                >
                    ← Volver al catálogo
                </button>
            </div>
        </div>
    );
};

export default ProductoDetalle;