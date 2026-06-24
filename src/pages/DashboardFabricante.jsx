import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PRODUCTOS, FABRICANTES, VENTAS_DATA } from '../data/productos';

export default function DashboardFabricante() {
  const { user, getInventario } = useAuth();
  const navigate = useNavigate();
  const [inventario] = useState(() => {
    if (user?.fabricanteId) return getInventario();
    return [];
  });

  if (!user || (user.role !== 'fabricante' && user.role !== 'mayorista')) {
    navigate('/login');
    return null;
  }

  const inventarioBase = PRODUCTOS.filter(p => p.fabricanteId === user?.fabricanteId);
  const ventas = VENTAS_DATA[user?.fabricanteId] || VENTAS_DATA.robustires;

  const todosProductos = [...inventarioBase, ...inventario];
  const totalProductos = todosProductos.length;
  const totalStock = todosProductos.reduce((sum, p) => sum + (p.stock || 0), 0);
  const valorInventario = todosProductos.reduce((sum, p) => sum + (p.wholesalePrice || 0) * (p.stock || 0), 0);
  const enOferta = todosProductos.filter(p => p.enOferta).length;
  const totalVendidos = ventas.totalVendidos || 0;
  const ingresos = ventas.ingresos || 0;

  const fabricante = FABRICANTES.find(f => f.id === user?.fabricanteId);

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-on-secondary text-xl font-bold">
                {fabricante?.logo || user?.nombre?.[0]}
              </div>
              <div>
                <h1 className="text-2xl font-display font-black text-on-surface">
                  Panel de {user.role === 'fabricante' ? 'Fabricante' : 'Mayorista'}
                </h1>
                <p className="text-on-surface-variant text-sm">{user?.nombre}</p>
              </div>
            </div>
          </div>
          <Link to="/fabricante/inventario" className="btn-primary">
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            Gestionar Inventario
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="dashboard-stat">
            <span className="stat-value">{totalProductos}</span>
            <span className="stat-label">Productos</span>
          </div>
          <div className="dashboard-stat">
            <span className="stat-value">{totalStock}</span>
            <span className="stat-label">Unidades en Stock</span>
          </div>
          <div className="dashboard-stat">
            <span className="stat-value">${valorInventario.toLocaleString()}</span>
            <span className="stat-label">Valor Inventario</span>
          </div>
          <div className="dashboard-stat">
            <span className="stat-value">{enOferta}</span>
            <span className="stat-label">En Oferta</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 dashboard-card">
            <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              Analíticas de Ventas
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-primary-fixed/20 rounded-xl p-4">
                <span className="text-xs text-on-surface-variant font-medium uppercase">Total Vendido</span>
                <p className="text-2xl font-display font-black text-on-surface">{totalVendidos} unidades</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <span className="text-xs text-on-surface-variant font-medium uppercase">Ingresos</span>
                <p className="text-2xl font-display font-black text-green-700">${ingresos.toLocaleString()}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-on-surface-variant mb-3">Ventas por Mes</h3>
              <div className="flex items-end gap-2 h-32">
                {ventas.ventasPorMes?.map((item) => {
                  const max = Math.max(...ventas.ventasPorMes.map(v => v.cantidad));
                  const height = (item.cantidad / max) * 100;
                  return (
                    <div key={item.mes} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] font-bold text-on-surface-variant">{item.cantidad}</span>
                      <div className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary-fixed-dim transition-all duration-500" style={{ height: `${Math.max(height, 4)}%` }} />
                      <span className="text-[10px] text-on-surface-variant">{item.mes}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {ventas.productosMasVendidos && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-on-surface-variant mb-3">Productos Más Vendidos</h3>
                <div className="space-y-2">
                  {ventas.productosMasVendidos.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-surface-container-highest rounded-xl">
                      <span className="font-medium text-sm">{p.nombre}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-on-surface-variant">{p.cantidad} uds</span>
                        <span className="font-bold text-primary">${p.ingresos.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="dashboard-card space-y-4">
            <h2 className="text-lg font-display font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">inventory</span>
              Inventario Rápido
            </h2>
            <div className="space-y-3">
              {todosProductos.slice(0, 6).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-surface-container-highest rounded-xl">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{p.modelo}</p>
                    <p className="text-xs text-on-surface-variant">{p.medida}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className={`text-sm font-bold ${p.stock < 20 ? 'text-error' : 'text-green-700'}`}>{p.stock || 0}</p>
                    {p.enOferta && <span className="badge-warning text-[10px]">Oferta</span>}
                  </div>
                </div>
              ))}
            </div>
            <Link to="/fabricante/inventario" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              Ver inventario completo
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dashboard-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">sell</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Ofertas Activas</h3>
                <p className="text-xs text-on-surface-variant">Descuentos por volumen</p>
              </div>
            </div>
            <p className="text-2xl font-display font-black">{enOferta}</p>
            <Link to="/fabricante/inventario" className="text-sm text-primary font-semibold hover:underline mt-2 inline-block">Configurar ofertas</Link>
          </div>
          <div className="dashboard-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-amber-600">inventory</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Stock Bajo</h3>
                <p className="text-xs text-on-surface-variant">Menos de 20 unidades</p>
              </div>
            </div>
            <p className="text-2xl font-display font-black text-error">{todosProductos.filter(p => p.stock < 20).length}</p>
          </div>
          <div className="dashboard-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600">orders</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">MSRP Promedio</h3>
                <p className="text-xs text-on-surface-variant">Precio sugerido</p>
              </div>
            </div>
            <p className="text-2xl font-display font-black">
              ${todosProductos.length ? (todosProductos.reduce((s, p) => s + (p.msrp || 0), 0) / todosProductos.length).toFixed(0) : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
