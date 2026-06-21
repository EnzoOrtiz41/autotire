import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container font-body-md text-body-md full-width bottom flat w-full px-gutter py-lg flex flex-col md:flex-row justify-between items-start gap-md max-w-container-max mx-auto border-t border-surface-tint/30 mt-auto">
      <div className="flex flex-col gap-sm">
        <span className="font-display-lg text-display-lg-mobile text-on-primary font-black tracking-tighter">
          AutoTire
        </span>
        <p className="text-surface-variant text-sm max-w-xs">
          Distribuidores mayoristas de neumáticos de alto rendimiento en Venezuela.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-md items-center">
        <Link to="/" className="text-surface-variant hover:text-on-primary hover:underline transition-opacity duration-200">
          Nosotros
        </Link>
        <Link to="/" className="text-surface-variant hover:text-on-primary hover:underline transition-opacity duration-200">
          Términos
        </Link>
        <Link to="/" className="text-surface-variant hover:text-on-primary hover:underline transition-opacity duration-200">
          Privacidad
        </Link>
        <Link to="/" className="text-surface-variant hover:text-on-primary hover:underline transition-opacity duration-200">
          Contacto
        </Link>
        <Link to="/" className="text-surface-variant hover:text-on-primary hover:underline transition-opacity duration-200">
          Soporte
        </Link>
      </div>
      
      <div className="text-surface-variant text-sm mt-md md:mt-0">
        © 2024 AutoTire Venezuela. Todos los derechos reservados.
      </div>
    </footer>
  );
}