import { useState } from 'react';
import { TIENDAS } from '../data/productos';

export default function Tiendas() {
  const [ciudadFiltro, setCiudadFiltro] = useState('todos');
  const [search, setSearch] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);

  const ciudades = ['todos', ...new Set(TIENDAS.map(t => t.ciudad))];

  const filtradas = TIENDAS.filter(t => {
    if (ciudadFiltro !== 'todos' && t.ciudad !== ciudadFiltro) return false;
    if (search && !t.nombre.toLowerCase().includes(search.toLowerCase()) && !t.ciudad.toLowerCase().includes(search.toLowerCase()) && !t.direccion.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 animate-fade-in">
        <h1 className="text-2xl font-display font-black mb-2">Tiendas Aliadas</h1>
        <p className="text-sm text-on-surface-variant mb-6">Encuentra tu centro de servicio más cercano</p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* List */}
          <div className="lg:w-1/2 space-y-4">
            <div className="flex flex-wrap gap-2">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="input-field flex-1 min-w-[200px]" placeholder="Buscar tienda..." />
              <div className="flex gap-1">
                {ciudades.map(c => (
                  <button key={c} onClick={() => setCiudadFiltro(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      ciudadFiltro === c ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-container'
                    }`}>
                    {c === 'todos' ? 'Todas' : c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filtradas.map(t => (
                <div key={t.id}
                  onClick={() => setSelectedStore(t)}
                  className={`card-hover cursor-pointer transition-all ${selectedStore?.id === t.id ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate">{t.nombre}</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">{t.direccion}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{t.tlf}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-sm ${i < Math.floor(t.rating) ? 'text-amber-500' : 'text-outline-variant'}`}>
                            {i < Math.floor(t.rating) ? 'star' : 'star'}
                          </span>
                        ))}
                        <span className="text-xs text-on-surface-variant ml-1">{t.rating}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 ml-2">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                    </div>
                  </div>
                </div>
              ))}
              {filtradas.length === 0 && (
                <div className="card text-center py-8">
                  <p className="text-on-surface-variant">No se encontraron tiendas.</p>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="lg:w-1/2">
            <div className="card h-[500px] lg:sticky lg:top-24 overflow-hidden">
              {selectedStore ? (
                <div className="h-full flex flex-col">
                  <div className="mb-3">
                    <h3 className="font-bold">{selectedStore.nombre}</h3>
                    <p className="text-xs text-on-surface-variant">{selectedStore.direccion}</p>
                  </div>
                  <div className="flex-1 rounded-xl overflow-hidden bg-surface-container-higher">
                    <iframe
                      title="map"
                      className="w-full h-full border-0"
                      loading="lazy"
                      src={`https://www.google.com/maps?q=${selectedStore.coordenadas.lat},${selectedStore.coordenadas.lng}&hl=es&z=15&output=embed`}
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="btn-primary text-sm flex-1">
                      <span className="material-symbols-outlined text-sm">event</span>
                      Agendar Servicio
                    </button>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.coordenadas.lat},${selectedStore.coordenadas.lng}`}
                      target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                      <span className="material-symbols-outlined text-sm">directions</span>
                      Cómo llegar
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 block mb-2">map</span>
                    <p className="text-on-surface-variant">Selecciona una tienda para ver el mapa</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
