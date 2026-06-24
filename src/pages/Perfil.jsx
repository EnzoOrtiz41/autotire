import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('info');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ nombre: user?.nombre || '', telefono: user?.telefono || '', direccion: user?.direccion || '' });

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/50 mb-3">person</span>
          <p className="text-on-surface-variant mb-4">Inicia sesión para ver tu perfil</p>
          <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    const allUsers = JSON.parse(localStorage.getItem('autotire_users') || '[]');
    const idx = allUsers.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      allUsers[idx].nombre = form.nombre;
      allUsers[idx].telefono = form.telefono;
      allUsers[idx].direccion = form.direccion;
      localStorage.setItem('autotire_users', JSON.stringify(allUsers));
      const sessionUser = { ...allUsers[idx] };
      delete sessionUser.password;
      localStorage.setItem('autotire_session', JSON.stringify(sessionUser));
    }
    setEditMode(false);
    window.location.reload();
  };

  const roleLabel = {
    particular: 'Conductor / Particular',
    cauchera: 'Cauchera / Taller',
    mayorista: 'Mayorista',
    fabricante: 'Fabricante',
  };

  const tabs = [
    { id: 'info', label: 'Datos de Cuenta', icon: 'person' },
    { id: 'seguridad', label: 'Seguridad', icon: 'lock' },
    { id: 'pago', label: 'Métodos de Pago', icon: 'credit_card' },
  ];

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 animate-fade-in">
        <h1 className="text-2xl font-display font-black mb-6">Mi Perfil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="card h-fit lg:sticky lg:top-24">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-on-primary text-2xl font-bold mx-auto mb-2">
                {user.nombre?.[0] || 'U'}
              </div>
              <h2 className="font-bold text-sm truncate">{user.nombre}</h2>
              <p className="text-xs text-on-surface-variant">{user.email}</p>
              <span className="badge-primary text-[10px] mt-1 inline-block">{roleLabel[user.role] || user.role}</span>
            </div>
            <div className="space-y-1">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    tab === t.id ? 'bg-primary-fixed/30 text-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'
                  }`}>
                  <span className="material-symbols-outlined text-lg">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="border-t border-outline-variant/20 mt-4 pt-4">
              <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-error hover:bg-error-container/20 transition-all">
                <span className="material-symbols-outlined text-lg">logout</span>
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {tab === 'info' && (
              <div className="card space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-lg">Datos de la Cuenta</h3>
                  <button onClick={() => setEditMode(!editMode)} className="btn-ghost text-sm">
                    <span className="material-symbols-outlined text-lg">{editMode ? 'close' : 'edit'}</span>
                    {editMode ? 'Cancelar' : 'Editar'}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Nombre / Razón Social', value: user.nombre, field: 'nombre' },
                    { label: 'Correo Electrónico', value: user.email, readOnly: true },
                    { label: user.role === 'particular' ? 'Cédula' : 'RIF', value: user.cedula || user.rif, readOnly: true },
                    { label: 'Teléfono', value: user.telefono, field: 'telefono' },
                  ].map(item => (
                    <div key={item.label}>
                      <label className="text-xs font-semibold text-on-surface-variant">{item.label}</label>
                      {editMode && !item.readOnly ? (
                        <input value={form[item.field]} onChange={e => setForm({...form, [item.field]: e.target.value})} className="input-field mt-1" />
                      ) : (
                        <p className="text-sm font-semibold mt-1">{item.value || '—'}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant">Dirección</label>
                  {editMode ? (
                    <input value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})} className="input-field mt-1" />
                  ) : (
                    <p className="text-sm font-semibold mt-1">{user.direccion || '—'}</p>
                  )}
                </div>
                {user.capacidad && (
                  <div>
                    <label className="text-xs font-semibold text-on-surface-variant">Capacidad</label>
                    <p className="text-sm font-semibold mt-1">{user.capacidad}</p>
                  </div>
                )}
                {editMode && (
                  <button onClick={handleSave} className="btn-primary">
                    <span className="material-symbols-outlined text-lg">save</span>
                    Guardar Cambios
                  </button>
                )}
              </div>
            )}

            {tab === 'seguridad' && (
              <div className="card space-y-4">
                <h3 className="font-display font-bold text-lg">Seguridad</h3>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant">Contraseña Actual</label>
                  <input type="password" className="input-field mt-1" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-on-surface-variant">Nueva Contraseña</label>
                    <input type="password" className="input-field mt-1" placeholder="Mín. 8 caracteres" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-on-surface-variant">Confirmar</label>
                    <input type="password" className="input-field mt-1" placeholder="Repite la contraseña" />
                  </div>
                </div>
                <button className="btn-primary">Actualizar Contraseña</button>
                <div className="border-t border-outline-variant/20 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">Autenticación de Dos Factores (2FA)</p>
                      <p className="text-xs text-on-surface-variant">Añade una capa extra de seguridad</p>
                    </div>
                    <span className="badge-secondary text-xs">Inactivo</span>
                  </div>
                </div>
              </div>
            )}

            {tab === 'pago' && (
              <div className="card space-y-4">
                <h3 className="font-display font-bold text-lg">Métodos de Pago</h3>
                {user.role === 'particular' ? (
                  <>
                    <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl text-primary">smartphone</span>
                        <div>
                          <p className="font-semibold text-sm">Pago Móvil</p>
                          <p className="text-xs text-on-surface-variant">Banco Provincial · 0414-XXX-XXXX</p>
                        </div>
                      </div>
                      <span className="badge-success text-xs">Predeterminado</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl text-primary">credit_card</span>
                        <div>
                          <p className="font-semibold text-sm">Tarjeta de Crédito</p>
                          <p className="text-xs text-on-surface-variant">Visa ·••• 4532</p>
                        </div>
                      </div>
                      <button className="btn-ghost text-xs">Editar</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl text-primary">account_balance</span>
                        <div>
                          <p className="font-semibold text-sm">Crédito Comercial</p>
                          <p className="text-xs text-on-surface-variant">Línea JIT · $5,000 disponibles</p>
                        </div>
                      </div>
                      <span className="badge-success text-xs">Activo</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface-container-highest rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl text-primary">receipt</span>
                        <div>
                          <p className="font-semibold text-sm">Facturación Electrónica</p>
                          <p className="text-xs text-on-surface-variant">RIF: {user.rif}</p>
                        </div>
                      </div>
                      <button className="btn-ghost text-xs">Descargar</button>
                    </div>
                  </>
                )}
                <button className="btn-secondary w-full text-sm">Agregar Método de Pago</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
