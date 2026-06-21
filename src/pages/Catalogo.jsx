export default function Catalogo() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-lg flex flex-col md:flex-row gap-lg bg-background text-on-background">
      
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/50">
          <h3 className="font-headline-sm text-headline-sm mb-sm text-primary">Filtros</h3>
          
          {/* Tipo de Vehículo */}
          <div className="mb-md">
            <h4 className="font-label-md text-label-md text-on-surface-variant mb-xs">Tipo de Vehículo</h4>
            <div className="flex flex-col gap-xs">
              <label className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-1 rounded transition-colors">
                <input className="form-checkbox h-4 w-4 text-secondary rounded-[4px] border-outline-variant focus:ring-secondary" type="checkbox" />
                <span className="font-body-md text-body-md text-on-surface">Sedán</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-1 rounded transition-colors">
                <input className="form-checkbox h-4 w-4 text-secondary rounded-[4px] border-outline-variant focus:ring-secondary" type="checkbox" />
                <span className="font-body-md text-body-md text-on-surface">SUV</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-1 rounded transition-colors">
                <input className="form-checkbox h-4 w-4 text-secondary rounded-[4px] border-outline-variant focus:ring-secondary" type="checkbox" />
                <span className="font-body-md text-body-md text-on-surface">Camioneta</span>
              </label>
            </div>
          </div>

          <div className="h-px w-full bg-outline-variant/30 my-sm"></div>
          
          {/* Marca */}
          <div className="mb-md">
            <h4 className="font-label-md text-label-md text-on-surface-variant mb-xs flex justify-between items-center cursor-pointer">
              Marca <span className="material-symbols-outlined text-[18px]">expand_less</span>
            </h4>
            <div className="flex flex-col gap-xs">
              <label className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-1 rounded transition-colors">
                <input className="form-checkbox h-4 w-4 text-secondary rounded-[4px] border-outline-variant focus:ring-secondary" type="checkbox" />
                <span className="font-body-md text-body-md text-on-surface">Bridgestone</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-1 rounded transition-colors">
                <input className="form-checkbox h-4 w-4 text-secondary rounded-[4px] border-outline-variant focus:ring-secondary" type="checkbox" />
                <span className="font-body-md text-body-md text-on-surface">Michelin</span>
              </label>
              <label className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-1 rounded transition-colors">
                <input className="form-checkbox h-4 w-4 text-secondary rounded-[4px] border-outline-variant focus:ring-secondary" type="checkbox" />
                <span className="font-body-md text-body-md text-on-surface">Continental</span>
              </label>
            </div>
          </div>

          <div className="h-px w-full bg-outline-variant/30 my-sm"></div>
          
          {/* Rango de Precio */}
          <div className="mb-sm">
            <h4 className="font-label-md text-label-md text-on-surface-variant mb-xs">Rango de Precio</h4>
            <input className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-secondary" max="500" min="0" type="range" defaultValue="500" />
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mt-2">
              <span>$0</span>
              <span>$500+</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Product Area */}
      <div className="flex-grow flex flex-col gap-md">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-sm mb-sm">
          <h2 className="font-headline-md text-headline-md text-primary tracking-tight">Encuentra los neumáticos ideales para tu vehículo</h2>
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-full font-body-md text-body-md focus:ring-1 focus:ring-secondary focus:border-secondary outline-none transition-shadow shadow-sm" placeholder="Buscar medida..." type="text" />
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          
          {/* Card 1: Bridgestone */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col border border-outline-variant/30 hover:shadow-[0px_10px_30px_rgba(4,22,39,0.15)] transition-shadow duration-300">
            <div className="h-48 bg-surface-container flex items-center justify-center p-md">
              <img className="object-contain h-full drop-shadow-xl hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1590840131494-1b1ebec9a41b?auto=format&fit=crop&q=80&w=400" alt="Bridgestone Potenza" />
            </div>
            <div className="p-md flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-xs">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Bridgestone Potenza</h3>
                <span className="font-headline-sm text-headline-sm text-secondary font-bold">$120.00</span>
              </div>
              <div className="flex justify-between items-center mb-sm">
                <span className="font-label-md text-label-md bg-surface-container-high text-on-surface px-2 py-1 rounded">225/45 R17</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Bs. 4,320.00</span>
              </div>
              
              {/* Tech Chips */}
              <div className="flex gap-xs mb-md">
                <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-1 rounded-[4px] uppercase tracking-wider">Performance</span>
                <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-1 rounded-[4px] uppercase tracking-wider">UHP</span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-xs mb-md border-t border-outline-variant/30 pt-sm mt-auto">
                <div>
                  <div className="font-label-sm text-label-sm text-outline mb-1">Treadwear</div>
                  <div className="font-label-md text-label-md text-primary font-bold">280</div>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm text-outline mb-1">Traction</div>
                  <div className="font-label-md text-label-md text-primary font-bold">AA</div>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm text-outline mb-1">Temperature</div>
                  <div className="font-label-md text-label-md text-primary font-bold">A</div>
                </div>
              </div>

              <button className="w-full bg-secondary text-on-secondary font-headline-sm text-[16px] py-2 px-4 rounded-lg hover:bg-[#b45309] transition-colors font-bold flex items-center justify-center gap-sm">
                Agregar al Carrito <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              </button>
            </div>
          </div>

          {/* Card 2: Michelin */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col border border-outline-variant/30 hover:shadow-[0px_10px_30px_rgba(4,22,39,0.15)] transition-shadow duration-300">
            <div className="h-48 bg-surface-container flex items-center justify-center p-md">
              <img className="object-contain h-full drop-shadow-xl hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=400" alt="Michelin Pilot Sport 4" />
            </div>
            <div className="p-md flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-xs">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Michelin Pilot Sport 4</h3>
                <span className="font-headline-sm text-headline-sm text-secondary font-bold">$180.00</span>
              </div>
              <div className="flex justify-between items-center mb-sm">
                <span className="font-label-md text-label-md bg-surface-container-high text-on-surface px-2 py-1 rounded">245/40 R18</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Bs. 6,480.00</span>
              </div>
              
              <div className="flex gap-xs mb-md">
                <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-1 rounded-[4px] uppercase tracking-wider">Sport</span>
                <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-1 rounded-[4px] uppercase tracking-wider">UHP</span>
              </div>

              <div className="grid grid-cols-3 gap-xs mb-md border-t border-outline-variant/30 pt-sm mt-auto">
                <div>
                  <div className="font-label-sm text-label-sm text-outline mb-1">Treadwear</div>
                  <div className="font-label-md text-label-md text-primary font-bold">320</div>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm text-outline mb-1">Traction</div>
                  <div className="font-label-md text-label-md text-primary font-bold">AA</div>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm text-outline mb-1">Temperature</div>
                  <div className="font-label-md text-label-md text-primary font-bold">A</div>
                </div>
              </div>

              <button className="w-full bg-secondary text-on-secondary font-headline-sm text-[16px] py-2 px-4 rounded-lg hover:bg-[#b45309] transition-colors font-bold flex items-center justify-center gap-sm">
                Agregar al Carrito <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              </button>
            </div>
          </div>

          {/* Card 3: Continental */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col border border-outline-variant/30 hover:shadow-[0px_10px_30px_rgba(4,22,39,0.15)] transition-shadow duration-300">
            <div className="h-48 bg-surface-container flex items-center justify-center p-md">
              <img className="object-contain h-full drop-shadow-xl hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400" alt="Continental WinterContact" />
            </div>
            <div className="p-md flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-xs">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Continental WinterContact</h3>
                <span className="font-headline-sm text-headline-sm text-secondary font-bold">$105.00</span>
              </div>
              <div className="flex justify-between items-center mb-sm">
                <span className="font-label-md text-label-md bg-surface-container-high text-on-surface px-2 py-1 rounded">215/55 R16</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Bs. 3,780.00</span>
              </div>
              
              <div className="flex gap-xs mb-md">
                <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-1 rounded-[4px] uppercase tracking-wider">Winter</span>
                <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-1 rounded-[4px] uppercase tracking-wider">Touring</span>
              </div>

              <div className="grid grid-cols-3 gap-xs mb-md border-t border-outline-variant/30 pt-sm mt-auto">
                <div>
                  <div className="font-label-sm text-label-sm text-outline mb-1">Treadwear</div>
                  <div className="font-label-md text-label-md text-primary font-bold">400</div>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm text-outline mb-1">Traction</div>
                  <div className="font-label-md text-label-md text-primary font-bold">A</div>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm text-outline mb-1">Temperature</div>
                  <div className="font-label-md text-label-md text-primary font-bold">B</div>
                </div>
              </div>

              <button className="w-full bg-secondary text-on-secondary font-headline-sm text-[16px] py-2 px-4 rounded-lg hover:bg-[#b45309] transition-colors font-bold flex items-center justify-center gap-sm">
                Agregar al Carrito <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}