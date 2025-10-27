import React, { useState } from "react";
import "./App.css";
import Carrito from "./Carrito.jsx";
import Favoritos from "./Favoritos.jsx";
import Login from "./login.jsx";
import Registro from "./Registro.jsx";

// Importa tus imágenes aquí (como ya tienes)
import Sarracenias from "./images/Sarracenias.jpg";
import Darlingtonia from "./images/darlingtonia.jpg";
import Drosera from "./images/Drosera.jpg";
import Pinguicula from "./images/pinguicula.jpg";
import StylidiumDebile from "./images/Stylidium debile.jpg";
import Aldrovanda from "./images/Aldrovanda.jpeg";
import Nepenthes from "./images/Nepenthes.webp";
import Utricularias from "./images/Utricularias.jpg";
import Genlisea from "./images/Genlisea.webp";

const PLANTS = [
  {
    id: 1,
    name: "Sarracenias",
    price: 30000,
    image: Sarracenias,
    size: "40cm x 10cm",
    planting: "Plantar en un lugar con sol directo, mantener tierra húmeda",
    description: "Planta ideal para interiores, fácil de cuidar y resistente.",
  },
  {
    id: 2,
    name: "Darlingtonia",
    price: 25000,
    image: Darlingtonia,
    size: "40cm x 30cm",
    planting: "Plantar en un lugar con sol directo, mantener tierra húmeda",
    description: "Planta ideal para interiores, fácil de cuidar y resistente.",
  },
  {
    id: 3,
    name: "Drosera",
    price: 20000,
    image: Drosera,
    size: "20cm x 10cm",
    planting: "Plantar en un lugar con sol directo, mantener tierra húmeda",
    description: "Planta ideal para interiores, fácil de cuidar y resistente.",
  },
  {
    id: 4,
    name: "Pinguicula",
    price: 15000,
    image: Pinguicula,
    size: "10cm x 15cm",
    planting: "Rellenar",
    description: "Rellenar",
  },
  {
    id: 5,
    name: "Stylidium debile",
    price: 17000,
    image: StylidiumDebile,
    size: "20cm x 15cm",
    planting: "Rellenar",
    description: "Rellenar",
  },
  {
    id: 6,
    name: "Aldrovanda",
    price: 30000,
    image: Aldrovanda,
    size: "10cm x 10cm",
    planting: "Rellenar",
    description: "Rellenar",
  },
  {
    id: 7,
    name: "Nepenthes",
    price: 20000,
    image: Nepenthes,
    size: "25cm x 15cm",
    planting: "Rellenar",
    description: "Rellenar",
  },
  {
    id: 8,
    name: "Utricularias",
    price: 30000,
    image: Utricularias,
    size: "10cm x 10cm",
    planting: "Rellenar",
    description: "Rellenar",
  },
  {
    id: 9,
    name: "Genlisea",
    price: 30000,
    image: Genlisea,
    size: "10cm x 10cm",
    planting: "Rellenar",
    description: "Rellenar",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentSection, setCurrentSection] = useState("home");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  // Nuevo: producto seleccionado
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const navigateTo = (section) => {
    setCurrentSection(section);
  };

  // Agregar al carrito (suma cantidad si ya existe)
  const addToCart = (plant) => {
    setCart(prevCart => {
      const found = prevCart.find(item => item.id === plant.id);
      if (found) {
        return prevCart.map(item =>
          item.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...plant, quantity: 1 }];
      }
    });
  };

  const registrarUsuario = (nombre, email, password) => {
    const emailExiste = usuarios.some(user => user.email === email);
    if (emailExiste) {
      return { success: false, message: "Este email ya está registrado" };
    }
    const nuevoUsuario = { id: Date.now(), nombre, email, password };
    setUsuarios([...usuarios, nuevoUsuario]);
    return { success: true, message: "Usuario registrado exitosamente" };
  };

  const iniciarSesion = (email, password) => {
    const usuario = usuarios.find(
      (user) => user.email === email && user.password === password
    );
    if (usuario) {
      setUsuarioActual(usuario);
      return { success: true, message: `Bienvenido ${usuario.nombre}` };
    } else {
      return { success: false, message: "Email o contraseña incorrectos" };
    }
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    navigateTo("home");
  };

  const visiblePlants = PLANTS.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  const aumentarCantidad = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCart(prevCart =>
      prevCart.reduce((acc, item) => {
        if (item.id === id) {
          const newQty = item.quantity - 1;
          if (newQty > 0) {
            acc.push({ ...item, quantity: newQty });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  const eliminarDelCarrito = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const toggleFavorite = (plantId) => {
    setFavorites((favs) =>
      favs.includes(plantId)
        ? favs.filter((id) => id !== plantId)
        : [...favs, plantId]
    );
  };

  const eliminarFavorito = (id) => {
    setFavorites(favorites.filter((fid) => fid !== id));
  };

  const totalCantidadEnCarrito = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <div className="app">
      {/* Ocultar header en login/registro */}
      {currentSection !== "login" && currentSection !== "registro" && (
        <header>
          <div className="header-content">
            <h1>Carnivero</h1>
            <input
              type="text"
              placeholder="Buscar planta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-bar"
            />
            <nav className="navbar-links">
              <button
                className={`nav-btn ${currentSection === "home" ? "active" : ""}`}
                onClick={() => navigateTo("home")}
              >
                <span className="nav-icon">🏠</span>
                Inicio
              </button>
              <button
                className={`nav-btn ${currentSection === "cart" ? "active" : ""}`}
                onClick={() => navigateTo("cart")}
              >
                <span className="nav-icon">🛒</span>
                Carrito
                {totalCantidadEnCarrito > 0 && (
                  <span className="badge">{totalCantidadEnCarrito}</span>
                )}
              </button>
              <button
                className={`nav-btn ${
                  currentSection === "favorites" ? "active" : ""
                }`}
                onClick={() => navigateTo("favorites")}
              >
                <span className="nav-icon">⭐</span>
                Favoritos
                {favorites.length > 0 && (
                  <span className="badge">{favorites.length}</span>
                )}
              </button>

              {usuarioActual ? (
                <div className="user-menu">
                  <button className="nav-btn active">
                    <span className="nav-icon">👤</span>
                    {usuarioActual.nombre}
                  </button>
                  <button className="nav-btn" onClick={cerrarSesion}>
                    <span className="nav-icon">🚪</span>
                    Salir
                  </button>
                </div>
              ) : (
                <button
                  className={`nav-btn ${
                    currentSection === "login" || currentSection === "registro"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => navigateTo("login")}
                >
                  <span className="nav-icon">👤</span>
                  Cuenta
                </button>
              )}
            </nav>
          </div>
        </header>
      )}

      <main
        className={
          currentSection === "login" || currentSection === "registro"
            ? "login-registro"
            : ""
        }
      >
        {currentSection === "home" && (
          <div className="products">
            {visiblePlants.length > 0 ? (
              visiblePlants.map((plant) => (
                <div
                  className="card"
                  key={plant.id}
                  onClick={() => setProductoSeleccionado(plant)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="producto-info">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="producto-img"
                    />
                    <div className="producto-texto">
                      <h2>{plant.name}</h2>
                      <p>
                        <strong>Precio:</strong> ${plant.price}
                      </p>
                      <p>
                        <strong>Tamaño:</strong> {plant.size}
                      </p>
                      <p>
                        <strong>Método de Plantado:</strong> {plant.planting}
                      </p>
                      <p>
                        <strong>Descripción:</strong> {plant.description}
                      </p>
                    </div>
                    <button
                      className="btn-comprar"
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(plant);
                      }}
                    >
                      Añadir al carrito
                    </button>
                    <button
                      className={`btn-favorito ${
                        favorites.includes(plant.id) ? "active" : ""
                      }`}
                      onClick={e => {
                        e.stopPropagation();
                        toggleFavorite(plant.id);
                      }}
                      title="Favorito"
                    >
                      {favorites.includes(plant.id) ? "★ Favorito" : "☆ Favorito"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="not-found">
                <h2>Producto no encontrado</h2>
              </div>
            )}
          </div>
        )}

        {currentSection === "cart" && (
          <Carrito
            items={cart}
            eliminarItem={eliminarDelCarrito}
            aumentarCantidad={aumentarCantidad}
            disminuirCantidad={disminuirCantidad}
          />
        )}

        {currentSection === "favorites" && (
          <Favoritos
            favoritos={favorites}
            eliminarFavorito={eliminarFavorito}
            PLANTS={PLANTS}
          />
        )}

        {(currentSection === "login" || currentSection === "registro") && (
          <div className="card-center">
            {currentSection === "login" && (
              <Login onNavigate={navigateTo} onLogin={iniciarSesion} />
            )}
            {currentSection === "registro" && (
              <Registro onNavigate={navigateTo} onRegistro={registrarUsuario} />
            )}
          </div>
        )}
      </main>

      {productoSeleccionado && (
        <div className="modal-overlay" onClick={() => setProductoSeleccionado(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <img
              src={productoSeleccionado.image}
              alt={productoSeleccionado.name}
              style={{ maxWidth: "400px", width: "90%", margin: "auto", display: "block" }}
            />
            <h2>{productoSeleccionado.name}</h2>
            <p><strong>Precio:</strong> ${productoSeleccionado.price}</p>
            <p><strong>Tamaño:</strong> {productoSeleccionado.size}</p>
            <p><strong>Método de Plantado:</strong> {productoSeleccionado.planting}</p>
            <p><strong>Descripción:</strong> {productoSeleccionado.description}</p>
            <button onClick={() => setProductoSeleccionado(null)}>Cerrar</button>
          </div>
        </div>
      )}

      {currentSection !== "login" && currentSection !== "registro" && (
        <footer>
          <div className="footer-sections">
            <div className="footer-section footer-links">
              <h4>Enlaces</h4>
              <a href="/">Inicio</a>
              <br />
              <a href="/Carrito">Carrito</a>
              <br />
              <a href="/Favoritos">Favoritos</a>
              <br />
              <a href="/Cuenta">Cuenta</a>
            </div>
            <div className="footer-section footer-contact">
              <h4>Contacto</h4>
              Email: <a href="mailto:info@carnivorastienda.com">xxxx@xxxxxxxxxxx.com</a>
              <br />
              Tel: +56 9 xxxx xxxx
              <br />
              Dirección: Santiago, Chile
            </div>
            <div className="footer-section footer-social">
              <h4>Redes Sociales</h4>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <br />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <br />
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>
          <div className="footer-c">
            &copy; 2025 Mi Tienda 
            <br />
            Carrito ({cart.length}) | Favoritos ({favorites.length})
            {usuarioActual && ` | Usuario: ${usuarioActual.nombre}`}
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
