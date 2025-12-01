import React, { useEffect, useState } from 'react';
import PlantaService from '../services/PlantaService';
import { useNavigate } from "react-router-dom";;
import AuthService from "../services/AuthService";
import '../App.css';
import FavoritoService from "../services/FavoritoService";

const Catalogo = ({ search = "" }) => {
    const [plantas, setPlantas] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const navigate = useNavigate();
    const [update, setUpdate] = useState(0);


    const handleToggleFavorito = (id) => {
        FavoritoService.toggleFavorito(id);
        setUpdate(prev => prev + 1);
    };

    useEffect(() => {
        PlantaService.getAllPlanta()
            .then(response => {
                setPlantas(response.data);
            })
            .catch(error => {
                console.error("Error cargando plantas:", error);
            });
    }, []);

    const anadirAlCarrito = (planta) => {
        const usuario = AuthService.getCurrentUser();

        if (!usuario) {
            alert("Debes iniciar sesión para añadir productos al carrito.");
            navigate("/login");
            return;
        }
        let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
        const indice = carritoActual.findIndex(item => item.id === planta.id);
        if (indice !== -1) {
            carritoActual[indice].cantidad += 1;
        } else {
            carritoActual.push({ ...planta, cantidad: 1 });
        }
        localStorage.setItem("carrito", JSON.stringify(carritoActual));
        alert(`¡${planta.name} añadida al carrito!`);
        window.location.reload();
    };


    const visiblePlants = plantas.filter((plant) =>
        plant.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <main className="catalogo-container">
            <div className="productos-grid">
                {visiblePlants.map((planta) => {
                    const agotado = planta.stock <= 0;
                    const esFav = FavoritoService.esFavorito(planta.id);

                    return(
                        <div
                            key={planta.id}
                            className="store-container"
                            onClick={() => navigate(`/producto/${planta.id}`)}
                            style={{ cursor: 'pointer' }}
                        >

                            <div style={{position: 'relative'}}>
                                <img
                                    src={planta.image}
                                    alt={planta.name}
                                    style={agotado ? {filter: 'grayscale(100%)'} : {}}
                                /><span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleFavorito(planta.id);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    filter: 'drop-shadow(0 0 2px white)'
                                }}
                            >
                                {esFav ? "❤️" : "🤍"}
                            </span>
                                {agotado && <span style={{position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '0.8rem'}}>AGOTADO</span>}
                            </div>

                            <div className="content">
                                <h3>{planta.name}</h3>
                                <p>{planta.description}</p>
                                <p><strong>${planta.price.toLocaleString('es-CL')}</strong></p>

                                {!agotado && <p style={{fontSize: '0.8rem', color: '#666'}}>Stock: {planta.stock}</p>}

                                <button
                                    type="button"
                                    disabled={agotado}
                                    className={agotado ? "btn-agotado" : ""}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        anadirAlCarrito(planta);
                                    }}
                                    style={agotado ? {backgroundColor: '#ccc', cursor: 'not-allowed'} : {}}
                                >
                                    {agotado ? "Sin Stock" : "Añadir al carrito"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
};
export default Catalogo;