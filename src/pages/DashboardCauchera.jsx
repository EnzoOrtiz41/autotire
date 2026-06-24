import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PRODUCTOS, FABRICANTES } from '../data/productos';

export default function DashboardCauchera() {
  const { user, crearPedido, getPedidos } = useAuth();
  const navigate = useNavigate();
  const [fabricanteFiltro, setFabricanteFiltro] = useState('todos');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [search, setSearch] = useState('');
  const [pedidos] = useState(() => getPedidos());
  const [carrito, setCarrito] = useState([]);

  if (!user || user.role !== 'cauchera') {
    navigate('/login');
    return null;
  }

  const fabricantesUnicos = [...new Set(PRODUCTOS.map(p => p.fabricanteId))].map(id => FABRICANTES.find(f => f.id === id)).filter(Boolean);

  const productosFiltrados = PRODUCTOS.filter(p => {
    if (fabricanteFiltro !== 'todos' && p.fabricanteId !== fabricanteFiltro) return false;
    if (tipoFiltro !== 'todos' && p.tipo !== tipoFiltro) return false;
    if (search && !p.modelo.toLowerCase().includes(search.toLowerCase()) && !p.medida.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id === producto.id);
      if (existente) return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => setCarrito(prev => prev.filter(item => item.id !== id));

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.id !== id) return item;
      const nueva = item.cantidad + delta;
      return nueva <= 0 ? null : { ...item, cantidad: nueva };
    }).filter(Boolean));
  };

  const totalCarrito = carrito.reduce((sum, item) => sum + (item.wholesalePrice || 0) * item.cantidad, 0);

  const realizarPedido = () => {
    if (carrito.length === 0) return;
    crearPedido({ tiendaId: user?.rif, tiendaNombre: user?.nombre, items: [...carrito], total: totalCarrito, estado: 'procesando' });
    setCarrito([]);
    alert('Pedido realizado con éxito');
  };

  const misPedidos = pedidos.filter(p => p.tiendaId === user?.rif);

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 space-y-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary text-lg font-bold">{user?.nombre?.[0]}</div>
          <div>
            <h1 className="text-xl font-display font-black">Panel Cauchera / Taller</h1>
            <p className="text-sm text-on-surface-variant">{user?.nombre}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="dashboard-card">
              <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">search</span>
                Catálogo de Fabricantes
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                <input type="text" placeholder="Buscar por modelo o medida..." value={search} onChange={e => setSearch(e.target.value)} className="input-field flex-1 min-w-[200px]" />
                <select value={fabricanteFiltro} onChange={e => setFabricanteFiltro(e.target.value)} className="input-field w-auto">
                  <option value="todos">Todos los fabricantes</option>
                  {fabricantesUnicos.map(f => <option key={f.id} value={f.id}>{f.nombre}</option>)}
                </select>
                <select value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)} className="input-field w-auto">
                  <option value="todos">Todos los tipos</option>
                  <option value="sedan">Sedán</option>
                  <option value="suv">SUV / 4x4</option>
                  <option value="comercial">Comercial</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
                {productosFiltrados.map(p => {
                  const fabricante = FABRICANTES.find(f => f.id === p.fabricanteId);
                  return (
                    <div key={p.id} className="card-hover flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-surface-container-highest flex-shrink-0 flex items-center justify-center">
                        <span className="text-2xl font-display font-black text-primary">{fabricante?.logo || p.marca[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{p.modelo}</p>
                        <p className="text-xs text-on-surface-variant">{p.marca} · {p.medida}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="badge-primary text-[10px]">{p.tipo}</span>
                          <span className="text-xs text-on-surface-variant">MOQ: {p.moq}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="font-bold text-primary">${p.wholesalePrice?.toFixed(2)}</span>
                            <span className="text-xs text-on-surface-variant line-through ml-1">${p.msrp?.toFixed(2)}</span>
                          </div>
                          <button onClick={() => agregarAlCarrito(p)} className="btn-primary text-xs py-1.5 px-3">
                            <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                            Agregar
                          </button>
                        </div>
                        <p className="text-[10px] text-on-surface-variant mt-1">{fabricante?.nombre}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="dashboard-card">
              <h2 className="text-lg font-display font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shopping_cart</span>
                Carrito
                {carrito.length > 0 && <span className="badge-primary text-xs ml-auto">{carrito.length} items</span>}
              </h2>
              {carrito.length === 0 ? (
                <p className="text-sm text-on-surface-variant text-center py-4">Carrito vacío. Explora el catálogo.</p>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {carrito.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-2 bg-surface-container-highest rounded-xl">
                      <div className="min-w-0 mr-2">
                        <p className="text-xs font-semibold truncate">{item.modelo}</p>
                        <p className="text-[10px] text-on-surface-variant">{item.medida}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center border border-outline-variant rounded-lg text-sm">
                          <button onClick={() => cambiarCantidad(item.id, -1)} className="px-1.5 py-0.5 hover:bg-surface-container-highest rounded-l-lg">-</button>
                          <span className="px-2 py-0.5 font-semibold">{item.cantidad}</span>
                          <button onClick={() => cambiarCantidad(item.id, 1)} className="px-1.5 py-0.5 hover:bg-surface-container-highest rounded-r-lg">+</button>
                        </div>
                        <button onClick={() => quitarDelCarrito(item.id)} className="p-1 text-error"><span className="material-symbols-outlined text-base">close</span></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {carrito.length > 0 && (
                <div className="mt-4 pt-3 border-t border-outline-variant/30 space-y-3">
                  <div className="flex justify-between font-bold text-sm">
                    <span>Total:</span>
                    <span className="text-primary">${totalCarrito.toFixed(2)}</span>
                  </div>
                  <button onClick={realizarPedido} className="btn-primary w-full">
                    <span className="material-symbols-outlined text-lg">orders</span>
                    Realizar Pedido
                  </button>
                </div>
              )}
            </div>
            <div className="dashboard-card">
              <h2 className="text-lg font-display font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">receipt_long</span>
                Últimos Pedidos
              </h2>
              {misPedidos.length === 0 ? (
                <p className="text-sm text-on-surface-variant text-center py-4">No hay pedidos aún.</p>
              ) : (
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {misPedidos.slice(-5).reverse().map(p => (
                    <div key={p.id} className="p-3 bg-surface-container-highest rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-on-surface-variant">{p.id}</span>
                        <span className={`badge text-[10px] ${p.estado === 'entregado' ? 'badge-success' : p.estado === 'en_camino' ? 'badge-warning' : 'badge-primary'}`}>
                          {p.estado === 'procesando' ? 'Procesando' : p.estado === 'en_camino' ? 'En Camino' : 'Entregado'}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant">{p.items?.length || 0} productos · ${p.total?.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
              <Link to="/pedidos" className="text-sm font-semibold text-primary hover:underline mt-2 inline-block">Ver todos los pedidos</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
