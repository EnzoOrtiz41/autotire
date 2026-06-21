export default function Garage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-md space-y-md bg-background text-on-background">
      
      {/* Header & Quick Actions - Tamaños reducidos para un look más corporativo */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-sm border-b border-outline-variant/30 pb-sm">
        <div>
          {/* Título más compacto en lugar del gigantesco display-lg */}
          <h1 className="font-headline-md text-[28px] font-bold text-primary tracking-tight">Mi Garaje y Compras</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Gestiona tus vehículos, compras recientes y próximos mantenimientos técnicos.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
          {/* Botones más estilizados y menos gruesos */}
          <button className="flex-1 md:flex-none bg-secondary text-on-secondary rounded-lg px-4 py-2 font-label-md text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#b45309] transition-colors">
            <span className="material-symbols-outlined text-[18px]">directions_car</span> Añadir Vehículo
          </button>
          <button className="flex-1 md:flex-none bg-primary-container text-white border border-transparent rounded-lg px-4 py-2 font-label-md text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span> Agendar Servicio
          </button>
        </div>
      </header>

      {/* KPI Bento Grid - Tarjetas más compactas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-[11px] text-outline tracking-wider uppercase">Vehículo Principal</span>
            <span className="material-symbols-outlined text-[20px] text-secondary">directions_car</span>
          </div>
          <div className="mt-3">
            <div className="font-headline-sm text-[18px] text-primary font-bold">Toyota Corolla 2021</div>
            <div className="inline-block font-label-sm text-[11px] bg-surface-container text-primary font-bold px-2 py-1 rounded mt-2">
              MEDIDA: 205/55 R16
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-[11px] text-outline tracking-wider uppercase">Compras este año</span>
            <span className="material-symbols-outlined text-[20px] text-primary">shopping_bag</span>
          </div>
          <div className="mt-3">
            <div className="font-headline-sm text-[18px] text-primary font-bold">2 Pedidos Registrados</div>
            <div className="font-label-sm text-[12px] text-on-surface-variant mt-1">Última orden: <span className="font-bold text-primary font-mono">OCT 2023</span></div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-primary-container p-4 rounded-xl border border-transparent shadow-sm flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-[11px] text-on-primary-container tracking-wider uppercase">Servicio Sugerido</span>
            <span className="material-symbols-outlined text-[20px] text-secondary-container">build_circle</span>
          </div>
          <div className="mt-3">
            <div className="font-headline-sm text-[18px] text-white font-bold">Alineación y Balanceo</div>
            <div className="font-label-sm text-[12px] text-on-primary-container mt-1">Programación ideal: <span className="font-bold text-secondary-container font-mono">DIC 2023</span></div>
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Purchases List */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Filter Bar - Altura reducida */}
          <div className="bg-surface-container-lowest/90 backdrop-blur-xl border border-outline-variant/30 shadow-sm rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-grow w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline text-[20px]">search</span>
              <input className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg pl-9 pr-3 py-1.5 font-body-md text-[14px] focus:ring-1 focus:ring-secondary focus:border-secondary outline-none transition-all placeholder:text-[13px]" placeholder="Buscar en mis compras..." type="text"/>
            </div>
            <div className="flex w-full sm:w-auto shrink-0">
              <select className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-1.5 font-label-md text-[13px] focus:ring-1 focus:ring-secondary focus:border-secondary outline-none w-full">
                <option>Últimos 6 meses</option>
                <option>Período 2023</option>
                <option>Período 2022</option>
              </select>
            </div>
          </div>

          {/* Purchases Rows - Menos padding y miniaturas más pequeñas */}
          <div className="space-y-2.5">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 bg-surface-container font-label-sm text-[11px] text-outline tracking-wider rounded-lg border border-outline-variant/20">
              <div className="col-span-5">ARTÍCULO & FECHA DE COMPRA</div>
              <div className="col-span-2">CANTIDAD</div>
              <div className="col-span-3">ESTADO LOGÍSTICO</div>
              <div className="col-span-2 text-right">TOTAL</div>
            </div>

            {/* Row 1 */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-3 md:px-4 md:py-3 hover:shadow-sm transition-all grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-surface-container rounded flex items-center justify-center shrink-0 border border-outline-variant/20">
                  {/* ICONO REEMPLAZADO */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-outline">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <line x1="12" y1="2" x2="12" y2="4"></line>
                    <line x1="12" y1="20" x2="12" y2="22"></line>
                    <line x1="2" y1="12" x2="4" y2="12"></line>
                    <line x1="20" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
                    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>
                    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>
                    <line x1="17.66" y1="4.93" x2="19.07" y2="6.34"></line>
                  </svg>
                </div>
                <div>
                  <div className="font-headline-sm text-[14px] text-primary font-bold">Michelin Pilot Sport 4</div>
                  <div className="font-label-sm text-[11px] text-outline mt-0.5">COMPRA: <span className="font-bold">12 OCT 2023</span></div>
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="font-label-md text-[12px] text-primary bg-surface-container px-2 py-1 rounded">4 UNID.</span>
              </div>
              <div className="md:col-span-3">
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-label-sm text-[11px] uppercase font-bold border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Instalado
                </div>
              </div>
              <div className="md:col-span-2 text-left md:text-right font-label-md text-[14px] text-secondary font-bold">
                $500.00
              </div>
            </div>

            {/* Row 2 */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-3 md:px-4 md:py-3 hover:shadow-sm transition-all grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-surface-container rounded flex items-center justify-center shrink-0 border border-outline-variant/20">
                  {/* ICONO REEMPLAZADO */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-outline">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <line x1="12" y1="2" x2="12" y2="4"></line>
                    <line x1="12" y1="20" x2="12" y2="22"></line>
                    <line x1="2" y1="12" x2="4" y2="12"></line>
                    <line x1="20" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
                    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>
                    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>
                    <line x1="17.66" y1="4.93" x2="19.07" y2="6.34"></line>
                  </svg>
                </div>
                <div>
                  <div className="font-headline-sm text-[14px] text-primary font-bold">Bridgestone Dueler A/T</div>
                  <div className="font-label-sm text-[11px] text-outline mt-0.5">COMPRA: <span className="font-bold">05 AGO 2023</span></div>
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="font-label-md text-[12px] text-primary bg-surface-container px-2 py-1 rounded">2 UNID.</span>
              </div>
              <div className="md:col-span-3">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-label-sm text-[11px] uppercase font-bold border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Entregado
                </div>
              </div>
              <div className="md:col-span-2 text-left md:text-right font-label-md text-[14px] text-secondary font-bold">
                $280.00
              </div>
            </div>

            {/* Row 3 */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-3 md:px-4 md:py-3 hover:shadow-sm transition-all grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-surface-container rounded flex items-center justify-center shrink-0 border border-outline-variant/20">
                  {/* ICONO REEMPLAZADO */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-outline">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <line x1="12" y1="2" x2="12" y2="4"></line>
                    <line x1="12" y1="20" x2="12" y2="22"></line>
                    <line x1="2" y1="12" x2="4" y2="12"></line>
                    <line x1="20" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line>
                    <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line>
                    <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line>
                    <line x1="17.66" y1="4.93" x2="19.07" y2="6.34"></line>
                  </svg>
                </div>
                <div>
                  <div className="font-headline-sm text-[14px] text-primary font-bold">Pirelli Cinturato P7</div>
                  <div className="font-label-sm text-[11px] text-outline mt-0.5">COMPRA: <span className="font-bold">10 ENE 2023</span></div>
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="font-label-md text-[12px] text-primary bg-surface-container px-2 py-1 rounded">1 UNID.</span>
              </div>
              <div className="md:col-span-3">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-label-sm text-[11px] uppercase font-bold border border-blue-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Entregado
                </div>
              </div>
              <div className="md:col-span-2 text-left md:text-right font-label-md text-[14px] text-secondary font-bold">
                $95.00
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center py-2">
            <span className="font-label-sm text-[12px] text-on-surface-variant">Mostrando 1-3 de 15 compras</span>
            <div className="flex gap-1.5">
              <button className="px-2 py-1 border border-outline-variant/60 rounded bg-surface-container-lowest text-[11px] font-label-sm hover:bg-surface-container transition-colors disabled:opacity-40" disabled>ANT</button>
              <button className="px-2.5 py-1 border border-secondary rounded bg-secondary text-on-secondary text-[11px] font-label-sm font-bold">1</button>
              <button className="px-2.5 py-1 border border-outline-variant/60 rounded bg-surface-container-lowest text-[11px] font-label-sm hover:bg-surface-container transition-colors">2</button>
              <button className="px-2 py-1 border border-outline-variant/60 rounded bg-surface-container-lowest text-[11px] font-label-sm hover:bg-surface-container transition-colors">SIG</button>
            </div>
          </div>
        </div>

        {/* Right Column: Maintenance & Hardware Widgets */}
        <div className="space-y-4">
          
          {/* Maintenance Reminder Widget */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-4 hover:shadow-sm transition-all">
            <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-4">Estado del Componente</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-label-sm text-[11px] mb-1.5">
                  <span>VIDA ÚTIL (MICHELIN PS4)</span>
                  <span className="font-bold text-secondary">80% RESTANTE</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="font-label-sm text-[10px] text-outline mt-1.5 font-bold uppercase tracking-wider">Aprox. 32,000 KM de rodaje</p>
              </div>
              
              <div className="border-t border-outline-variant/30 pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-outline text-[18px] mt-0.5">radio_button_unchecked</span>
                    <div>
                      <div className="font-headline-sm text-[13px] font-bold text-primary">Rotación Obligatoria</div>
                      <div className="font-label-sm text-[11px] text-outline mt-0.5">Recomendado en <span className="font-bold text-primary">3,000 km</span></div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">check_circle</span>
                    <div>
                      <div className="font-headline-sm text-[13px] font-bold text-primary">Presión de Inflado</div>
                      <div className="font-label-sm text-[11px] text-outline mt-0.5">Revisado hace 2 semanas</div>
                    </div>
                  </li>
                </ul>
              </div>
              <button className="w-full mt-2 bg-surface border border-outline-variant text-primary font-headline-sm text-[13px] font-bold rounded-lg py-2 hover:bg-surface-container transition-colors">
                Registrar Servicio
              </button>
            </div>
          </div>

          {/* Recommended Accessories Widget */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-4 hover:shadow-sm transition-all">
            <h3 className="font-headline-sm text-[16px] text-primary font-bold mb-3">Accesorios Corolla</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between py-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-surface-container rounded flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]">tire_repair</span>
                  </div>
                  <div>
                    <div className="font-headline-sm text-[13px] font-bold text-primary">Kit de Reparación</div>
                    <div className="font-label-sm text-[10px] text-outline uppercase mt-0.5">Emergencias</div>
                  </div>
                </div>
                <span className="font-label-md text-[13px] text-secondary font-bold">$24.99</span>
              </li>
              <li className="flex items-center justify-between py-2 border-b border-outline-variant/20 border-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-surface-container rounded flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[18px]">speed</span>
                  </div>
                  <div>
                    <div className="font-headline-sm text-[13px] font-bold text-primary">Medidor Digital</div>
                    <div className="font-label-sm text-[10px] text-outline uppercase mt-0.5">Calibración</div>
                  </div>
                </div>
                <span className="font-label-md text-[13px] text-secondary font-bold">$15.50</span>
              </li>
            </ul>
            <button className="w-full mt-3 text-secondary font-headline-sm text-[12px] font-bold hover:underline text-center block">
              Ver todos los accesorios
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}