    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const user = document.getElementById('usuarioLogin').value.trim();
      const pass = document.getElementById('claveLogin').value;

      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');

      if (usuarios[user] && usuarios[user] === pass) {
        alert('Login exitoso. Bienvenido ' + user + '!');
        // Por ejemplo, guardar estado de sesión en localStorage
        localStorage.setItem('userSession', user);
        // Redirigir a página protegida o principal
        window.location.href = 'perfil.html';
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    // Guardar usuario (email) en localStorage como "logueado"
    localStorage.setItem('usuarioLogueado', email);
    // Redirigir a index.html
    window.location.href = 'index.html';
});