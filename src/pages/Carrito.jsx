import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CART_ITEMS = [
  { id: 1, nombre: 'Michelin Pilot Sport 4S', medida: '235/40 R18', precio: 185.00, cantidad: 4, imagen: 'M' },
  { id: 2, nombre: 'Bridgestone Potenza RE-71RS', medida: '245/40 R18', precio: 210.00, cantidad: 2, imagen: 'BS' },
];

export default function Carrito() {
  const [items, setItems] = useState(CART_ITEMS);
  const [bcv, setBcv] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const fetchBCV = async () => {
      for (const url of [
        'https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/price/bcv',
        'https://ve.dolarapi.com/v1/dolares/oficial',
        'https://bcv.justcarlux.dev/',
      ]) {
        try {
          const res = await fetch(url);
          const data = await res.json();
          const rate = data?.promedio || data?.price || data?.rates?.BCV;
          if (rate) { setBcv(rate); return; }
        } catch { /* ignore */ }
      }
      setBcv(65);
    };
    fetchBCV();
  }, []);

  const updateQty = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const nueva = item.cantidad + delta;
      return nueva <= 0 ? null : { ...item, cantidad: nueva };
    }).filter(Boolean));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const descuento = couponApplied ? subtotal * 0.05 : 0;
  const iva = (subtotal - descuento) * 0.16;
  const total = subtotal - descuento + iva;
  const totalBs = bcv ? total * bcv : null;

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 animate-fade-in">
        <h1 className="text-2xl font-display font-black mb-6">Carrito de Compras</h1>

        {items.length === 0 ? (
          <div className="card text-center py-12">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/50 mb-3">shopping_cart</span>
            <p className="text-on-surface-variant mb-4">Tu carrito está vacío</p>
            <Link to="/catalogo" className="btn-primary">Ver catálogo</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map(item => (
                <div key={item.id} className="card-hover flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-display font-black text-primary/50">{item.imagen}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{item.nombre}</p>
                    <p className="text-xs text-on-surface-variant">{item.medida}</p>
                    <p className="font-bold text-primary text-sm mt-1">${item.precio.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-outline-variant rounded-lg">
                      <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 hover:bg-surface-container-highest rounded-l-lg transition-colors">-</button>
                      <span className="px-3 py-1 font-semibold text-sm min-w-[2rem] text-center">{item.cantidad}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 hover:bg-surface-container-highest rounded-r-lg transition-colors">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-1.5 hover:bg-error-container/20 rounded-lg text-error transition-colors">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="card h-fit lg:sticky lg:top-24 space-y-4">
              <h2 className="font-display font-bold text-lg">Resumen</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-700">
                    <span>Descuento (5%)</span>
                    <span>-${descuento.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">IVA (16%)</span>
                  <span className="font-semibold">${iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Envío</span>
                  <span className="text-green-700 font-semibold">Gratis</span>
                </div>
                <div className="border-t border-outline-variant/30 pt-3 mt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-display font-black text-primary">${total.toFixed(2)}</span>
                  </div>
                  {totalBs && (
                    <p className="text-xs text-on-surface-variant text-right mt-1">
                      Bs. {totalBs.toFixed(2)} {bcv ? `@ ${bcv.toFixed(2)}` : ''}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)} className="input-field flex-1 text-sm" placeholder="Cupón" />
                <button onClick={() => { if (coupon) setCouponApplied(true); }} className="btn-secondary text-sm whitespace-nowrap">Aplicar</button>
              </div>
              <button className="btn-primary w-full py-3">
                <span className="material-symbols-outlined text-lg">lock</span>
                Proceder al Pago
              </button>
              <Link to="/catalogo" className="block text-center text-sm text-primary font-semibold hover:underline">
                Seguir comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
