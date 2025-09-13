    document.getElementById('registroForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const user = document.getElementById('usuario').value.trim();
      const pass = document.getElementById('clave').value;

      if (!user || !pass) {
        alert('Por favor ingresa usuario y contraseña.');
        return;
      }

      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');

      if (usuarios[user]) {
        alert('El usuario ya existe, elige otro.');
        return;
      }

      usuarios[user] = pass;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      alert('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
      window.location.href = 'login.html';
    });

    function validarFormulario() {
    const password = document.getElementById('password').value;
    const confirmar = document.getElementById('confirmarPassword').value;

    if (password !== confirmar) {
        alert('Las contraseñas no coinciden.');
        return false;
    }
    const email = document.getElementById('email').value;
    localStorage.setItem('usuarioLogueado', email);
    alert('Registro exitoso.');
    window.location.href = 'index.html';
    return false;  // para no enviar realmente
}

        function validarFormulario() {
            const password = document.getElementById('password').value;
            const confirmar = document.getElementById('confirmarPassword').value;

            if (password !== confirmar) {
                alert('Las contraseñas no coinciden.');
                return false;
            }
            // Aquí podrías añadir validaciones extras o enviar datos a backend.
            alert('Registro exitoso (simulado).');
            return true;
        }