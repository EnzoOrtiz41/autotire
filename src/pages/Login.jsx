import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (email, password) => {
    setEmail(email);
    setPassword(password);
    setTimeout(() => document.getElementById('login-form').requestSubmit(), 100);
  };

  const testAccounts = [
    { label: 'Cliente', email: 'juan.perez@email.com', role: 'particular', color: 'bg-tertiary-container text-on-tertiary-container' },
    { label: 'Cauchera', email: 'tienda.chacao@email.com', role: 'cauchera', color: 'bg-primary/10 text-primary' },
    { label: 'Fabricante', email: 'robustires.ve@email.com', role: 'fabricante', color: 'bg-secondary/10 text-secondary' },
  ];

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-surface-variant/50 to-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 font-display font-black text-2xl mb-2">
            <svg viewBox="0 0 100 100" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#1C1C1C" stroke="#E65C19" strokeWidth="4"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="#E65C19" strokeWidth="3"/>
              <circle cx="50" cy="50" r="10" fill="#E65C19"/>
            </svg>
            AutoTire
          </div>
          <h1 className="text-xl font-display font-black">Iniciar Sesión</h1>
          <p className="text-sm text-on-surface-variant mt-1">Accede a tu panel personalizado</p>
        </div>

        <div className="card p-6">
          <form id="login-form" onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-error-container text-on-error-container text-sm">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}
            <div>
              <label className="text-sm font-semibold mb-1 block">Correo electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-outline-variant/30">
            <p className="text-xs font-semibold text-on-surface-variant text-center mb-3">Cuentas de prueba rápida</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {testAccounts.map(acc => (
                <button
                  key={acc.role}
                  onClick={() => quickLogin(acc.email, 'clave123')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 ${acc.color}`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-center mt-5 text-on-surface-variant">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-primary font-bold hover:underline">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
