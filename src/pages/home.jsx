import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activeTab, setActiveTab] = useState('measure');
  const canvasRef = useRef(null);

  // Hook para la animación WebGL del fondo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }`;

    const fs = `precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;

    float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
        vec2 uv = v_texCoord;
        vec3 color1 = vec3(0.015, 0.086, 0.153); // Navy #041627
        vec3 color2 = vec3(0.05, 0.12, 0.2); // Lighter Navy
        
        float n = noise(uv * 3.0 + u_time * 0.1);
        float wave = sin(uv.x * 10.0 + u_time) * 0.1 + sin(uv.y * 8.0 + u_time * 0.5) * 0.1;
        
        vec3 finalColor = mix(color1, color2, uv.y + wave);
        
        // Add subtle technical grid
        vec2 grid = fract(uv * 20.0);
        float line = smoothstep(0.02, 0.0, grid.x) + smoothstep(0.02, 0.0, grid.y);
        finalColor += line * 0.03;
        
        gl_FragColor = vec4(finalColor, 1.0);
    }`;

    function cs(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    function render(t) {
      if (typeof ResizeObserver === 'undefined') syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    render(0);

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Hook para las animaciones de Scroll (Fade In)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="flex-grow w-full bg-background text-on-background">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex flex-col items-center justify-center pt-xl pb-32 px-gutter overflow-hidden">
        <div className="absolute inset-0 w-full h-full object-cover z-0" style={{ display: 'block' }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
        </div>
        <div className="absolute inset-0 bg-primary/40 z-10"></div>
        <div className="relative z-20 text-center max-w-3xl mx-auto animate-fade-in opacity-0">
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-on-primary mb-md drop-shadow-lg">
            Conecta con los mejores mayoristas de Venezuela
          </h1>
          <p className="font-body-lg text-body-lg text-surface-container-highest mb-lg max-w-xl mx-auto drop-shadow-md">
            Accede al inventario más grande de neumáticos, con precios competitivos y logística de entrega confiable en todo el territorio nacional.
          </p>
          <Link to="/catalogo" className="btn-primary inline-block px-8 py-4 shadow-lg hover:shadow-xl bg-secondary text-on-secondary rounded-lg font-bold">
            Explorar Catálogo
          </Link>
        </div>
      </section>

      {/* Widget de Búsqueda */}
      <section className="relative z-30 -mt-24 px-gutter max-w-container-max mx-auto mb-xl">
        <div className="glass-panel heavy-shadow rounded-xl p-md border border-outline-variant animate-fade-in delay-100 opacity-0 bg-surface/90">
          <div className="flex border-b border-surface-variant mb-md">
            <button 
              onClick={() => setActiveTab('measure')}
              className={`px-md py-sm font-headline-sm text-headline-sm transition-colors ${
                activeTab === 'measure' 
                  ? 'text-secondary border-b-2 border-secondary font-bold' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Por Medida
            </button>
            <button 
              onClick={() => setActiveTab('vehicle')}
              className={`px-md py-sm font-headline-sm text-headline-sm transition-colors ${
                activeTab === 'vehicle' 
                  ? 'text-secondary border-b-2 border-secondary font-bold' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Por Vehículo
            </button>
          </div>
          
          {activeTab === 'measure' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Ancho</label>
                <select className="w-full h-12 rounded-lg border border-surface-variant bg-surface text-on-surface focus:ring-secondary focus:border-secondary font-label-md text-label-md px-3 outline-none">
                  <option>Seleccionar</option>
                  <option>175</option>
                  <option>185</option>
                  <option>195</option>
                  <option>205</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Perfil</label>
                <select className="w-full h-12 rounded-lg border border-surface-variant bg-surface text-on-surface focus:ring-secondary focus:border-secondary font-label-md text-label-md px-3 outline-none">
                  <option>Seleccionar</option>
                  <option>50</option>
                  <option>55</option>
                  <option>60</option>
                  <option>65</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Rin</label>
                <select className="w-full h-12 rounded-lg border border-surface-variant bg-surface text-on-surface focus:ring-secondary focus:border-secondary font-label-md text-label-md px-3 outline-none">
                  <option>Seleccionar</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full h-12 bg-secondary text-on-secondary rounded-lg flex items-center justify-center gap-xs font-bold hover:bg-secondary/90 transition-colors">
                  <span className="material-symbols-outlined">search</span> Buscar
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'vehicle' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
              <div className="md:col-span-3 flex items-center text-on-surface-variant">
                <p>Selecciona marca, modelo y año (En desarrollo)</p>
              </div>
              <div className="flex items-end">
                <button className="w-full h-12 bg-secondary text-on-secondary rounded-lg flex items-center justify-center gap-xs font-bold hover:bg-secondary/90 transition-colors">
                  <span className="material-symbols-outlined">search</span> Buscar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="max-w-container-max mx-auto px-gutter py-xl">
        <h2 className="font-headline-md text-headline-md text-primary mb-lg">Categorías Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <Link to="/" className="group relative h-64 rounded-xl overflow-hidden heavy-shadow animate-fade-in delay-200 opacity-0 block">
            <div className="absolute inset-0 bg-cover bg-center w-full h-full transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-md">
              <h3 className="font-headline-sm text-headline-sm text-on-primary mb-xs">Passenger</h3>
              <p className="font-body-md text-body-md text-surface-container-highest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">Ideal para ciudad y carretera.</p>
            </div>
          </Link>
          <Link to="/" className="group relative h-64 rounded-xl overflow-hidden heavy-shadow animate-fade-in delay-200 opacity-0 block">
            <div className="absolute inset-0 bg-cover bg-center w-full h-full transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-md">
              <h3 className="font-headline-sm text-headline-sm text-on-primary mb-xs">SUV / 4x4</h3>
              <p className="font-body-md text-body-md text-surface-container-highest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">Máxima tracción y durabilidad.</p>
            </div>
          </Link>
          <Link to="/" className="group relative h-64 rounded-xl overflow-hidden heavy-shadow animate-fade-in delay-200 opacity-0 block">
            <div className="absolute inset-0 bg-cover bg-center w-full h-full transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601562096236-1215b244795e?auto=format&fit=crop&q=80&w=800')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-md">
              <h3 className="font-headline-sm text-headline-sm text-on-primary mb-xs">Truck / Comercial</h3>
              <p className="font-body-md text-body-md text-surface-container-highest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">Rendimiento para carga pesada.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Ofertas de la Semana */}
      <section className="bg-primary-container text-on-primary-container py-xl my-xl animate-fade-in delay-300 opacity-0">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
          <div>
            <div className="inline-block bg-secondary text-on-secondary px-3 py-1 rounded-sm font-label-sm text-label-sm uppercase font-bold mb-md">Ofertas de la Semana</div>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-sm">Aprovecha precios de mayorista</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container/80 mb-lg">Descuentos exclusivos en marcas seleccionadas hasta agotar existencia.</p>
            <div className="flex gap-md mb-lg">
              <div className="flex flex-col items-center">
                <span className="font-headline-md text-headline-md text-on-primary bg-primary rounded-lg p-sm min-w-[60px] text-center">03</span>
                <span className="font-label-sm text-label-sm mt-xs text-on-primary-container/80">Días</span>
              </div>
              <div className="font-headline-md text-headline-md text-secondary self-start pt-sm">:</div>
              <div className="flex flex-col items-center">
                <span className="font-headline-md text-headline-md text-on-primary bg-primary rounded-lg p-sm min-w-[60px] text-center">14</span>
                <span className="font-label-sm text-label-sm mt-xs text-on-primary-container/80">Horas</span>
              </div>
              <div className="font-headline-md text-headline-md text-secondary self-start pt-sm">:</div>
              <div className="flex flex-col items-center">
                <span className="font-headline-md text-headline-md text-on-primary bg-primary rounded-lg p-sm min-w-[60px] text-center">45</span>
                <span className="font-label-sm text-label-sm mt-xs text-on-primary-container/80">Min</span>
              </div>
            </div>
          </div>
          <div className="bg-surface rounded-xl p-md heavy-shadow relative border border-surface-variant">
            <div className="absolute top-md right-md bg-error text-on-error px-2 py-1 rounded-sm font-label-sm text-label-sm font-bold z-10">-15% OFF</div>
            <div className="flex flex-col md:flex-row gap-md">
              <div className="w-full md:w-1/2 h-48 bg-surface-container-lowest rounded-lg flex items-center justify-center p-sm overflow-hidden">
                <img className="object-cover h-full w-full" src="https://images.unsplash.com/photo-1590840131494-1b1ebec9a41b?auto=format&fit=crop&q=80&w=400" alt="Michelin Pilot Sport" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-xs">Michelin Pilot Sport 4S</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-sm">245/35ZR20 (95Y) XL</p>
                  <div className="flex gap-xs mb-md flex-wrap">
                    <span className="bg-tertiary-container text-on-tertiary font-label-sm text-label-sm px-2 py-1 rounded-[4px]">UHP</span>
                    <span className="bg-tertiary-container text-on-tertiary font-label-sm text-label-sm px-2 py-1 rounded-[4px]">Treadwear 300</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-sm mb-sm">
                    <span className="font-headline-md text-headline-md text-primary">$215.00</span>
                    <span className="font-body-md text-body-md text-outline line-through">$255.00</span>
                  </div>
                  <Link to="/" className="w-full bg-primary-container text-on-primary-container border border-primary font-headline-sm text-headline-sm py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-colors block text-center">Ver Detalles</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}