import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    email: 'juan.perez@email.com',
    password: 'clave123',
    role: 'particular',
    nombre: 'Juan Pérez',
    cedula: 'V-12345678',
    direccion: 'Av. Bolívar, Res. El Parque, Apto 4B, Valencia, Edo. Carabobo',
    telefono: '+58 414-123-4567',
    vehiculo: { marca: 'Toyota', modelo: 'Corolla', anio: '2021', medida: '205/55 R16' },
  },
  {
    email: 'tienda.chacao@email.com',
    password: 'clave123',
    role: 'cauchera',
    nombre: 'AutoCentro Chacao C.A.',
    rif: 'J-98765432-1',
    direccion: 'Calle Élice, cruce con Av. Francisco de Miranda, Chacao, Caracas',
    telefono: '+58 212-263-5510',
    capacidad: '4 elevadores / alineación computarizada',
  },
  {
    email: 'robustires.ve@email.com',
    password: 'clave123',
    role: 'fabricante',
    nombre: 'Robustires de Venezuela C.A.',
    fabricanteId: 'robustires',
    rif: 'J-12345678-9',
    direccion: 'Av. Principal de Los Ruices, Centro Empresarial Miranda, Caracas',
    telefono: '+58 212-555-0100',
    capacidad: 'Fabricante nacional - 5,000 neumáticos/mes',
  },
  {
    email: 'mayorista.covencaucho@email.com',
    password: 'clave123',
    role: 'mayorista',
    nombre: 'Covencaucho Industrias S.A.',
    fabricanteId: 'robustires',
    rif: 'J-00067421-3',
    direccion: 'Av. Industrial, Zona Industrial II, Barquisimeto, Edo. Lara',
    telefono: '+58 251-441-2010',
    capacidad: 'Distribuidor oficial Robustires - Stock nacional',
  },
];

function getInitialUser() {
  try {
    const activeSession = localStorage.getItem('autotire_session');
    if (activeSession) return JSON.parse(activeSession);
  } catch {
    localStorage.removeItem('autotire_session');
  }
  return null;
}

function seedDefaultUsers() {
  const localUsers = localStorage.getItem('autotire_users');
  if (!localUsers) {
    localStorage.setItem('autotire_users', JSON.stringify(DEFAULT_USERS));
  }
}

