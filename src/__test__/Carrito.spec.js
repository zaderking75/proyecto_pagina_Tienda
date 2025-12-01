import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Carrito from './Carrito';
import * as AuthService from '../services/AuthService';
import * as CompraService from '../services/CompraService';

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn(key => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

jest.mock('../services/AuthService');
jest.mock('../services/CompraService');

describe('Carrito Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  test('muestra mensaje cuando carrito está vacío', () => {
    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );
    
    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
    expect(screen.getByText('Ir a comprar')).toBeInTheDocument();
  });

  test('carga productos del localStorage al montar', async () => {
    const mockProductos = [
      { id: 1, name: 'Planta Test', price: 10000, cantidad: 2, image: 'darlingtonia.jpg.' }
    ];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockProductos));

    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Planta Test')).toBeInTheDocument();
      expect(screen.getByText('20.000')).toBeInTheDocument();
    });
  });

  test('calcula total correctamente', async () => {
    const mockProductos = [
      { id: 1, name: 'Planta 1', price: 10000, cantidad: 2 },
      { id: 2, name: 'Planta 2', price: 5000, cantidad: 1 }
    ];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockProductos));

    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('25.000')).toBeInTheDocument();
    });
  });

  test('incrementa cantidad de producto', async () => {
    const mockProducto = [{ id: 1, name: 'Planta Test', price: 10000, cantidad: 1 }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockProducto));

    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('1'));
    const btnIncrementar = screen.getAllByRole('button')[1]; 
    fireEvent.click(btnIncrementar);

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('carrito', JSON.stringify([
        { id: 1, name: 'Planta Test', price: 10000, cantidad: 2 }
      ]));
    });
  });

  test('decrementa cantidad sin bajar de 1', async () => {
    const mockProducto = [{ id: 1, name: 'Planta Test', price: 10000, cantidad: 2 }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockProducto));

    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('2'));
    const btnDecrementar = screen.getAllByRole('button')[0];
    fireEvent.click(btnDecrementar);

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('carrito', JSON.stringify([
        { id: 1, name: 'Planta Test', price: 10000, cantidad: 1 }
      ]));
    });
  });

  test('elimina producto del carrito', async () => {
    const mockProducto = [{ id: 1, name: 'Planta Test', price: 10000, cantidad: 1 }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockProducto));

    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Planta Test'));
    const btnEliminar = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(btnEliminar);

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('carrito', '[]');
      expect(screen.getByText('El carrito está vacío')).toBeInTheDocument();
    });
  });

  test('redirige a login si no hay usuario en checkout', async () => {
    AuthService.getCurrentUser.mockReturnValue(null);
    const mockProducto = [{ id: 1, name: 'Planta Test', price: 10000, cantidad: 1 }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockProducto));

    const { history } = render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByRole('button', { name: /finalizar/i }));
    fireEvent.click(screen.getByRole('button', { name: /finalizar/i }));

    expect(screen.getByText('Debes iniciar sesión para comprar.')).toBeInTheDocument();
  });

  test('procesa checkout exitosamente', async () => {
    const mockUser = { id: 1 };
    AuthService.getCurrentUser.mockReturnValue(mockUser);
    CompraService.createPurchase.mockResolvedValue({ data: 'success' });
    
    const mockProducto = [{ id: 1, name: 'Planta Test', price: 10000, cantidad: 1 }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockProducto));

    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByRole('button', { name: /finalizar/i }));
    fireEvent.click(screen.getByRole('button', { name: /finalizar/i }));

    await waitFor(() => {
      expect(CompraService.createPurchase).toHaveBeenCalled();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('carrito');
    });
  });
});
