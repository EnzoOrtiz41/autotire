import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Garage() {
  const { user, isParticular } = useAuth();

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/50 mb-3">garage</span>
          <p className="text-on-surface-variant mb-4">Inicia sesión para acceder a tu garage</p>
          <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
        </div>
      </div>
    );
  }

  if (!isParticular) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/50 mb-3">business</span>
          <p className="text-lg font-display font-bold mb-2">Portal Empresarial</p>
          <p className="text-on-surface-variant mb-4">
            Esta sección es para conductores particulares. Como usuario empresarial, usa tu panel de control.
          </p>
          <Link to="/dashboard" className="btn-primary">Ir al Panel</Link>
        </div>
      </div>
    );
  }

  const vehiculo = user?.vehiculo;

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 animate-fade-in">
        <h1 className="text-2xl font-display font-black mb-6">Mi Garage</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Vehicle Card */}
            {vehiculo ? (
              <div className="dashboard-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-primary">directions_car</span>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg">{vehiculo.marca} {vehiculo.modelo}</h2>
                    <p className="text-sm text-on-surface-variant">{vehiculo.anio} · Medida: {vehiculo.medida}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-surface-container-highest rounded-xl">
                    <span className="material-symbols-outlined text-primary block mb-1">speed</span>
                    <p className="text-xs text-on-surface-variant">Último cambio</p>
                    <p className="text-sm font-bold">—</p>
                  </div>
                  <div className="p-3 bg-surface-container-highest rounded-xl">
                    <span className="material-symbols-outlined text-primary block mb-1">route</span>
                    <p className="text-xs text-on-surface-variant">Kilometraje</p>
                    <p className="text-sm font-bold">—</p>
                  </div>
                  <div className="p-3 bg-surface-container-highest rounded-xl">
                    <span className="material-symbols-outlined text-primary block mb-1">inventory_2</span>
                    <p className="text-xs text-on-surface-variant">Estado</p>
                    <p className="text-sm font-bold text-green-700">Bueno</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dashboard-card text-center py-8">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-2">add_circle</span>
                <p className="font-bold mb-1">Registra tu vehículo</p>
                <p className="text-sm text-on-surface-variant mb-4">Agrega tu vehículo para recibir recomendaciones</p>
                <Link to="/perfil" className="btn-primary">Configurar en Perfil</Link>
              </div>
            )}

            {/* Purchase History */}
            <div className="dashboard-card">
              <h3 className="font-display font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">receipt_long</span>
                Historial de Compras
              </h3>
              {[
                { fecha: '12 Jun 2026', producto: 'Michelin Pilot Sport 4S', total: '$740.00', estado: 'En Camino' },
                { fecha: '28 May 2026', producto: 'Pirelli Cinturato P7', total: '$328.00', estado: 'Entregado' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-surface-container-highest rounded-xl transition-colors">
                  <div>
                    <p className="text-sm font-semibold">{h.producto}</p>
                    <p className="text-xs text-on-surface-variant">{h.fecha}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{h.total}</p>
                    <span className={`badge text-[10px] ${h.estado === 'Entregado' ? 'badge-success' : 'badge-warning'}`}>{h.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="dashboard-card">
              <h3 className="font-display font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">handyman</span>
                Mantenimiento
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">Vida del neumático</span>
                    <span className="text-on-surface-variant">65%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                {['Rotación de neumáticos', 'Presión de aire', 'Alineación'].map(task => (
                  <label key={task} className="flex items-center gap-2 p-2 hover:bg-surface-container-highest rounded-lg cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                    <span className="text-sm">{task}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="dashboard-card">
              <h3 className="font-display font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">sell</span>
                Accesorios
              </h3>
              {['Kit de reparación', 'Manómetro digital', 'Tapas de válvula LED'].map(acc => (
                <div key={acc} className="flex items-center justify-between p-2 hover:bg-surface-container-highest rounded-lg transition-colors">
                  <span className="text-sm">{acc}</span>
                  <span className="text-xs text-on-surface-variant">Desde $5</span>
                </div>
              ))}
              <Link to="/catalogo" className="text-sm font-semibold text-primary hover:underline mt-2 inline-block">Ver más</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
