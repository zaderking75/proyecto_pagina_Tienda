import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Catalogo from './components/Catalogo';
import Login from './components/Login';
import Registro from './components/Registro';
import Carrito from './components/Carrito';
import Favoritos from './components/Favoritos';
import ProductoDetalle from "./components/ProductoDetalle";
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
    const [search, setSearch] = useState("");
  return (
      <BrowserRouter>
          <Header search={search} setSearch={setSearch} />

        <main className="main-content">
          <Routes>
              <Route path="/" element={<Catalogo search={search} />} />
              <Route path="/catalogo" element={<Catalogo search={search} />} />
              <Route path="/home" element={<Catalogo search={search} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
              <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
  );
}

export default App;