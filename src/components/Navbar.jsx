import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, logout, isParticular } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = (path) => {
    const active = location.pathname === path;
    return `text-sm font-semibold transition-colors duration-200 px-3 py-1.5 rounded-lg ${
      active ? 'text-primary bg-primary-fixed/30' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-highest'
    }`;
  };

  const mobileLinkClass = (path) => {
    const active = location.pathname === path;
    return `block w-full text-left text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors ${
      active ? 'text-primary bg-primary-fixed/30 border-l-4 border-primary' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-highest'
    }`;
  };

  return (
    <nav className="glass sticky top-0 w-full z-50">
      <div className="max-w-container-max mx-auto px-gutter py-2.5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-display font-black text-xl tracking-tight text-on-surface">
            <svg viewBox="0 0 100 100" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#1C1C1C" stroke="#E65C19" strokeWidth="4"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="#E65C19" strokeWidth="3"/>
              <circle cx="50" cy="50" r="10" fill="#E65C19"/>
              <path d="M50 5 A45 45 0 0 1 95 50" fill="none" stroke="#E65C19" strokeWidth="6" strokeLinecap="round" opacity="0.3"/>
              <path d="M95 50 A45 45 0 0 1 50 95" fill="none" stroke="#E65C19" strokeWidth="6" strokeLinecap="round" opacity="0.3"/>
              <path d="M50 95 A45 45 0 0 1 5 50" fill="none" stroke="#E65C19" strokeWidth="6" strokeLinecap="round" opacity="0.3"/>
              <path d="M5 50 A45 45 0 0 1 50 5" fill="none" stroke="#E65C19" strokeWidth="6" strokeLinecap="round" opacity="0.3"/>
            </svg>
            AutoTire
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            <Link to="/" className={linkClass('/')}>Inicio</Link>
            <Link to="/catalogo" className={linkClass('/catalogo')}>Catálogo</Link>
            {user && <Link to="/dashboard" className={linkClass('/dashboard')}>Panel</Link>}
            {user && <Link to="/pedidos" className={linkClass('/pedidos')}>Pedidos</Link>}
            {isParticular && <Link to="/garage" className={linkClass('/garage')}>Mi Garage</Link>}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Link to="/tiendas" className="p-2 hover:bg-surface-container-highest rounded-xl text-on-surface-variant hover:text-primary transition-colors" title="Tiendas">
            <span className="material-symbols-outlined text-xl">location_on</span>
          </Link>
          <Link to="/carrito" className="p-2 hover:bg-surface-container-highest rounded-xl text-on-surface-variant hover:text-primary transition-colors relative" title="Carrito">
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-px h-5 bg-outline-variant/40 mx-1"></div>
              <div className="flex items-center gap-2">
                <Link to="/perfil" className="flex items-center gap-2 px-2 py-1 hover:bg-surface-container-highest rounded-xl transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-on-primary text-xs font-bold">
                    {user.nombre?.[0] || 'U'}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold leading-tight max-w-[100px] truncate">{user.nombre}</p>
                    <p className="text-[10px] text-on-surface-variant capitalize leading-tight">{user.role}</p>
                  </div>
                </Link>
                <button onClick={logout} className="p-1.5 hover:bg-error-container/20 rounded-xl text-on-surface-variant hover:text-error transition-colors" title="Cerrar sesión">
                  <span className="material-symbols-outlined text-xl">logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="btn-ghost text-sm">Ingresar</Link>
              <Link to="/registro" className="btn-primary text-sm py-1.5 px-4">Registrarse</Link>
            </div>
          )}

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-surface-container-highest rounded-xl text-on-surface-variant" aria-label="Menú">
            <span className="material-symbols-outlined text-2xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/20 bg-surface/95 backdrop-blur-xl px-gutter py-4 space-y-2 animate-fade-in">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/')}>Inicio</Link>
          <Link to="/catalogo" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/catalogo')}>Catálogo</Link>
          {user && (
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/dashboard')}>Panel</Link>
          )}
          {user && (
            <Link to="/pedidos" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/pedidos')}>Pedidos</Link>
          )}
          <Link to="/tiendas" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/tiendas')}>Tiendas</Link>
          <Link to="/carrito" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/carrito')}>Carrito</Link>
          {isParticular && (
            <Link to="/garage" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/garage')}>Mi Garage</Link>
          )}
          {user && (
            <Link to="/perfil" onClick={() => setMobileMenuOpen(false)} className={mobileLinkClass('/perfil')}>Perfil</Link>
          )}
          <div className="border-t border-outline-variant/20 pt-3 mt-3">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary text-sm font-bold">
                    {user.nombre?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{user.nombre}</p>
                    <p className="text-xs text-on-surface-variant capitalize">{user.role}</p>
                  </div>
                </div>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="p-2 text-error hover:bg-error-container/20 rounded-xl">
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 btn-secondary text-sm text-center">Ingresar</Link>
                <Link to="/registro" onClick={() => setMobileMenuOpen(false)} className="flex-1 btn-primary text-sm text-center">Registrarse</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
