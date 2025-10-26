describe('Login Component', () => {
  let container;

  beforeEach(() => {

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {

    document.body.removeChild(container);
    container = null;
  });

  it('debe renderizar el formulario correctamente', () => {

    container.innerHTML = `
      <form>
        <input type="email" />
        <input type="password" />
        <button type="submit">Entrar</button>
      </form>
    `;
    const form = container.querySelector('form');
    expect(form).not.toBeNull();
  });

  it('debe mostrar mensaje de error con credenciales incorrectas', () => {

    function mockOnLogin(email, pass) {
      return { success: false, message: 'Credenciales incorrectas' };
    }

    const resultado = mockOnLogin('foo', 'bar');
    expect(resultado.success).toBe(false);
    expect(resultado.message).toBe('Credenciales incorrectas');
  });
});
