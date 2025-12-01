import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import Catalogo from './Catalogo';
import * as PlantaService from '../services/PlantaService';
import * as AuthService from '../services/AuthService';
import * as FavoritoService from '../services/FavoritoService';


const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn(key => { delete store[key]; }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

jest.mock('../services/PlantaService');
jest.mock('../services/AuthService');
jest.mock('../services/FavoritoService');

describe('Catalogo Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  test('muestra loading inicial y carga plantas correctamente', async () => {
    const mockPlantas = [
      { id: 1, name: 'Planta Test', price: 10000, stock: 10, image: 'Stylidium debile.jpg', description: 'Test desc' }
    ];
    PlantaService.getAllPlanta.mockResolvedValue({ data: mockPlantas });

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    expect(screen.getByText(/cargando/i)).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Planta Test')).toBeInTheDocument();
      expect(screen.getByText('10.000')).toBeInTheDocument();
    });
  });

  test('filtra plantas por búsqueda', async () => {
    const mockPlantas = [
      { id: 1, name: 'Planta Test', price: 10000, stock: 10, image: 'Stylidium debile.jpg' },
      { id: 2, name: 'Rosa Roja', price: 15000, stock: 5, image: 'pinguicula.jpg' }
    ];
    PlantaService.getAllPlanta.mockResolvedValue({ data: mockPlantas });

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Planta Test'));
    
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Rosa' } });

    await waitFor(() => {
      expect(screen.getByText('Rosa Roja')).toBeInTheDocument();
      expect(screen.queryByText('Planta Test')).not.toBeInTheDocument();
    });
  });

  test('redirige a login cuando no hay usuario al agregar al carrito', async () => {
    AuthService.getCurrentUser.mockReturnValue(null);
    const mockPlantas = [{ id: 1, name: 'Planta Test', price: 10000, stock: 10, image: 'Stylidium debile.jpg' }];
    PlantaService.getAllPlanta.mockResolvedValue({ data: mockPlantas });

    const navigateMock = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigateMock
    }));

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Planta Test'));
    const btnAgregar = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(btnAgregar);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
  });

  test('agrega producto al carrito correctamente', async () => {
    const mockUser = { id: 1 };
    AuthService.getCurrentUser.mockReturnValue(mockUser);
    const mockPlantas = [{ id: 1, name: 'Planta Test', price: 10000, stock: 10, image: 'Stylidium debile.jpg' }];
    PlantaService.getAllPlanta.mockResolvedValue({ data: mockPlantas });

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Planta Test'));
    const btnAgregar = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(btnAgregar);

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('carrito', JSON.stringify([
        { ...mockPlantas[0], cantidad: 1 }
      ]));
    });
  });

  test('incrementa cantidad si producto ya existe en carrito', async () => {
    const mockUser = { id: 1 };
    AuthService.getCurrentUser.mockReturnValue(mockUser);
    

    const productoExistente = { id: 1, name: 'Planta Test', price: 10000, cantidad: 1, stock: 10, image: 'Stylidium debile.jpg' };
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([{ ...productoExistente, cantidad: 1 }]));
    
    const mockPlantas = [productoExistente];
    PlantaService.getAllPlanta.mockResolvedValue({ data: mockPlantas });

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Planta Test'));
    const btnAgregar = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(btnAgregar);

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('carrito', JSON.stringify([
        { ...productoExistente, cantidad: 2 }
      ]));
    });
  });

  test('muestra productos agotados correctamente', async () => {
    const mockPlantas = [
      { id: 1, name: 'Planta Agotada', price: 10000, stock: 0, image: 'Stylidium debile.jpg' },
      { id: 2, name: 'Planta Disponible', price: 15000, stock: 5, image: 'pinguicula.jpg' }
    ];
    PlantaService.getAllPlanta.mockResolvedValue({ data: mockPlantas });

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('AGOTADO')).toBeInTheDocument();
      expect(screen.getByText('Sin Stock')).toBeInTheDocument();
      expect(screen.getByText('Planta Disponible')).toBeInTheDocument();
    });
  });

  test('maneja toggle de favoritos correctamente', async () => {
    const mockPlantas = [{ id: 1, name: 'Planta Test', price: 10000, stock: 10 }];
    PlantaService.getAllPlanta.mockResolvedValue({ data: mockPlantas });
    FavoritoService.esFavorito.mockReturnValue(false);
    FavoritoService.toggleFavorito.mockReturnValue(Promise.resolve());

    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText('Planta Test'));
    const heartIcon = screen.getByText('❤️');
    fireEvent.click(heartIcon);

    await waitFor(() => {
      expect(FavoritoService.toggleFavorito).toHaveBeenCalledWith(1);
    });
  });
});
