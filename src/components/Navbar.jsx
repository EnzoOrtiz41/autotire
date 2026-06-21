import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  // Obtenemos la ruta actual en la que está el usuario (ej: '/', '/catalogo', '/garage')
  const location = useLocation();

  // Función auxiliar para aplicar las clases dependiendo de si la ruta coincide
  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    
    // Si está activo, le ponemos la línea naranja y la letra en negrita. Si no, su estilo normal.
    if (isActive) {
      return "font-body-md text-body-md text-secondary font-bold border-b-2 border-secondary pb-1 px-sm py-xs transition-transform active:scale-95";
    }
    return "font-body-md text-body-md text-on-surface-variant dark:text-on-surface hover:text-secondary hover:bg-surface-container-low transition-colors duration-200 active:scale-95 transition-transform px-sm py-xs rounded";
  };

  return (
    <nav className="bg-surface/90 dark:bg-surface-container/90 backdrop-blur-xl docked full-width top-0 border-b-2 border-secondary shadow-md sticky w-full z-50 flex justify-between items-center px-gutter py-sm max-w-container-max mx-auto">
      <div className="flex items-center gap-md">
        {/* Logo que también te lleva al Inicio */}
        <Link to="/" className="font-display-lg text-display-lg-mobile font-black text-primary dark:text-on-primary tracking-tighter hidden md:block">AutoTire</Link>
        <Link to="/" className="font-display-lg-mobile text-display-lg-mobile font-black text-primary dark:text-on-primary tracking-tighter md:hidden">AutoTire</Link>
        
        {/* Menú de Navegación */}
        <div className="hidden md:flex gap-md ml-lg">
          {/* Opción de Inicio (Carga Home.jsx) */}
          <Link to="/" className={getLinkClasses('/')}>
            Inicio
          </Link>
          
          {/* Opción de Catálogo (Redirecciona a Catalogo.jsx) */}
          <Link to="/catalogo" className={getLinkClasses('/catalogo')}>
            Catálogo
          </Link>
          
          <Link to="/pedidos" className={getLinkClasses('/pedidos')}>
            Mis Pedidos
          </Link>
          
          <Link to="/garage" className={getLinkClasses('/garage')}>
            Mi Garage
          </Link>
          
          <Link to="/perfil" className={getLinkClasses('/perfil')}>
            Perfil
          </Link>
        </div>
      </div>
      
      {/* Iconos de Acción del lado derecho */}
      <div className="flex items-center gap-sm">
        <Link to="/carrito" className="p-2 hover:bg-surface-container rounded-full transition-colors">
        <span className="material-symbols-outlined">shopping_cart</span>
        </Link>
        <Link to="/tiendas" className="p-xs text-secondary dark:text-secondary-fixed hover:bg-surface-container-low transition-colors duration-200 active:scale-95 transition-transform rounded-full inline-flex items-center justify-center">
        <span className="material-symbols-outlined">location_on</span>
        </Link>
      </div>
    </nav>
  );
}