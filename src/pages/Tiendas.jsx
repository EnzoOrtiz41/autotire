import { Link } from 'react-router-dom';

export default function Tiendas() {
  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e1e3e4; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c4c6cd; }
      `}</style>

      <main className="flex-1 w-full max-w-container-max mx-auto px-gutter py-lg flex flex-col md:flex-row gap-gutter bg-background text-on-background">
        
        {/* Left Panel: List & Search */}
        <section className="w-full md:w-1/3 lg:w-2/5 flex flex-col gap-md h-[calc(100vh-140px)]">
          <div className="mb-sm">
            <h1 className="font-display-lg-mobile md:font-display-lg text-[32px] md:text-[40px] font-bold text-primary mb-2 tracking-tight">Tiendas Aliadas</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Encuentra el taller especializado más cercano para la instalación y servicio de tus neumáticos.</p>
          </div>

          {/* Filter/Search Box */}
          <div className="bg-surface-container-lowest/90 backdrop-blur-xl border border-outline-variant/30 shadow-sm p-4 rounded-xl relative z-10">
            <div className="relative flex items-center mb-4">
              <span className="material-symbols-outlined absolute left-3 text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>my_location</span>
              <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant/50 bg-surface focus:border-secondary focus:ring-1 focus:ring-secondary font-body-md text-[14px] transition-all outline-none" placeholder="Filtrar por ciudad o zona (ej. Caracas)" type="text" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-1 bg-primary-container text-on-primary rounded font-label-sm text-[12px] hover:bg-primary transition-colors">Caracas</button>
              <button className="px-3 py-1 bg-surface-container text-on-surface rounded border border-outline-variant/50 font-label-sm text-[12px] hover:bg-surface-container-high transition-colors">Valencia</button>
              <button className="px-3 py-1 bg-surface-container text-on-surface rounded border border-outline-variant/50 font-label-sm text-[12px] hover:bg-surface-container-high transition-colors">Maracaibo</button>
            </div>
          </div>

          {/* Locations List (Scrollable) */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            
            {/* Location Card 1 */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 hover:shadow-sm transition-all relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-sm text-[16px] font-bold text-primary">Servicauchos Las Mercedes</h3>
                <span className="bg-primary-container text-on-primary px-2 py-1 rounded-[4px] font-label-sm text-[11px] flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[14px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8
                </span>
              </div>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>map</span>
                Av. Principal Las Mercedes, Caracas
              </p>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                +58 212-555-0198
              </p>
              <div className="flex gap-2 mt-4 pt-4 border-t border-outline-variant/30">
                <button className="flex-1 bg-secondary text-on-secondary py-2 rounded-lg font-headline-sm text-[13px] font-bold hover:bg-[#b45309] transition-colors flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>directions</span> Ver Ruta
                </button>
                <button className="p-2 border border-primary-container text-primary-container rounded-lg hover:bg-primary-container hover:text-on-primary transition-colors" title="Ver en Mapa">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                </button>
              </div>
            </div>

            {/* Location Card 2 */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 hover:shadow-sm transition-all relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-sm text-[16px] font-bold text-primary">AutoCentro Chacao</h3>
                <span className="bg-surface-container text-on-surface px-2 py-1 rounded-[4px] font-label-sm text-[11px] flex items-center gap-1 font-bold border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[14px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.5
                </span>
              </div>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>map</span>
                Calle Élice, Chacao, Caracas
              </p>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                +58 212-555-0234
              </p>
              <div className="flex gap-2 mt-4 pt-4 border-t border-outline-variant/30">
                <button className="flex-1 bg-transparent border border-secondary text-secondary py-2 rounded-lg font-headline-sm text-[13px] font-bold hover:bg-secondary/10 transition-colors flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>directions</span> Ver Ruta
                </button>
                <button className="p-2 border border-primary-container text-primary-container rounded-lg hover:bg-primary-container hover:text-on-primary transition-colors" title="Ver en Mapa">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                </button>
              </div>
            </div>

            {/* Location Card 3 */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 hover:shadow-sm transition-all relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-sm text-[16px] font-bold text-primary">ProTires Bello Monte</h3>
                <span className="bg-surface-container text-on-surface px-2 py-1 rounded-[4px] font-label-sm text-[11px] flex items-center gap-1 font-bold border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[14px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.2
                </span>
              </div>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>map</span>
                Av. Caurimare, Colinas de Bello Monte
              </p>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>call</span>
                +58 212-555-0888
              </p>
              <div className="flex gap-2 mt-4 pt-4 border-t border-outline-variant/30">
                <button className="flex-1 bg-transparent border border-secondary text-secondary py-2 rounded-lg font-headline-sm text-[13px] font-bold hover:bg-secondary/10 transition-colors flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>directions</span> Ver Ruta
                </button>
                <button className="p-2 border border-primary-container text-primary-container rounded-lg hover:bg-primary-container hover:text-on-primary transition-colors" title="Ver en Mapa">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Right Panel: Mapa interactivo sin API Key */}
        <section className="hidden md:block w-2/3 lg:w-3/5 h-[calc(100vh-140px)] relative rounded-xl overflow-hidden border border-outline-variant/50 bg-surface-container-high shadow-sm">
          <iframe
            title="Mapa de Caracas"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62771.95420364377!2d-66.9146249!3d10.4880104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a58adcd82bb39%3A0x93dd2eae44488484!2sCaracas%2C%20Distrito%20Capital!5e0!3m2!1ses!2sve!4v1710000000000!5m2!1ses!2sve"
            className="w-full h-full border-0 grayscale contrast-115 brightness-95"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

      </main>
    </>
  );
}