import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PRODUCTOS, FABRICANTES } from '../data/productos';

export default function InventarioFabricante() {
  const { user, getInventario, addProducto, updateProducto, deleteProducto } = useAuth();
  const navigate = useNavigate();
  const [inventario, setInventario] = useState(() => getInventario());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ marca: '', modelo: '', medida: '', tipo: 'sedan', wholesalePrice: '', msrp: '', moq: '', stock: '', desc: '', enOferta: false, descuento: 0 });

  if (!user || (user.role !== 'fabricante' && user.role !== 'mayorista')) {
    navigate('/login');
    return null;
  }

  const inventarioBase = PRODUCTOS.filter(p => p.fabricanteId === user?.fabricanteId);
  const todos = [...inventarioBase, ...inventario];

  const filtrados = todos.filter(p =>
    p.modelo?.toLowerCase().includes(search.toLowerCase()) ||
    p.medida?.toLowerCase().includes(search.toLowerCase()) ||
    p.marca?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const producto = {
      ...form,
      wholesalePrice: parseFloat(form.wholesalePrice),
      msrp: parseFloat(form.msrp),
      moq: parseInt(form.moq),
      stock: parseInt(form.stock),
    };
    if (editingId && editingId.startsWith('prod_')) {
      deleteProducto(editingId);
      addProducto(producto);
    } else {
      addProducto(producto);
    }
    setShowForm(false);
    setEditingId(null);
    resetForm();
    setInventario(getInventario());
  };

  const resetForm = () => setForm({ marca: '', modelo: '', medida: '', tipo: 'sedan', wholesalePrice: '', msrp: '', moq: '', stock: '', desc: '', enOferta: false, descuento: 0 });

  const handleEdit = (product) => {
    setForm({
      marca: product.marca || '', modelo: product.modelo || '', medida: product.medida || '',
      tipo: product.tipo || 'sedan', wholesalePrice: product.wholesalePrice?.toString() || '',
      msrp: product.msrp?.toString() || '', moq: product.moq?.toString() || '',
      stock: product.stock?.toString() || '', desc: product.desc || '',
      enOferta: product.enOferta || false, descuento: product.descuento || 0,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este producto del inventario?')) {
      deleteProducto(id);
      setInventario(getInventario());
    }
  };

  const toggleOferta = (product) => {
    const updates = { enOferta: !product.enOferta, descuento: product.enOferta ? 0 : 10 };
    if (product.id.startsWith('prod_')) {
      updateProducto(product.id, updates);
      setInventario(getInventario());
    }
  };

  const fabricante = FABRICANTES.find(f => f.id === user?.fabricanteId);

  return (
    <div className="flex-1 bg-surface-variant/30">
      <div className="max-w-container-max mx-auto px-gutter py-6 space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => navigate('/dashboard')} className="btn-ghost p-1">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-on-secondary text-lg font-bold">
                {fabricante?.logo || 'I'}
              </div>
              <div>
                <h1 className="text-xl font-display font-black">Inventario</h1>
                <p className="text-sm text-on-surface-variant">{user?.nombre}</p>
              </div>
            </div>
          </div>
          <button onClick={() => { setShowForm(true); setEditingId(null); resetForm(); }} className="btn-primary">
            <span className="material-symbols-outlined text-lg">add</span>
            Nuevo Producto
          </button>
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input type="text" placeholder="Buscar por modelo, medida o marca..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="badge-primary">{todos.length} productos</div>
          <div className="badge-secondary">{todos.reduce((s, p) => s + (p.stock || 0), 0)} unidades</div>
          <div className="badge-warning">{todos.filter(p => p.enOferta).length} en oferta</div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
            <div className="bg-surface rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-display font-bold">{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-surface-container-highest rounded-lg"><span className="material-symbols-outlined">close</span></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold text-on-surface-variant mb-1 block">Marca *</label><input required value={form.marca} onChange={e => setForm({...form, marca: e.target.value})} className="input-field" placeholder="Ej: Robustires" /></div>
                  <div><label className="text-xs font-semibold text-on-surface-variant mb-1 block">Modelo *</label><input required value={form.modelo} onChange={e => setForm({...form, modelo: e.target.value})} className="input-field" placeholder="Ej: CargoPlus" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold text-on-surface-variant mb-1 block">Medida *</label><input required value={form.medida} onChange={e => setForm({...form, medida: e.target.value})} className="input-field" placeholder="Ej: 205/55 R16" /></div>
                  <div><label className="text-xs font-semibold text-on-surface-variant mb-1 block">Tipo</label>
                    <select value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})} className="input-field">
                      <option value="sedan">Sedán</option>
                      <option value="suv">SUV / 4x4</option>
                      <option value="comercial">Comercial / Carga</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold text-on-surface-variant mb-1 block">Precio Mayorista $ *</label><input required type="number" step="0.01" value={form.wholesalePrice} onChange={e => setForm({...form, wholesalePrice: e.target.value})} className="input-field" /></div>
                  <div><label className="text-xs font-semibold text-on-surface-variant mb-1 block">MSRP (Público) $</label><input type="number" step="0.01" value={form.msrp} onChange={e => setForm({...form, msrp: e.target.value})} className="input-field" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold text-on-surface-variant mb-1 block">MOQ *</label><input required type="number" value={form.moq} onChange={e => setForm({...form, moq: e.target.value})} className="input-field" placeholder="Cant. mínima" /></div>
                  <div><label className="text-xs font-semibold text-on-surface-variant mb-1 block">Stock *</label><input required type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="input-field" placeholder="Unidades disponibles" /></div>
                </div>
                <div><label className="text-xs font-semibold text-on-surface-variant mb-1 block">Descripción</label><textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} className="input-field" rows="2" /></div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.enOferta} onChange={e => setForm({...form, enOferta: e.target.checked})} className="w-4 h-4 accent-primary" />
                    <span className="text-sm font-medium">En oferta</span>
                  </label>
                  {form.enOferta && (
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-on-surface-variant">% Descuento:</label>
                      <input type="number" value={form.descuento} onChange={e => setForm({...form, descuento: parseInt(e.target.value) || 0})} className="input-field w-20 text-sm" />
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary flex-1">{editingId ? 'Actualizar' : 'Agregar Producto'}</button>
                  <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="dashboard-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-container-highest text-left text-on-surface-variant text-xs font-bold uppercase">
                  <th className="p-4">Producto</th>
                  <th className="p-4">Medida</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Wholesale</th>
                  <th className="p-4">MSRP</th>
                  <th className="p-4">MOQ</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Oferta</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filtrados.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4"><span className="font-semibold">{p.modelo}</span><span className="text-on-surface-variant text-xs ml-2">{p.marca}</span></td>
                    <td className="p-4 text-on-surface-variant">{p.medida}</td>
                    <td className="p-4"><span className={`badge ${p.tipo === 'comercial' ? 'badge-warning' : p.tipo === 'suv' ? 'badge-secondary' : 'badge-primary'}`}>{p.tipo}</span></td>
                    <td className="p-4 font-semibold">${p.wholesalePrice?.toFixed(2)}</td>
                    <td className="p-4 text-on-surface-variant">${p.msrp?.toFixed(2)}</td>
                    <td className="p-4">{p.moq}</td>
                    <td className="p-4"><span className={`font-bold ${p.stock < 20 ? 'text-error' : 'text-green-700'}`}>{p.stock}</span></td>
                    <td className="p-4">
                      <button onClick={() => toggleOferta(p)} className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors ${p.enOferta ? 'bg-amber-100 text-amber-800' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                        {p.enOferta ? `${p.descuento || 10}% OFF` : 'No'}
                      </button>
                    </td>
                    <td className="p-4">
                      {p.id.startsWith('prod_') && (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleEdit(p)} className="p-1.5 hover:bg-surface-container-highest rounded-lg text-on-surface-variant"><span className="material-symbols-outlined text-lg">edit</span></button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:bg-error-container/20 rounded-lg text-error"><span className="material-symbols-outlined text-lg">delete</span></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtrados.length === 0 && (
            <div className="p-8 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
              <p>No hay productos en tu inventario. Agrega tu primer producto.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
