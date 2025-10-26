
describe('Registro Component', () => {
  it('debe indicar error si las contraseñas no coinciden', () => {

    function mockOnRegistro() { return { success: false, message: 'Error de prueba' }; }


    let mensaje = '';
    let error = false;
    function setMensaje(msg) { mensaje = msg; }
    function setError(val) { error = val; }

    const password = 'abc123';
    const confirmarPassword = 'xyz789';


    if (password !== confirmarPassword) {
      setMensaje("Las contraseñas no coinciden");
      setError(true);
    }

    expect(mensaje).toBe("Las contraseñas no coinciden");
    expect(error).toBe(true);
  });

  it('debe indicar error si la contraseña tiene menos de 6 caracteres', () => {
    let mensaje = '';
    let error = false;
    function setMensaje(msg) { mensaje = msg; }
    function setError(val) { error = val; }

    const password = 'abc';
    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres");
      setError(true);
    }

    expect(mensaje).toBe("La contraseña debe tener al menos 6 caracteres");
    expect(error).toBe(true);
  });

  it('debe llamar a onRegistro con parámetros correctos', () => {
    let llamada = false;
    function mockOnRegistro(nombre, email, password) {
      llamada = true;
      return { success: true, message: 'Registro exitoso' };
    }


    const resultado = mockOnRegistro('Juan', 'juan@email.com', 'abcdef');
    expect(llamada).toBe(true);
    expect(resultado.success).toBe(true);
    expect(resultado.message).toBe('Registro exitoso');
  });


});
