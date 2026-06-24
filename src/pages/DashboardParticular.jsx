import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PRODUCTOS, FABRICANTES } from '../data/productos';

export default function DashboardParticular() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(500);
  const [medida, setMedida] = useState('');

  useEffect(() => {
    if (user && user.role !== 'particular') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const medidasPopulares = ['205/55 R16', '195/65 R15', '225/45 R17', '215/60 R16', '235/40 R18', '265/70 R17', '175/70 R13', '185 R14C'];

  const productosFiltrados = PRODUCTOS.filter(p => {
    const precio = p.msrp || p.wholesalePrice || 0;
    if (medida && !p.medida.includes(medida)) return false;
    if (tipoFiltro !== 'todos' && p.tipo !== tipoFiltro) return false;
    if (precio < precioMin || precio > precioMax) return false;
    if (search && !p.modelo.toLowerCase().includes(search.toLowerCase()) && !p.marca.toLowerCase().includes(search.toLowerCase()) && !p.medida.includes(search)) return false;
    return true;
  });

  const masBaratos = [...PRODUCTOS].sort((a, b) => (a.msrp || 0) - (b.msrp || 0)).slice(0, 4);
  const mejorValorados = [...PRODUCTOS].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 space-y-6 animate-fade-in">
        {/* Hero Search */}
        <div className="dashboard-card bg-gradient-to-br from-secondary to-secondary/90 text-on-secondary border-none">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-display font-black mb-2">
              Encuentra el neumático perfecto
            </h1>
            <p className="text-on-secondary/80 text-sm mb-4">
              Compara precios, marcas y disponibilidad en las mejores tiendas del país.
            </p>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-secondary/60">search</span>
              <input
                type="text"
                placeholder="Buscar por medida (ej: 205/55 R16), marca o modelo..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-on-secondary/10 text-on-secondary placeholder:text-on-secondary/50 border border-on-secondary/20 focus:outline-none focus:border-on-secondary/50 backdrop-blur-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {medidasPopulares.slice(0, 6).map(m => (
                <button
                  key={m}
                  onClick={() => setMedida(m === medida ? '' : m)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    medida === m
                      ? 'bg-primary text-on-primary'
                      : 'bg-on-secondary/10 text-on-secondary/80 hover:bg-on-secondary/20'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters + Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="dashboard-card h-fit lg:sticky lg:top-24">
            <h3 className="font-bold text-sm mb-3">Filtros</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant">Tipo</label>
                <select value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)} className="input-field mt-1">
                  <option value="todos">Todos</option>
                  <option value="sedan">Sedán</option>
                  <option value="suv">SUV / 4x4</option>
                  <option value="comercial">Comercial</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant">Rango de Precio</label>
                <div className="flex items-center gap-2 mt-1">
                  <input type="number" value={precioMin} onChange={e => setPrecioMin(Number(e.target.value))} className="input-field text-sm py-1.5" placeholder="Min" />
                  <span className="text-on-surface-variant">-</span>
                  <input type="number" value={precioMax} onChange={e => setPrecioMax(Number(e.target.value))} className="input-field text-sm py-1.5" placeholder="Max" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant">Medida exacta</label>
                <select value={medida} onChange={e => setMedida(e.target.value)} className="input-field mt-1">
                  <option value="">Todas las medidas</option>
                  {medidasPopulares.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => { setSearch(''); setTipoFiltro('todos'); setPrecioMin(0); setPrecioMax(500); setMedida(''); }}
                className="btn-secondary w-full text-sm"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg">
                {search || medida ? `Resultados (${productosFiltrados.length})` : 'Catálogo'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {productosFiltrados.map(p => {
                const fabricante = FABRICANTES.find(f => f.id === p.fabricanteId);
                return (
                  <div key={p.id} className="card-hover group">
                    <div className="w-full h-32 rounded-xl bg-surface-container-highest flex items-center justify-center mb-3 overflow-hidden">
                      <span className="text-3xl font-display font-black text-primary/60 group-hover:text-primary transition-colors">
                        {fabricante?.logo || p.marca[0]}
                      </span>
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-sm truncate">{p.modelo}</p>
                        <p className="text-xs text-on-surface-variant">{p.marca} · {p.medida}</p>
                      </div>
                      <span className={`badge text-[10px] ${p.tipo === 'comercial' ? 'badge-warning' : p.tipo === 'suv' ? 'badge-secondary' : 'badge-primary'}`}>
                        {p.tipo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-sm">star</span>
                        {p.rating}
                      </span>
                      <span>·</span>
                      <span>{p.vendidos} vendidos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-display font-black text-primary">${(p.msrp || p.wholesalePrice)?.toFixed(2)}</span>
                        <span className="text-xs text-on-surface-variant block">{fabricante?.nombre}</span>
                      </div>
                      <Link to="/catalogo" className="btn-ghost text-sm p-2">
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            {productosFiltrados.length === 0 && (
              <div className="dashboard-card text-center py-8">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/50">search_off</span>
                <p className="text-on-surface-variant mt-2">No se encontraron productos con esos filtros.</p>
              </div>
            )}
          </div>
        </div>

        {/* Market Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="dashboard-card">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_offer</span>
              Más Económicos
            </h3>
            <div className="space-y-2">
              {masBaratos.map(p => (
                <div key={p.id} className="flex items-center justify-between p-2 hover:bg-surface-container-highest rounded-xl transition-colors">
                  <div>
                    <p className="text-sm font-semibold">{p.modelo}</p>
                    <p className="text-xs text-on-surface-variant">{p.medida}</p>
                  </div>
                  <span className="font-bold text-primary">${(p.msrp || p.wholesalePrice)?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dashboard-card">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">thumb_up</span>
              Mejor Valorados
            </h3>
            <div className="space-y-2">
              {mejorValorados.map(p => (
                <div key={p.id} className="flex items-center justify-between p-2 hover:bg-surface-container-highest rounded-xl transition-colors">
                  <div>
                    <p className="text-sm font-semibold">{p.modelo}</p>
                    <p className="text-xs text-on-surface-variant">{p.medida}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="material-symbols-outlined text-amber-500 text-base">star</span>
                    <span className="font-bold">{p.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
