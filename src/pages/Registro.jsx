import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Registro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('particular');
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    cedula: '',
    rif: '',
    telefono: '',
    direccion: '',
    role: 'particular',
    tipoNegocio: 'cauchera',
    capacidad: '',
    vehiculo: { marca: '', modelo: '', anio: '', medida: '' },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleVehiculoChange = (field, value) => {
    setForm(prev => ({ ...prev, vehiculo: { ...prev.vehiculo, [field]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      let userData;
      if (tipo === 'particular') {
        userData = {
          nombre: form.nombre,
          email: form.email,
          password: form.password,
          role: 'particular',
          cedula: form.cedula,
          telefono: form.telefono,
          direccion: form.direccion,
          vehiculo: form.vehiculo.marca ? form.vehiculo : undefined,
        };
      } else {
        const role = form.tipoNegocio;
        userData = {
          nombre: form.nombre,
          email: form.email,
          password: form.password,
          role: role,
          rif: form.rif,
          telefono: form.telefono,
          direccion: form.direccion,
          capacidad: form.capacidad,
          ...(role === 'fabricante' ? {
            fabricanteId: form.nombre?.toLowerCase().replace(/[^a-z]/g, '_').slice(0, 20),
          } : {}),
        };
      }
      await register(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-surface-variant/50 to-background p-4 py-8">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 font-display font-black text-2xl mb-2">
            <svg viewBox="0 0 100 100" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#1C1C1C" stroke="#E65C19" strokeWidth="4"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="#E65C19" strokeWidth="3"/>
              <circle cx="50" cy="50" r="10" fill="#E65C19"/>
            </svg>
            AutoTire
          </div>
          <h1 className="text-xl font-display font-black">Crear Cuenta</h1>
          <p className="text-sm text-on-surface-variant mt-1">Selecciona tu tipo de perfil</p>
        </div>

        <div className="card p-6">
          {/* Tipo Selector */}
          <div className="flex bg-surface-container-highest rounded-xl p-1 mb-6">
            {[
              { value: 'particular', label: 'Conductor / Flota' },
              { value: 'empresa', label: 'Empresa / Negocio' },
            ].map(t => (
              <button key={t.value}
                onClick={() => setTipo(t.value)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  tipo === t.value ? 'bg-surface shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-error-container text-on-error-container text-sm">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}

            {/* Common fields */}
            <div>
              <label className="text-sm font-semibold mb-1 block">{tipo === 'particular' ? 'Nombre completo' : 'Razón Social'}</label>
              <input required value={form.nombre} onChange={e => handleChange('nombre', e.target.value)} className="input-field" placeholder={tipo === 'particular' ? 'Ej: María García' : 'Ej: Mi Taller C.A.'} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {tipo === 'particular' ? (
                <div>
                  <label className="text-sm font-semibold mb-1 block">Cédula</label>
                  <input required value={form.cedula} onChange={e => handleChange('cedula', e.target.value)} className="input-field" placeholder="V-12345678" />
                </div>
              ) : (
                <div>
                  <label className="text-sm font-semibold mb-1 block">RIF</label>
                  <input required value={form.rif} onChange={e => handleChange('rif', e.target.value)} className="input-field" placeholder="J-12345678-9" />
                </div>
              )}
              <div>
                <label className="text-sm font-semibold mb-1 block">Teléfono</label>
                <input required value={form.telefono} onChange={e => handleChange('telefono', e.target.value)} className="input-field" placeholder="+58 412-XXX-XXXX" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Dirección</label>
              <input required value={form.direccion} onChange={e => handleChange('direccion', e.target.value)} className="input-field" placeholder="Dirección fiscal / comercial" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-1 block">Correo electrónico</label>
                <input required type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className="input-field" placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Contraseña</label>
                <input required type="password" value={form.password} onChange={e => handleChange('password', e.target.value)} className="input-field" placeholder="Mín. 6 caracteres" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1 block">Confirmar Contraseña</label>
              <input required type="password" value={form.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)} className="input-field" placeholder="Repite la contraseña" />
            </div>

            {/* B2B Fields */}
            {tipo === 'empresa' && (
              <>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Tipo de negocio</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'cauchera', label: 'Cauchera / Taller' },
                      { value: 'mayorista', label: 'Mayorista' },
                      { value: 'fabricante', label: 'Fabricante' },
                    ].map(t => (
                      <button key={t.value} type="button"
                        onClick={() => handleChange('tipoNegocio', t.value)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border-2 transition-all ${
                          form.tipoNegocio === t.value
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-outline-variant text-on-surface-variant hover:border-outline'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Capacidad / Descripción</label>
                  <input value={form.capacidad} onChange={e => handleChange('capacidad', e.target.value)} className="input-field" placeholder="Ej: Distribución nacional, 5000 neumáticos/mes" />
                </div>
              </>
            )}

            {/* B2C Vehicle Fields */}
            {tipo === 'particular' && (
              <div className="p-4 rounded-xl bg-surface-container-higher space-y-3">
                <p className="text-xs font-semibold text-on-surface-variant">Información del vehículo (opcional)</p>
                <div className="grid grid-cols-3 gap-3">
                  <input value={form.vehiculo.marca} onChange={e => handleVehiculoChange('marca', e.target.value)} className="input-field text-sm" placeholder="Marca" />
                  <input value={form.vehiculo.modelo} onChange={e => handleVehiculoChange('modelo', e.target.value)} className="input-field text-sm" placeholder="Modelo" />
                  <input value={form.vehiculo.anio} onChange={e => handleVehiculoChange('anio', e.target.value)} className="input-field text-sm" placeholder="Año" />
                </div>
                <input value={form.vehiculo.medida} onChange={e => handleVehiculoChange('medida', e.target.value)} className="input-field text-sm" placeholder="Medida del neumático (ej: 205/55 R16)" />
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <p className="text-sm text-center mt-5 text-on-surface-variant">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
