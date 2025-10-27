import React, { useState } from "react";

function Registro({ onNavigate, onRegistro }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (password !== confirmarPassword) {
      setMensaje("Las contraseñas no coinciden");
      setError(true);
      return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres");
      setError(true);
      return;
    }

    const resultado = onRegistro(nombre, email, password);
    
    if (resultado.success) {
      setMensaje(resultado.message);
      setError(false);
      // Limpiar formulario
      setNombre("");
      setEmail("");
      setPassword("");
      setConfirmarPassword("");
      // Esperar 1.5 segundos y redirigir al login
      setTimeout(() => {
        onNavigate("login");
      }, 1500);
    } else {
      setMensaje(resultado.message);
      setError(true);
    }
  }

  return (
    <div className="registro-panel">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        
        {mensaje && (
          <div className={`mensaje ${error ? "mensaje-error" : "mensaje-exito"}`}>
            {mensaje}
          </div>
        )}
        
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        
        <label>Email</label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
        
        <label>Confirmar Contraseña</label>
        <input
          type="password"
          placeholder="Repite tu contraseña"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          required
        />
        
        <button type="submit">Registrarse</button>
        
        <div className="card-link">
          ¿Ya tienes cuenta?{" "}
          <button type="button" onClick={() => onNavigate("login")}>
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registro;
