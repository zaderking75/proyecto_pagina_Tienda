import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";;
import "../styles/panelregistro.css";

function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmarPassword: "",
    phone: "",
    address: "",
    commune: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError(false);

    if (formData.password !== formData.confirmarPassword) {
      setMensaje("Las contraseñas no coinciden");
      setError(true);
      return;
    }

    if (formData.password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres");
      setError(true);
      return;
    }

    try {
      const usuarioParaEnviar = {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        commune: formData.commune
      };

      await AuthService.register(usuarioParaEnviar);

      setMensaje("¡Registro exitoso! Redirigiendo al login...");
      setError(false);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      console.error(err);
      setError(true);

      const msgBackend = err.response?.data?.message || err.response?.data || "Error al registrar usuario.";
      setMensaje("Error: " + msgBackend);
    }
  };

  return (

      <div className="registro-wrapper">
        <div className="registro-container">

          <form onSubmit={handleSubmit}>
            <h2>Registrarse</h2>


            {mensaje && (
                <div className={error ? "mensaje-error" : "mensaje-exito"} style={{marginBottom: '15px'}}>
                  {mensaje}
                </div>
            )}

            <label>Nombre</label>
            <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label>Apellido</label>
            <input
                type="text"
                name="lastname"
                placeholder="Tu apellido"
                value={formData.lastname}
                onChange={handleChange}
                required
            />

            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
            />


            <label>Teléfono</label>
            <input
                type="text"
                name="phone"
                placeholder="+56 9 ..."
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <label>Dirección</label>
            <input
                type="text"
                name="address"
                placeholder="Calle, Número"
                value={formData.address}
                onChange={handleChange}
                required
            />

            <label>Comuna</label>
            <input
                type="text"
                name="commune"
                placeholder="Comuna"
                value={formData.commune}
                onChange={handleChange}
                required
            />

            <label>Contraseña</label>
            <input
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                title="La contraseña debe tener al menos 6 caracteres"
            />

            <label>Confirmar Contraseña</label>
            <input
                type="password"
                name="confirmarPassword"
                placeholder="Repite tu contraseña"
                value={formData.confirmarPassword}
                onChange={handleChange}
                required
            />

            <button type="submit">Registrarse</button>

            <button
                type="button"
                className="login-link"
                onClick={() => navigate("/login")}
            >
              ¿Ya tienes cuenta? Iniciar sesión
            </button>
          </form>
        </div>
      </div>
  );
}

export default Registro;