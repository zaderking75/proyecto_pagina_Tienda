import React, { useState, useEffect } from 'react';
import PlantaService from '../services/PlantaService';
import CompraService from "../services/CompraService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('resumen');

    const [plantas, setPlantas] = useState([]);
    const [compras, setCompras] = useState([]);
    const [datosGrafico, setDatosGrafico] = useState([]);

    const [selectedFile, setSelectedFile] = useState(null);
    const [stockId, setStockId] = useState("");
    const [stockCant, setStockCant] = useState("");

    const [newPlanta, setNewPlanta] = useState({
        name: "", price: "", description: "", image: "/image/default.jpg", stock: 10, planting: "", size: ""
    });

    useEffect(() => {
        cargarPlantas();
    }, []);
    const cargarPlantas = () => {
        PlantaService.getAllPlanta().then(res => setPlantas(res.data));
    };
    useEffect(() => {
        cargarDatos();
    }, []);
    const cargarDatos = async () => {
        try {
            const [resPlantas, resCompras] = await Promise.all([
                PlantaService.getAllPlanta(),
                CompraService.getAllPurchases()
            ]);

            setPlantas(resPlantas.data);
            setCompras(resCompras.data);


            const dataProcesada = resPlantas.data.map(planta => {
                const comprasDeEstaPlanta = resCompras.data.filter(c => c.idPlanta === planta.id);
                const totalVendido = comprasDeEstaPlanta.reduce((acc, compra) => {
                    return acc + compra.quantity;
                }, 0);

                return {
                    name: planta.name.substring(0, 10),
                    ventas: totalVendido,
                    stock: planta.stock
                };
            });

            setDatosGrafico(dataProcesada);

        } catch (error) {
            console.error("Error cargando datos del dashboard", error);
        }
    };


    const handleAddStock = async (e) => {
        e.preventDefault();
        try {
            await PlantaService.addStock(stockId, stockCant);
            alert("Stock actualizado correctamente");
            cargarPlantas();
            setStockId(""); setStockCant("");
        } catch (error) {
            alert("Error al actualizar stock (Revisa el ID)");
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("¿Seguro que quieres eliminar esta planta?")) {
            try {
                await PlantaService.deletePlanta(id);
                alert("Planta eliminada");
                cargarPlantas();
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = newPlanta.image;
            if (selectedFile) {
                const uploadRes = await PlantaService.uploadImage(selectedFile);
                imageUrl = uploadRes.data;
            }
            const plantaAGuardar = { ...newPlanta, image: imageUrl };
            await PlantaService.registerPlanta(newPlanta);
            alert("Planta creada con éxito");
            cargarPlantas();
            setNewPlanta({ name: "", price: "", description: "", image: "", stock: 10, planting: "", size: "" });
            setSelectedFile(null);
        } catch (error) {
            alert("Error al crear planta");
        }
    };
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <h2>Panel Admin</h2>
                <button onClick={() => setActiveTab('resumen')} className={activeTab === 'resumen' ? 'active' : ''}>📊 Resumen</button>
                <button onClick={() => setActiveTab('inventario')} className={activeTab === 'inventario' ? 'active' : ''}>📦 Inventario & Stock</button>
                <button onClick={() => setActiveTab('crear')} className={activeTab === 'crear' ? 'active' : ''}>➕ Nueva Planta</button>
            </div>

            <div className="admin-content">

                {activeTab === 'resumen' && (
                    <div>
                        <h1>Rendimiento de Ventas</h1>
                        <p>Comparativa: Cuánto has vendido vs. Cuánto te queda.</p>

                        <div style={{ width: '100%', height: 450, marginTop: '20px', background: 'white', padding: '20px', borderRadius: '10px' }}>
                            <ResponsiveContainer>
                                <BarChart data={datosGrafico}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="ventas" fill="#27ae60" name="Total Vendidos" />
                                    <Bar dataKey="stock" fill="#95a5a6" name="Stock Restante" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {activeTab === 'inventario' && (
                    <div>
                        <h1>Gestión de Inventario</h1>

                        <div className="card-admin">
                            <h3>⚡ Añadir Stock Rápido</h3>
                            <form onSubmit={handleAddStock} style={{display:'flex', gap:'10px'}}>
                                <input type="number" placeholder="ID Planta" value={stockId} onChange={e=>setStockId(e.target.value)} required />
                                <input type="number" placeholder="Cantidad a sumar" value={stockCant} onChange={e=>setStockCant(e.target.value)} required />
                                <button type="submit" className="btn-green">Actualizar</button>
                            </form>
                        </div>

                        <table className="admin-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Stock</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {plantas.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td style={{fontWeight:'bold', color: p.stock < 5 ? 'red' : 'green'}}>{p.stock}</td>
                                    <td>${p.price}</td>
                                    <td>
                                        <button className="btn-red" onClick={() => handleDelete(p.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'crear' && (
                    <div>
                        <h1>Registrar Nueva Planta</h1>
                        <form className="form-create" onSubmit={handleCreate}>
                            <input type="text" placeholder="Nombre" value={newPlanta.name} onChange={e => setNewPlanta({...newPlanta, name: e.target.value})} required />
                            <input type="number" placeholder="Precio" value={newPlanta.price} onChange={e => setNewPlanta({...newPlanta, price: e.target.value})} required />
                            <input type="number" placeholder="Stock Inicial" value={newPlanta.stock} onChange={e => setNewPlanta({...newPlanta, stock: e.target.value})} required />
                            <label>Imagen de la Planta:</label>
                            <input
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                accept="image/*"
                            />
                            <textarea placeholder="Descripción" value={newPlanta.description} onChange={e => setNewPlanta({...newPlanta, description: e.target.value})} required />
                            <input type="text" placeholder="Tamaño (ej: 10cm)" value={newPlanta.size} onChange={e => setNewPlanta({...newPlanta, size: e.target.value})} />
                            <input type="text" placeholder="Cuidados (Planting)" value={newPlanta.planting} onChange={e => setNewPlanta({...newPlanta, planting: e.target.value})} />

                            <button type="submit" className="btn-green">Guardar Planta</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;