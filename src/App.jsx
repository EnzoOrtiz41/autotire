import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Garage from './pages/garaje';
import Home from './pages/home';
import Catalogo from './pages/Catalogo';
import Perfil from './pages/Perfil';
import Tiendas from './pages/Tiendas';
import Pedidos from './pages/Pedidos';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Registro from './pages/Registro';
import DashboardFabricante from './pages/DashboardFabricante';
import InventarioFabricante from './pages/InventarioFabricante';
import DashboardCauchera from './pages/DashboardCauchera';
import DashboardParticular from './pages/DashboardParticular';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function DashboardRedirect() {
  const { user } = useAuth();
  const role = user?.role;
  if (role === 'fabricante' || role === 'mayorista') return <DashboardFabricante />;
  if (role === 'cauchera') return <DashboardCauchera />;
  if (role === 'particular') return <DashboardParticular />;
  return <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-on-background">
        <Navbar />
        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/tiendas" element={<Tiendas />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route path="/fabricante/inventario" element={<InventarioFabricante />} />
            <Route path="/fabricante/dashboard" element={<DashboardFabricante />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
