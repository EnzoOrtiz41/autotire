import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PRODUCTOS, FABRICANTES } from '../data/productos';

export default function Catalogo() {
  const { isB2B } = useAuth();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [search, setSearch] = useState(initialQuery);
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [marcaFiltro, setMarcaFiltro] = useState('todos');
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(500);
  const [bcv, setBcv] = useState(null);

  useEffect(() => {
    fetch('https://ve.dolarapi.com/v1/dolares/oficial')
      .then(r => r.json())
      .then(d => setBcv(d.promedio || d.precio))
      .catch(() => setBcv(65));
  }, []);

  const tipos = ['todos', 'sedan', 'suv', 'comercial'];
  const marcas = ['todos', ...new Set(PRODUCTOS.map(p => p.marca))];

  const filtrados = PRODUCTOS.filter(p => {
    if (tipoFiltro !== 'todos' && p.tipo !== tipoFiltro) return false;
    if (marcaFiltro !== 'todos' && p.marca !== marcaFiltro) return false;
    const precio = p.msrp || p.wholesalePrice || 0;
    if (precio < precioMin || precio > precioMax) return false;
    if (search && !p.modelo.toLowerCase().includes(search.toLowerCase()) && !p.marca.toLowerCase().includes(search.toLowerCase()) && !p.medida.includes(search)) return false;
    return true;
  });

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-display font-black">Catálogo de Neumáticos</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            {bcv ? `BCV: Bs. ${bcv.toFixed(2)} / USD | ` : ''}
            {filtrados.length} productos disponibles
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card space-y-5 lg:sticky lg:top-24">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Búsqueda</label>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="input-field mt-1" placeholder="Modelo, medida..." />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tipo</label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {tipos.map(t => (
                    <button key={t} onClick={() => setTipoFiltro(t)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        tipoFiltro === t ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container'
                      }`}>
                      {t === 'todos' ? 'Todos' : t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Marca</label>
                <select value={marcaFiltro} onChange={e => setMarcaFiltro(e.target.value)} className="input-field mt-1">
                  {marcas.map(m => <option key={m} value={m}>{m === 'todos' ? 'Todas' : m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Precio ${precioMin} - ${precioMax}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input type="range" min="0" max="500" value={precioMin} onChange={e => setPrecioMin(Number(e.target.value))} className="flex-1 accent-primary" />
                  <input type="range" min="0" max="500" value={precioMax} onChange={e => setPrecioMax(Number(e.target.value))} className="flex-1 accent-primary" />
                </div>
              </div>
              <button onClick={() => { setSearch(''); setTipoFiltro('todos'); setMarcaFiltro('todos'); setPrecioMin(0); setPrecioMax(500); }}
                className="btn-secondary w-full text-sm">
                Limpiar
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filtrados.length === 0 ? (
              <div className="card text-center py-12">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/50 mb-2">search_off</span>
                <p className="text-on-surface-variant">No se encontraron productos. Ajusta los filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtrados.map(p => {
                  const fabricante = FABRICANTES.find(f => f.id === p.fabricanteId);
                  const precio = isB2B ? p.wholesalePrice : p.msrp;
                  return (
                    <div key={p.id} className="card-hover group">
                      <div className="h-28 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container flex items-center justify-center mb-3">
                        <span className="text-3xl font-display font-black text-primary/30 group-hover:text-primary/60 transition-colors">
                          {fabricante?.logo || p.marca[0]}
                        </span>
                      </div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate">{p.modelo}</p>
                          <p className="text-xs text-on-surface-variant">{p.medida}</p>
                        </div>
                        <span className={`badge text-[10px] whitespace-nowrap ml-2 ${
                          p.tipo === 'comercial' ? 'badge-warning' : p.tipo === 'suv' ? 'badge-secondary' : 'badge-primary'
                        }`}>
                          {p.tipo}
                        </span>
                      </div>
                      {isB2B && (
                        <div className="mb-2 flex items-center gap-2 text-xs">
                          <span className="badge-success">MOQ: {p.moq}</span>
                          {p.wholesalePrice && p.msrp && (
                            <span className="text-green-700 font-semibold">
                              Ahorras ${(p.msrp - p.wholesalePrice).toFixed(2)}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs text-on-surface-variant mb-3">
                        <span className="material-symbols-outlined text-amber-500 text-base">star</span>
                        <span className="font-semibold">{p.rating}</span>
                        <span>·</span>
                        <span>{fabricante?.nombre || p.marca}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-display font-black text-primary">${precio?.toFixed(2)}</span>
                          {isB2B && p.msrp && (
                            <span className="text-xs text-on-surface-variant line-through ml-1">${p.msrp?.toFixed(2)}</span>
                          )}
                          <p className="text-[10px] text-on-surface-variant">
                            {isB2B ? 'Precio mayorista' : 'Precio público'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/20">
                        <span className="font-bold">UTQG:</span>
                        <span>{p.specs?.treadwear}</span>
                        <span>· Tracción {p.specs?.traction}</span>
                        <span>· Temp. {p.specs?.temperature}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
