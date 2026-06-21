import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Garage from './pages/garaje'; 
import Home from './pages/home';     
import Catalogo from './pages/Catalogo'; 
import Perfil from './pages/Perfil';
import Tiendas from './pages/Tiendas';
import Pedidos from './pages/Pedidos';
import Carrito from './pages/Carrito';
// Componentes globales
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      {/* Añadí bg-background y text-on-background para mantener el tema en toda la app */}
      <div className="flex flex-col min-h-screen bg-background text-on-background font-sans">
        
        <Navbar /> 
        
        {/* El flex-grow asegura que este contenedor empuje al Footer hacia abajo */}
        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/tiendas" element={<Tiendas />} />
            <Route path="/pedidos" element={<Pedidos />} /> {/* <-- RUTA AGREGADA */}
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </div>
        
        <Footer /> 
        
      </div>
    </Router>
  );
}