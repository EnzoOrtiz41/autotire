import React, { useState, useEffect } from 'react';

export default function Carrito() {
  const [tasaBcv, setTasaBcv] = useState(0); 
  const [cargandoTasa, setCargandoTasa] = useState(true);

  const totalUsd = 1345.60;

  // Efecto robusto con múltiples proveedores de la Tasa BCV
  useEffect(() => {
    const obtenerTasaBcv = async () => {
      try {
        setCargandoTasa(true);

        // INTENTO 1: API de la comunidad venezolana (Súper rápida y sin bloqueo CORS)
        try {
          const res = await fetch('https://bcv.justcarlux.dev/api/v1/rates');
          if (res.ok) {
            const data = await res.json();
            if (data && data.usd) {
              setTasaBcv(Number(data.usd));
              return; 
            }
          }
        } catch (e) {
          console.warn("Fallo intento 1...");
        }

        // INTENTO 2: DolarApi Venezuela
        try {
          const res2 = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
          if (res2.ok) {
            const data2 = await res2.json();
            if (data2 && data2.promedio) {
              setTasaBcv(Number(data2.promedio));
              return;
            }
          }
        } catch (e) {
          console.warn("Fallo intento 2...");
        }

        // INTENTO 3: pyDolarVenezuela
        const res3 = await fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv');
        if (res3.ok) {
          const data3 = await res3.json();
          const precio = data3?.monitors?.usd?.price || data3?.monitors?.bcv?.price;
          if (precio) {
             setTasaBcv(Number(precio));
             return;
          }
        }

      } catch (error) {
        console.error("No se pudo obtener la tasa en tiempo real:", error);
        setTasaBcv(36.45); // Tasa de respaldo ajustada para que notes el cambio si hay fallo
      } finally {
        setCargandoTasa(false);
      }
    };

    obtenerTasaBcv();
  }, []);

  const formatearMonto = (monto) => {
    return monto.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const totalBsFormateado = tasaBcv > 0 ? formatearMonto(totalUsd * tasaBcv) : "0.00";

  return (
    <div className="bg-[#f9fafb] text-gray-900 antialiased min-h-screen flex flex-col font-sans">
      <main className="flex-grow flex flex-col px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Carrito de Compras</h1>
          <p className="text-base text-gray-500 mt-2">
            Revisa los artículos en tu carrito antes de finalizar la compra.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: Artículos */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Artículo 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start transition-shadow hover:shadow-md">
              <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2">
                <img className="w-full h-full object-contain mix-blend-multiply" alt="Michelin Pilot Sport 4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNXev5VrN2VFzZn6zPkglz_7CXVLJSIGKm7RXdmn6j1IfZmvt_a2UBORE8XZmerK52kTRj-XNRTnyiyr1sH-HuIHZKq812DqLHKSqDRA2kjPxlAa4Kb5K89Ps3wWEHbWwIltuKmm6Gzhh3YeUDqMFv2ftcVBuePOX1pSLiLRzM3QA06rjPJ_XIxQ95QIk5tAbM1VGAYa7lCRHA4sad5_oa7BjgPtgUWwFpU8cIk5B_1iBXmQ_vTDpMqstx8wEkHJ3p8-Um3qUkH1c" />
              </div>
              <div className="flex-grow flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-blue-800 bg-blue-50 border border-blue-100 px-2 py-1 rounded tracking-wider uppercase mb-2 inline-block">Michelin</span>
                    <h3 className="text-lg font-bold text-gray-900">Pilot Sport 4</h3>
                    <p className="text-sm text-gray-500 mt-1">225/45 R17 91Y</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg border-r border-gray-200"><span className="material-symbols-outlined text-sm">remove</span></button>
                    <span className="text-sm font-semibold px-4 py-1 text-gray-900">4</span>
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg border-l border-gray-200"><span className="material-symbols-outlined text-sm">add</span></button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">$185.00</p>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                      {cargandoTasa ? "..." : `Bs. ${formatearMonto(185.00 * tasaBcv)}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Artículo 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start transition-shadow hover:shadow-md">
              <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2">
                <img className="w-full h-full object-contain mix-blend-multiply" alt="Bridgestone Potenza RE-71RS" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAieH2-eDDU49bgTi48PleW4Qo69kORxwHJuZAP7pyUlDKjmh2IslcJ_7UHE8-WQl1l6-Q26O9Nx3etqY1eVO1nQx2O7Xf0rqJPf1Do54V8YHghNNnDmfWUo8aYk-T4aSbG0jjJJwjN3HcsQl95l5jyrj3E_QOjse6Q-9os5Ff_NZXIEWdhdXN_8gEO0lJa3ZrXIf2p9ELKQljLco-qK2T-Ce6Z0MMIy72Rg27Dej_Bj2uI324-UVZh6fhnbRy_2BwXOfNkzXQmLPc" />
              </div>
              <div className="flex-grow flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded tracking-wider uppercase mb-2 inline-block">Bridgestone</span>
                    <h3 className="text-lg font-bold text-gray-900">Potenza RE-71RS</h3>
                    <p className="text-sm text-gray-500 mt-1">245/40 R18 97W</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg border-r border-gray-200"><span className="material-symbols-outlined text-sm">remove</span></button>
                    <span className="text-sm font-semibold px-4 py-1 text-gray-900">2</span>
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg border-l border-gray-200"><span className="material-symbols-outlined text-sm">add</span></button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">$210.00</p>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                      {cargandoTasa ? "..." : `Bs. ${formatearMonto(210.00 * tasaBcv)}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Resumen de Pedido */}
          <div className="lg:col-span-4 sticky top-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col gap-5 relative overflow-hidden">
              
              {/* Barra superior naranja, ajustada al diseño de tu web */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-700"></div>
              
              <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-100 mt-1">
                Resumen del Pedido
              </h2>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal (6 artículos)</span>
                  <span className="text-sm font-semibold text-gray-900">$1,160.00</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-orange-600">Descuento promocional</span>
                  <span className="text-sm font-bold text-orange-600">-$0.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Impuestos (16% IVA)</span>
                  <span className="text-sm font-semibold text-gray-900">$185.60</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Costo de Envío</span>
                  <span className="bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
                    Gratis
                  </span>
                </div>
              </div>

              {/* Botones de descuento arreglados visualmente */}
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Código de descuento" 
                  className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg px-3 py-2 border border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none transition-all" 
                />
                <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Aplicar
                </button>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-lg font-bold text-gray-900">Total USD</span>
                  <span className="text-3xl font-black text-gray-900 tracking-tight">
                    ${formatearMonto(totalUsd)}
                  </span>
                </div>
                
                {/* Cuadro de BCV con tipografía normal */}
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500">Tasa referencial (BCV)</span>
                    <span className="text-xs font-bold text-gray-700">
                      {cargandoTasa ? "Calculando..." : `${formatearMonto(tasaBcv)} Bs/USD`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">Total a pagar en Bs.</span>
                    <span className="text-sm font-bold text-orange-700">
                      {cargandoTasa ? "..." : `Bs. ${totalBsFormateado}`}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                disabled={cargandoTasa}
                className="w-full bg-orange-700 hover:bg-orange-800 disabled:bg-gray-300 disabled:text-gray-500 text-white text-base font-bold py-3 px-4 rounded-lg transition-colors shadow-sm active:scale-[0.98] duration-150 flex justify-center items-center gap-2"
              >
                Proceder al Pago
                <span className="material-symbols-outlined text-lg">payments</span>
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-gray-400 mt-2">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                <span className="text-xs font-medium">Transacción cifrada y segura</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}