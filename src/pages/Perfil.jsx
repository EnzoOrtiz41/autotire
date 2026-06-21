export default function Perfil() {
  return (
    <main className="flex-grow w-full px-gutter py-lg max-w-container-max mx-auto">
      <div className="mb-lg">
        <h1 className="font-display-lg text-display-lg text-primary tracking-tighter">Mi Perfil</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Gestione su información personal, seguridad y preferencias.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        
        {/* Sidebar Navigation (Desktop) */}
        <aside className="md:col-span-3 space-y-sm">
          <div className="bg-surface-container-lowest rounded-xl shadow-heavy p-md border border-outline-variant/30 sticky top-[100px]">
            <div className="flex items-center gap-sm mb-md pb-sm border-b border-outline-variant/30">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm">
                J
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-primary">Juan Pérez</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">V-12345678</div>
              </div>
            </div>
            
            <nav className="flex flex-col gap-xs font-label-md text-label-md">
              <a className="flex items-center gap-sm px-sm py-sm rounded bg-surface-container text-primary font-bold" href="#info">
                <span className="material-symbols-outlined text-[20px]">person</span> Información Personal
              </a>
              <a className="flex items-center gap-sm px-sm py-sm rounded text-on-surface-variant hover:bg-surface-container-low transition-colors" href="#security">
                <span className="material-symbols-outlined text-[20px]">lock</span> Seguridad
              </a>
              <a className="flex items-center gap-sm px-sm py-sm rounded text-on-surface-variant hover:bg-surface-container-low transition-colors" href="#billing">
                <span className="material-symbols-outlined text-[20px]">credit_card</span> Facturación
              </a>
              <a className="flex items-center gap-sm px-sm py-sm rounded text-on-surface-variant hover:bg-surface-container-low transition-colors" href="#prefs">
                <span className="material-symbols-outlined text-[20px]">notifications</span> Preferencias
              </a>
            </nav>
          </div>
        </aside>

        {/* Content Area (Bento Layout) */}
        <div className="md:col-span-9 flex flex-col gap-lg">
          
          {/* Section: Info General */}
          <section className="bg-surface-container-lowest rounded-xl shadow-heavy p-lg border border-outline-variant/30" id="info">
            <h2 className="font-headline-md text-headline-md text-primary mb-md border-b-2 border-secondary inline-block pb-xs">Información Personal</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-md mt-sm">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">Nombre Completo</label>
                <input className="bg-surface px-sm py-sm rounded border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary font-body-md text-body-md text-primary outline-none transition-all" type="text" defaultValue="Juan Pérez" />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">Documento de Identidad</label>
                <input className="bg-surface px-sm py-sm rounded border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary font-label-md text-label-md text-primary outline-none transition-all" readOnly type="text" defaultValue="V-12345678" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">Dirección de Envío</label>
                <input className="bg-surface px-sm py-sm rounded border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary font-body-md text-body-md text-primary outline-none transition-all" type="text" defaultValue="Av. Bolívar, Res. El Parque, Apto 4B, Valencia, Edo. Carabobo" />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">Teléfono de Contacto</label>
                <input className="bg-surface px-sm py-sm rounded border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary font-label-md text-label-md text-primary outline-none transition-all" type="tel" defaultValue="+58 414 123 4567" />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">Correo Electrónico</label>
                <input className="bg-surface px-sm py-sm rounded border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary font-body-md text-body-md text-primary outline-none transition-all" type="email" defaultValue="juan.perez@email.com" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-sm">
                <button className="bg-secondary text-on-secondary font-headline-sm text-headline-sm px-md py-sm rounded font-bold hover:bg-secondary-container transition-colors shadow-md" type="button">Actualizar Datos</button>
              </div>
            </form>
          </section>

          {/* Section: Seguridad */}
          <section className="bg-surface-container-lowest rounded-xl shadow-heavy p-lg border border-outline-variant/30" id="security">
            <h2 className="font-headline-md text-headline-md text-primary mb-md border-b-2 border-secondary inline-block pb-xs">Seguridad y Acceso</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mt-sm">
              
              {/* Password Change */}
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">Cambiar Contraseña</h3>
                <form className="flex flex-col gap-sm">
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">Contraseña Actual</label>
                    <input className="bg-surface px-sm py-sm rounded border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary font-label-md text-label-md text-primary outline-none transition-all" placeholder="••••••••" type="password" />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant">Nueva Contraseña</label>
                    <input className="bg-surface px-sm py-sm rounded border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary font-label-md text-label-md text-primary outline-none transition-all" placeholder="••••••••" type="password" />
                  </div>
                  <button className="bg-primary text-on-primary font-label-md text-label-md px-md py-sm rounded mt-xs hover:bg-on-primary-fixed-variant transition-colors self-start" type="button">Actualizar Credenciales</button>
                </form>
              </div>
              
              {/* 2FA */}
              <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="material-symbols-outlined text-secondary">shield_lock</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary">Autenticación de 2 Factores</h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-md">Añada una capa extra de seguridad requiriendo un código temporal al iniciar sesión.</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-bold text-on-surface-variant">Estado: <span className="text-error">Inactivo</span></span>
                  <button className="border border-primary text-primary bg-transparent font-label-md text-label-md px-md py-sm rounded hover:bg-primary hover:text-on-primary transition-colors" type="button">Activar 2FA</button>
                </div>
              </div>

            </div>
          </section>

          {/* Section: Facturación & Pagos */}
          <section className="bg-surface-container-lowest rounded-xl shadow-heavy p-lg border border-outline-variant/30" id="billing">
            <div className="flex justify-between items-center mb-md border-b-2 border-secondary pb-xs">
              <h2 className="font-headline-md text-headline-md text-primary">Métodos de Pago</h2>
              <button className="text-secondary hover:text-secondary-container font-label-md text-label-md flex items-center gap-xs" type="button">
                <span className="material-symbols-outlined text-[18px]">add</span> Añadir Nuevo
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mt-sm">
              
              {/* Card 1 */}
              <div className="border border-outline-variant rounded-lg p-md relative overflow-hidden bg-surface flex flex-col justify-between h-[120px]">
                <div className="flex justify-between items-start">
                  <div className="font-headline-sm text-headline-sm text-primary tracking-widest">**** **** **** 4242</div>
                  <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-xs py-[2px] rounded uppercase">Principal</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="font-label-md text-label-md text-on-surface-variant">Exp: 12/26</div>
                  <span className="material-symbols-outlined text-outline">credit_card</span>
                </div>
              </div>
              
              {/* Digital Wallet Info */}
              <div className="border border-outline-variant rounded-lg p-md bg-surface flex flex-col justify-between h-[120px]">
                <div className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-primary">Billetera Digital</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Pago Móvil / Zelle</div>
                  </div>
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant truncate">Asociado a juan.perez@email.com</div>
              </div>

            </div>
          </section>

          {/* Section: Preferencias */}
          <section className="bg-surface-container-lowest rounded-xl shadow-heavy p-lg border border-outline-variant/30" id="prefs">
            <h2 className="font-headline-md text-headline-md text-primary mb-md border-b-2 border-secondary inline-block pb-xs">Preferencias de Notificación</h2>
            <div className="space-y-sm mt-sm">
              <div className="flex items-center justify-between p-sm hover:bg-surface-container-low rounded transition-colors">
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary text-[16px]">Actualizaciones de Pedidos</div>
                  <div className="font-body-md text-body-md text-on-surface-variant text-[14px]">Recibir alertas sobre el estado de despacho de neumáticos.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-sm hover:bg-surface-container-low rounded transition-colors border-t border-outline-variant/30">
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary text-[16px]">Alertas de Inventario</div>
                  <div className="font-body-md text-body-md text-on-surface-variant text-[14px]">Avisos cuando el stock de sus medidas frecuentes sea bajo.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-sm hover:bg-surface-container-low rounded transition-colors border-t border-outline-variant/30">
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary text-[16px]">Ofertas y Promociones</div>
                  <div className="font-body-md text-body-md text-on-surface-variant text-[14px]">Promociones especiales para compras por volumen.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-outline-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}