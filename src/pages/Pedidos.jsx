import { Link } from 'react-router-dom';

export default function Pedidos() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-lg flex flex-col gap-lg bg-background text-on-background">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md border-b border-surface-variant pb-md">
        <div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Mis Pedidos</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Historial de compras y estado de envíos.</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-sm">
          <select className="bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md rounded px-md py-sm focus:ring-secondary focus:border-secondary outline-none transition-all">
            <option>Últimos 3 meses</option>
            <option>Últimos 6 meses</option>
            <option>Año 2023</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-md">
        
        {/* Order Card 1: En Camino */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(4,22,39,0.05)] hover:shadow-[0px_10px_30px_rgba(4,22,39,0.15)] transition-shadow duration-300 border border-surface-variant overflow-hidden flex flex-col md:flex-row">
          {/* Order Details (Left) */}
          <div className="p-md flex-grow flex flex-col gap-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-xs">Orden ID</span>
                <span className="font-label-md text-label-md font-bold text-primary">#ORD-2405-A98B</span>
              </div>
              <div className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-sm py-xs rounded flex items-center gap-xs font-bold">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>local_shipping</span>
                En Camino
              </div>
            </div>
            <div className="text-on-surface-variant font-body-md text-body-md">
              Fecha: 15 May, 2024
            </div>
            <div className="mt-sm pt-sm border-t border-surface-variant flex items-center gap-md">
              <div className="w-16 h-16 bg-surface-container rounded flex items-center justify-center shrink-0">
                <img 
                  className="object-cover w-full h-full rounded" 
                  alt="Michelin Pilot Sport 4S" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0DqH0pzGkxBrp9GpmqV487gyoez7byyhoaEpDV4inYstdzRs_EyrZrm_7SPaarOrOFOWDndpHiLqvN7P6RDN3h_ft5x1ctSJRPK57tYdcOo_YSe_n9767g--hRU0le4bU86FN1xqnTah-tkRWw6nvN9TXLse5drcI655DQulMnMnOpJ0FfEjNeieW05wiO2VjjB9QC6ND9fz0dk6gINAi_YQQ6Y3KqjVhhFzybJd5TxZUXUNGHE3GJgjGG1gfbhHbcnma8ESjrTc" 
                />
              </div>
              <div>
                <p className="font-body-md text-body-md font-bold text-primary">4x Michelin Pilot Sport 4S</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">245/40 ZR18 97Y</p>
              </div>
            </div>
          </div>
          {/* Action & Total (Right) */}
          <div className="bg-surface-container-low p-md md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-surface-variant">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-xs">Total</span>
              <span className="font-headline-md text-headline-md font-bold text-primary">$840.00</span>
            </div>
            <div className="flex flex-col gap-sm mt-md">
              <button className="w-full bg-secondary text-on-secondary font-body-md text-body-md font-bold py-sm rounded hover:bg-secondary-container active:scale-[0.98] transition-all">
                Rastrear
              </button>
              <button className="w-full bg-transparent border border-outline-variant text-on-surface-variant font-body-md text-body-md font-bold py-sm rounded hover:bg-surface-container active:scale-[0.98] transition-all">
                Ver Recibo
              </button>
            </div>
          </div>
        </div>

        {/* Order Card 2: Entregado */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(4,22,39,0.05)] hover:shadow-[0px_10px_30px_rgba(4,22,39,0.15)] transition-shadow duration-300 border border-surface-variant overflow-hidden flex flex-col md:flex-row">
          {/* Order Details (Left) */}
          <div className="p-md flex-grow flex flex-col gap-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-xs">Orden ID</span>
                <span className="font-label-md text-label-md font-bold text-primary">#ORD-2311-C45T</span>
              </div>
              <div className="bg-surface-container-highest text-on-surface font-label-sm text-label-sm px-sm py-xs rounded flex items-center gap-xs font-bold">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                Entregado
              </div>
            </div>
            <div className="text-on-surface-variant font-body-md text-body-md">
              Fecha: 02 Nov, 2023
            </div>
            <div className="mt-sm pt-sm border-t border-surface-variant flex items-center gap-md">
              <div className="w-16 h-16 bg-surface-container rounded flex items-center justify-center shrink-0">
                <img 
                  className="object-cover w-full h-full rounded" 
                  alt="Pirelli Scorpion All Terrain Plus" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZiWVSBHO6u72dhvf-Hl-8CROSU_-a_9bPfr4WhOYdKXZm728DzT4704tmL7RhbZ8GGwc3z_J_ko8GlotKUI5R7tA61NXASU3AEU1VKA9MmonpNPxkc4k9F1vBlsrFGq3PaH6SQQ2w6_LXGpDfhIMALAlJ6ol3-jvc5mMWNgaBFvJZR0sGeFTy4ZmU6of3QsAj7T2PW8XxONCaDtFBdVZO2Ehf-_1awcp_G9efHY757bghpBEiUZjnUoTTA91_sjS9dhF0jNjuxvU" 
                />
              </div>
              <div>
                <p className="font-body-md text-body-md font-bold text-primary">2x Pirelli Scorpion All Terrain Plus</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">265/70 R17 115T</p>
              </div>
            </div>
          </div>
          {/* Action & Total (Right) */}
          <div className="bg-surface-container-low p-md md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-surface-variant">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-xs">Total</span>
              <span className="font-headline-md text-headline-md font-bold text-primary">$415.50</span>
            </div>
            <div className="flex flex-col gap-sm mt-md">
              {/* ¡AQUÍ ESTÁ LA MAGIA! Cambiado a text-on-primary (Blanco) */}
              <button className="w-full bg-primary-container text-on-primary font-body-md text-body-md font-bold py-sm rounded hover:bg-primary active:scale-[0.98] transition-all">
                Comprar de nuevo
              </button>
              <button className="w-full bg-transparent border border-outline-variant text-on-surface-variant font-body-md text-body-md font-bold py-sm rounded hover:bg-surface-container active:scale-[0.98] transition-all">
                Ver Recibo
              </button>
            </div>
          </div>
        </div>

        {/* Order Card 3: Procesando */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(4,22,39,0.05)] hover:shadow-[0px_10px_30px_rgba(4,22,39,0.15)] transition-shadow duration-300 border border-surface-variant overflow-hidden flex flex-col md:flex-row">
          {/* Order Details (Left) */}
          <div className="p-md flex-grow flex flex-col gap-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-xs">Orden ID</span>
                <span className="font-label-md text-label-md font-bold text-primary">#ORD-2405-Z12X</span>
              </div>
              <div className="bg-secondary-fixed-dim text-on-secondary-fixed font-label-sm text-label-sm px-sm py-xs rounded flex items-center gap-xs font-bold">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>pending</span>
                Procesando
              </div>
            </div>
            <div className="text-on-surface-variant font-body-md text-body-md">
              Fecha: 24 May, 2024
            </div>
            <div className="mt-sm pt-sm border-t border-surface-variant flex items-center gap-md">
              <div className="w-16 h-16 bg-surface-container rounded flex items-center justify-center shrink-0">
                <img 
                  className="object-cover w-full h-full rounded" 
                  alt="Goodyear Eagle F1 SuperSport" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA34CKYOt31bxwCOba9QezMtM05Q-WToWP7sroUNzKxTsOddyRJrW6r6coKZ4i3_DPhtHe7QLrqEYRx6tbTyE1JQlCvPvaSzFQl1L0-OMrTP1kDaFjPr-mW4W5WbJ-8AiRfsC06zf-yl27ALNIu2iOE4XKCc1Q5nJMCigL0l3IJ_Laf7MPXuma_eBpF_LEGEF6lj5ig6rvb19ydJkfbWh-a2p-p1Tp8zZ4ncDZPxab2-srkB5hBS46n8wC_qZaWHrW9-EKEnN3cbc" 
                />
              </div>
              <div>
                <p className="font-body-md text-body-md font-bold text-primary">1x Goodyear Eagle F1</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">225/45 R17 91W</p>
              </div>
            </div>
          </div>
          {/* Action & Total (Right) */}
          <div className="bg-surface-container-low p-md md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-surface-variant">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-xs">Total</span>
              <span className="font-headline-md text-headline-md font-bold text-primary">$180.00</span>
            </div>
            <div className="flex flex-col gap-sm mt-md">
              {/* Añadido un botón principal aquí para mantener la consistencia */}
              <button className="w-full bg-primary-container text-on-primary font-body-md text-body-md font-bold py-sm rounded hover:bg-primary active:scale-[0.98] transition-all">
                Detalles
              </button>
              <button className="w-full bg-transparent border border-outline-variant text-on-surface-variant font-body-md text-body-md font-bold py-sm rounded hover:bg-surface-container active:scale-[0.98] transition-all">
                Ver Recibo
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}