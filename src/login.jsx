import React, { useState } from "react";

function Login({ onNavigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    
    const resultado = onLogin(email, password);
    
    if (resultado.success) {
      setMensaje(resultado.message);
      setError(false);
      // Esperar 1 segundo y redirigir al home
      setTimeout(() => {
        onNavigate("home");
      }, 1000);
    } else {
      setMensaje(resultado.message);
      setError(true);
    }
  }

  return (
    <div className="login-panel">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        
        {mensaje && (
          <div className={`mensaje ${error ? "mensaje-error" : "mensaje-exito"}`}>
            {mensaje}
          </div>
        )}
        
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
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Entrar</button>
        
        <div className="card-link">
          ¿No tienes cuenta?{" "}
          <button type="button" onClick={() => onNavigate("registro")}>
            Regístrarse
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