export function AuthProvider({ children }) {
  seedDefaultUsers();
  const [user, setUser] = useState(getInitialUser);
  const [loading] = useState(false);

  const login = (email, password) => {
    const allUsers = JSON.parse(localStorage.getItem('autotire_users') || '[]');
    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const sessionUser = { ...foundUser };
      delete sessionUser.password;
      localStorage.setItem('autotire_session', JSON.stringify(sessionUser));
      setUser(sessionUser);
      return sessionUser;
    } else {
      throw new Error('Credenciales incorrectas. Verifique su correo y contraseña.');
    }
  };

  const register = (newUserData) => {
    const allUsers = JSON.parse(localStorage.getItem('autotire_users') || '[]');
    const emailExists = allUsers.some(
      (u) => u.email.toLowerCase() === newUserData.email.toLowerCase()
    );

    if (emailExists) {
      throw new Error('Este correo electrónico ya está registrado.');
    }

    const updatedUsers = [...allUsers, newUserData];
    localStorage.setItem('autotire_users', JSON.stringify(updatedUsers));

    const sessionUser = { ...newUserData };
    delete sessionUser.password;
    localStorage.setItem('autotire_session', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  };

  const logout = () => {
    localStorage.removeItem('autotire_session');
    setUser(null);
  };

  const getInventario = () => {
    const inventario = JSON.parse(localStorage.getItem('autotire_inventario') || '{}');
    if (user?.fabricanteId && inventario[user.fabricanteId]) {
      return inventario[user.fabricanteId] || [];
    }
    return [];
  };

  const addProducto = (producto) => {
    const inventario = JSON.parse(localStorage.getItem('autotire_inventario') || '{}');
    const fabricanteId = user?.fabricanteId;
    if (!fabricanteId) return;
    if (!inventario[fabricanteId]) inventario[fabricanteId] = [];
    const nuevoProducto = { ...producto, id: `prod_${Date.now()}`, fabricanteId, fechaCreacion: new Date().toISOString() };
    inventario[fabricanteId].push(nuevoProducto);
    localStorage.setItem('autotire_inventario', JSON.stringify(inventario));
    return nuevoProducto;
  };

  const updateProducto = (id, updates) => {
    const inventario = JSON.parse(localStorage.getItem('autotire_inventario') || '{}');
    const fabricanteId = user?.fabricanteId;
    if (!fabricanteId || !inventario[fabricanteId]) return;
    const idx = inventario[fabricanteId].findIndex((p) => p.id === id);
    if (idx === -1) return;
    inventario[fabricanteId][idx] = { ...inventario[fabricanteId][idx], ...updates };
    localStorage.setItem('autotire_inventario', JSON.stringify(inventario));
    return inventario[fabricanteId][idx];
  };

  const deleteProducto = (id) => {
    const inventario = JSON.parse(localStorage.getItem('autotire_inventario') || '{}');
    const fabricanteId = user?.fabricanteId;
    if (!fabricanteId || !inventario[fabricanteId]) return;
    inventario[fabricanteId] = inventario[fabricanteId].filter((p) => p.id !== id);
    localStorage.setItem('autotire_inventario', JSON.stringify(inventario));
  };

  const getPedidos = () => {
    return JSON.parse(localStorage.getItem('autotire_pedidos') || '[]');
  };

  const crearPedido = (pedido) => {
    const pedidos = JSON.parse(localStorage.getItem('autotire_pedidos') || '[]');
    const nuevoPedido = {
      ...pedido,
      id: `ORD-${Date.now()}`,
      fecha: new Date().toISOString(),
      estado: 'procesando',
    };
    pedidos.push(nuevoPedido);
    localStorage.setItem('autotire_pedidos', JSON.stringify(pedidos));
    return nuevoPedido;
  };

  const actualizarEstadoPedido = (id, estado) => {
    const pedidos = JSON.parse(localStorage.getItem('autotire_pedidos') || '[]');
    const idx = pedidos.findIndex((p) => p.id === id);
    if (idx === -1) return;
    pedidos[idx].estado = estado;
    localStorage.setItem('autotire_pedidos', JSON.stringify(pedidos));
    return pedidos[idx];
  };

  const getRoleInfo = () => {
    const role = user?.role;
    if (role === 'fabricante' || role === 'mayorista') {
      return {
        type: 'b2b',
        label: role === 'fabricante' ? 'Fabricante' : 'Mayorista',
        dashboardPath: '/dashboard',
        color: 'bg-secondary text-on-secondary',
        description: 'Portal de gestión de inventario y ventas',
      };
    }
    if (role === 'cauchera') {
      return {
        type: 'b2b',
        label: 'Cauchera / Taller',
        dashboardPath: '/dashboard',
        color: 'bg-primary text-on-primary',
        description: 'Portal de compras y pedidos a fabricantes',
      };
    }
    return {
      type: 'b2c',
      label: 'Cliente',
      dashboardPath: '/dashboard',
      color: 'bg-tertiary-container text-on-tertiary-container',
      description: 'Buscador de neumáticos y tiendas',
    };
  };

  const val = {
    user,
    loading,
    login,
    register,
    logout,
    getInventario,
    addProducto,
    updateProducto,
    deleteProducto,
    getPedidos,
    crearPedido,
    actualizarEstadoPedido,
    getRoleInfo,
    isFabricanteMayorista: user?.role === 'fabricante' || user?.role === 'mayorista',
    isCauchera: user?.role === 'cauchera',
    isParticular: user?.role === 'particular',
    isB2B: user?.role === 'fabricante' || user?.role === 'mayorista' || user?.role === 'cauchera',
    isAdmin: user?.role === 'fabricante',
  };

  return (
    <AuthContext.Provider value={val}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
