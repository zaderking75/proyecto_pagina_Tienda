import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlantaService from "../services/PlantaService";
import FavoritosService from "../services/FavoritoService";
import "../styles/panelFavorito.css";
import "../App.css";

const Favoritos = () => {
    const navigate = useNavigate();
    const [plantasFavoritas, setPlantasFavoritas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarFavoritos();
    }, []);

    const cargarFavoritos = async () => {
        try {
            const idsFavoritos = FavoritosService.getFavoritosIDs();

            if (idsFavoritos.length > 0) {
                const response = await PlantaService.getAllPlanta();

                const filtradas = response.data.filter(planta => idsFavoritos.includes(planta.id));
                setPlantasFavoritas(filtradas);
            } else {
                setPlantasFavoritas([]);
            }
        } catch (error) {
            console.error("Error al cargar favoritos:", error);
        } finally {
            setLoading(false);
        }
    };

    const quitarFavorito = (id) => {
        FavoritosService.toggleFavorito(id);
        setPlantasFavoritas(plantasFavoritas.filter(p => p.id !== id));
    };

    if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Cargando favoritos...</div>;

    return (
        <div className="favoritos-container">
            <h1 className="favoritos-titulo">Mis Plantas Favoritas ❤️</h1>

            {plantasFavoritas.length === 0 ? (
                <div className="mensaje-vacio">
                    <p>No tienes favoritos guardados aún.</p>
                    <button onClick={() => navigate("/")} style={{marginTop: '20px', padding: '10px 20px', cursor:'pointer'}}>
                        Ir al Catálogo
                    </button>
                </div>
            ) : (
                <div className="favoritos-grid">
                    {plantasFavoritas.map(planta => (
                        <div key={planta.id} className="store-container" style={{cursor: 'default'}}>
                            <img
                                src={planta.image}
                                alt={planta.name}
                                onClick={() => navigate(`/producto/${planta.id}`)}
                                style={{cursor: 'pointer'}}
                            />

                            <div className="content">
                                <h3>{planta.name}</h3>
                                <p><strong>${planta.price.toLocaleString('es-CL')}</strong></p>

                                <button
                                    className="btn-quitar-fav"
                                    onClick={() => quitarFavorito(planta.id)}
                                >
                                    💔 Quitar de Favoritos
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favoritos;