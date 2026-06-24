import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PRODUCTOS, FABRICANTES } from '../data/productos';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [medida, setMedida] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm || medida) {
      navigate(`/catalogo?q=${encodeURIComponent(searchTerm || medida)}`);
    }
  };

  const destacados = PRODUCTOS.filter(p => p.rating >= 4.5).slice(0, 4);

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-gutter py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-secondary/10 text-on-secondary/80 text-xs font-semibold mb-4">
              <span className="material-symbols-outlined text-sm">tire_repair</span>
              Plataforma B2B + B2C de neumáticos
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-on-secondary leading-tight mb-4">
              El mercado de neumáticos{' '}
              <span className="text-primary-fixed-dim">más inteligente</span>
            </h1>
            <p className="text-lg md:text-xl text-on-secondary/70 max-w-2xl mb-8">
              Conectamos fabricantes, talleres y conductores en una sola plataforma.
              Encuentra, compara y adquiere neumáticos con total transparencia.
            </p>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
                <input
                  type="text"
                  placeholder="Buscar por medida, marca o modelo..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-on-surface border-0 focus:ring-2 focus:ring-primary/50 shadow-lg"
                />
              </div>
              <button type="submit" className="btn-primary py-3 px-8 shadow-lg">
                Buscar
              </button>
            </form>
            <div className="flex flex-wrap gap-2 mt-4">
              {['205/55 R16', '195/65 R15', '225/45 R17', '215/60 R16'].map(m => (
                <button key={m} onClick={() => { setMedida(m); navigate(`/catalogo?q=${encodeURIComponent(m)}`); }}
                  className="px-3 py-1.5 rounded-lg bg-on-secondary/10 text-on-secondary/70 hover:bg-on-secondary/20 text-xs font-semibold transition-colors">
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-surface border-b border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-gutter py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: 'inventory_2', label: 'Productos', value: PRODUCTOS.length },
            { icon: 'store', label: 'Fabricantes', value: FABRICANTES.length },
            { icon: 'star', label: 'Valoración Prom.', value: '4.5' },
            { icon: 'local_shipping', label: 'Tiendas Aliadas', value: '9+' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <span className="material-symbols-outlined text-2xl text-primary block mb-1">{stat.icon}</span>
              <p className="text-2xl font-display font-black">{stat.value}</p>
              <p className="text-xs text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Role Cards */}
      <section className="max-w-container-max mx-auto px-gutter py-12">
        <h2 className="section-title text-center mb-8">¿Qué tipo de usuario eres?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Fabricante / Mayorista',
              desc: 'Gestiona tu inventario, establece precios mayoristas (MSRP/MOQ) y recibe pedidos de talleres en todo el país.',
              icon: 'factory',
              link: '/registro',
              role: 'fabricante',
              color: 'from-secondary to-secondary/90',
              textColor: 'text-on-secondary',
            },
            {
              title: 'Cauchera / Taller',
              desc: 'Compra directamente a fabricantes, accede a precios mayoristas y optimiza tu cadena de suministro.',
              icon: 'garage',
              link: '/registro',
              role: 'cauchera',
              color: 'from-primary to-primary/90',
              textColor: 'text-on-primary',
            },
            {
              title: 'Conductor / Flota',
              desc: 'Compara precios, encuentra la mejor oferta y localiza el taller más cercano para instalar.',
              icon: 'directions_car',
              link: '/registro',
              role: 'particular',
              color: 'from-tertiary-container to-tertiary',
              textColor: 'text-on-tertiary',
            },
          ].map(card => (
            <Link key={card.title} to={card.link} className="group card-hover overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              <span className={`material-symbols-outlined text-3xl text-primary mb-3 block`} style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
              <h3 className="font-display font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-on-surface-variant mb-4">{card.desc}</p>
              <span className="text-sm font-semibold text-primary group-hover:underline">
                {user ? 'Ir al panel →' : 'Crear cuenta →'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface-container-low py-12">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Neumáticos Destacados</h2>
            <Link to="/catalogo" className="btn-ghost text-sm">
              Ver catálogo completo →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {destacados.map(p => (
              <div key={p.id} className="card-hover group">
                <div className="h-28 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container flex items-center justify-center mb-3">
                  <span className="text-2xl font-display font-black text-primary/40 group-hover:text-primary/60 transition-colors">
                    {FABRICANTES.find(f => f.id === p.fabricanteId)?.logo || p.marca[0]}
                  </span>
                </div>
                <p className="font-bold text-sm truncate">{p.modelo}</p>
                <p className="text-xs text-on-surface-variant mb-2">{p.medida} · {p.marca}</p>
                <div className="flex items-center gap-1 text-xs text-on-surface-variant mb-3">
                  <span className="material-symbols-outlined text-amber-500 text-base">star</span>
                  <span className="font-semibold">{p.rating}</span>
                  <span>· {p.vendidos} vendidos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-primary text-lg">
                    ${(p.msrp || p.wholesalePrice)?.toFixed(2)}
                  </span>
                  <Link to={`/catalogo`} className="btn-primary text-xs py-1.5 px-3">Ver más</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-container-max mx-auto px-gutter py-16 text-center">
        <div className="dashboard-card bg-gradient-to-br from-primary to-primary/80 text-on-primary border-none max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-black mb-3">
            ¿Eres fabricante o taller?
          </h2>
          <p className="text-on-primary/80 mb-6 max-w-lg mx-auto">
            Únete a la red de distribución de neumáticos más grande del país. Sin cuotas de entrada para compradores.
          </p>
          <Link to="/registro" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-surface-container-low transition-colors shadow-lg">
            Comenzar ahora
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
