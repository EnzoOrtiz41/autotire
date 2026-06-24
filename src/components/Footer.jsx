import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-secondary text-on-secondary mt-auto">
      <div className="max-w-container-max mx-auto px-gutter py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex flex-col gap-2 max-w-xs">
            <div className="flex items-center gap-2 font-display font-black text-xl tracking-tight">
              <svg viewBox="0 0 100 100" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#FFF" stroke="#E65C19" strokeWidth="4"/>
                <circle cx="50" cy="50" r="30" fill="none" stroke="#E65C19" strokeWidth="3"/>
                <circle cx="50" cy="50" r="10" fill="#E65C19"/>
              </svg>
              AutoTire
            </div>
            <p className="text-on-secondary/60 text-sm">
              Distribución de neumáticos B2B y B2B2C. Conectamos fabricantes, talleres y conductores en Venezuela.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-on-secondary/40">Plataforma</span>
              <Link to="/catalogo" className="text-sm text-on-secondary/70 hover:text-on-secondary transition-colors">Catálogo</Link>
              <Link to="/tiendas" className="text-sm text-on-secondary/70 hover:text-on-secondary transition-colors">Tiendas</Link>
              <Link to="/registro" className="text-sm text-on-secondary/70 hover:text-on-secondary transition-colors">Registrarse</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-on-secondary/40">Empresa</span>
              <Link to="/" className="text-sm text-on-secondary/70 hover:text-on-secondary transition-colors">Nosotros</Link>
              <Link to="/" className="text-sm text-on-secondary/70 hover:text-on-secondary transition-colors">Términos</Link>
              <Link to="/" className="text-sm text-on-secondary/70 hover:text-on-secondary transition-colors">Privacidad</Link>
              <Link to="/" className="text-sm text-on-secondary/70 hover:text-on-secondary transition-colors">Contacto</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-on-secondary/10 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-on-secondary/40">
          <span>&copy; {new Date().getFullYear()} AutoTire Venezuela C.A. Todos los derechos reservados.</span>
          <span>Hecho en Caracas, Venezuela</span>
        </div>
      </div>
    </footer>
  );
}
