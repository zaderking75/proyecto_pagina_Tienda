  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import AuthService from "../services/AuthService";
  import "../styles/panelLogin.css";

  function Login({  }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      setMensaje("");
      setError(false);

      try {
        const response = await AuthService.login({email, password})

        const { token, user } = response.data;
        localStorage.setItem("jwtToken", token);
        AuthService.saveUser(user);



        setMensaje("¡Login exitoso! Redirigiendo...");
        setError(false);

        setTimeout(() => {
          if (user.role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
          window.location.reload();
        }, 1000);

      } catch (err) {
        console.error("Error completo:", err);
        setError(true);
        if (err.response && err.response.data) {
          const mensajeBackend = err.response.data.message || err.response.data.error || JSON.stringify(err.response.data);
          setMensaje("Error: " + mensajeBackend);
        } else {
          setMensaje("Error: No se pudo conectar con el servidor.");
        }
      }
    }

    return (
        <div className="login-wrapper">
          <div className="login-container">

            <form onSubmit={handleSubmit}>
              <h2>Iniciar sesión</h2>

              {mensaje && (
                  <div style={{
                    color: error ? 'red' : 'green',
                    textAlign: 'center',
                    marginBottom: '10px'
                  }}>
                    {mensaje}
                  </div>
              )}

              <label>Email</label>
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />

              <label>Contraseña</label>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />

              <button type="submit">Ingresar</button>
              <button
                  type="button"
                  className="registro-link"
                  onClick={() => navigate("/registro")}
              >
                ¿No tienes cuenta? Regístrate
              </button>
            </form>
          </div>
        </div>
    );
  }

  export default Login;
