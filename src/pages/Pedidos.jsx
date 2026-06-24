import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ORDERS = [
  { id: 'ORD-001', fecha: '12 Jun 2026', items: [{ nombre: 'Michelin Pilot Sport 4S', cantidad: 4, precio: 185 }], total: 740.00, estado: 'en_camino', imagen: 'M' },
  { id: 'ORD-002', fecha: '28 May 2026', items: [{ nombre: 'Pirelli Cinturato P7', cantidad: 4, precio: 82 }], total: 328.00, estado: 'entregado', imagen: 'P' },
  { id: 'ORD-003', fecha: '15 May 2026', items: [{ nombre: 'Goodyear Eagle F1', cantidad: 2, precio: 110 }], total: 220.00, estado: 'procesando', imagen: 'GY' },
];

const estados = {
  procesando: { label: 'Procesando', color: 'badge-primary' },
  en_camino: { label: 'En Camino', color: 'badge-warning' },
  entregado: { label: 'Entregado', color: 'badge-success' },
};

export default function Pedidos() {
  const { user } = useAuth();
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const filtrados = filtroEstado === 'todos' ? ORDERS : ORDERS.filter(o => o.estado === filtroEstado);

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/50 mb-3">receipt_long</span>
          <p className="text-on-surface-variant mb-4">Inicia sesión para ver tus pedidos</p>
          <a href="/login" className="btn-primary">Iniciar Sesión</a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-display font-black">Mis Pedidos</h1>
          <div className="flex gap-2">
            {['todos', 'procesando', 'en_camino', 'entregado'].map(e => (
              <button key={e} onClick={() => setFiltroEstado(e)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filtroEstado === e ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container'
                }`}>
                {e === 'todos' ? 'Todos' : estados[e]?.label || e}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtrados.map(order => {
            const est = estados[order.estado] || estados.procesando;
            return (
              <div key={order.id} className="card-hover">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-display font-black text-primary/50">{order.imagen}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-on-surface-variant">{order.id}</span>
                        <span className="text-xs text-on-surface-variant">· {order.fecha}</span>
                      </div>
                      <span className={`badge text-[10px] ${est.color}`}>{est.label}</span>
                    </div>
                    <p className="text-sm font-semibold truncate">
                      {order.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')}
                    </p>
                    <p className="text-sm text-on-surface-variant mt-1">
                      {order.items.reduce((s, i) => s + i.cantidad, 0)} productos ·{' '}
                      <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
                    </p>
                  </div>
                  <div className="flex gap-2 md:flex-shrink-0">
                    {order.estado === 'en_camino' && (
                      <button className="btn-primary text-xs py-1.5 px-3">
                        <span className="material-symbols-outlined text-sm">pin_drop</span>
                        Rastrear
                      </button>
                    )}
                    <button className="btn-ghost text-xs py-1.5 px-3">
                      <span className="material-symbols-outlined text-sm">description</span>
                      Detalles
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {filtrados.length === 0 && (
            <div className="card text-center py-8">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-2">package_2</span>
              <p className="text-on-surface-variant">No hay pedidos en este estado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
