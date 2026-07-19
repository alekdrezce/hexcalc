import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const [baseColor, setBaseColor] = useState('#657ed4');
  const [palette, setPalette] = useState(['#657ed4', '#d90267', '#8065d4', '#d465c2', '#65d4b5']);
  const paletteRef = useRef(null);

  // Convierte HEX a HSL para cálculos armónicos
  const hexToHsl = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, l = (max + min) / 2;
    if (max === min) h = s = 0;
    else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = (max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4) / 6;
    }
    return [h * 360, s * 100, l * 100];
  };

  const generateHarmonicPalette = () => {
    const [h] = hexToHsl(baseColor);
    // Genera 4 colores basados en rotaciones de matiz coherentes
    const newPalette = [baseColor, ...[30, 90, 150, 210].map(rot => `hsl(${(h + rot) % 360}, 70%, 60%)`)];
    setPalette(newPalette);
  };

  const pickColor = async () => {
    if (!window.EyeDropper) return alert("Tu navegador no soporta el Cuentagotas.");
    const picker = new EyeDropper();
    const { sRGBHex } = await picker.open();
    setBaseColor(sRGBHex);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copiado: ${text}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Panel Superior: Visor y Control */}
        <div className="bg-neutral-900 p-6 rounded-[2rem] border border-neutral-800 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl border-4 border-neutral-800" style={{ backgroundColor: baseColor }} />
          <div className="flex-1">
            <input value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-full bg-neutral-950 p-2 rounded-lg font-mono text-xl" />
            <div className="flex gap-2 mt-2">
              <button onClick={pickColor} className="flex-1 bg-neutral-800 py-2 rounded-xl text-xs font-bold uppercase hover:bg-neutral-700">Cuentagotas</button>
              <button onClick={generateHarmonicPalette} className="flex-1 bg-[#657ed4] py-2 rounded-xl text-xs font-bold uppercase hover:bg-[#5a6fbf]">Generar</button>
            </div>
          </div>
        </div>

        {/* Paleta y Resultados */}
        <div ref={paletteRef} className="bg-neutral-900 p-6 rounded-[2rem] border border-neutral-800">
          <div className="flex h-32 mb-6 rounded-2xl overflow-hidden shadow-inner">
            {palette.map((color, i) => (
              <div key={i} style={{ backgroundColor: color }} className="flex-1" />
            ))}
          </div>

          <div className="space-y-2">
            {palette.map((color, i) => (
              <details key={i} className="bg-neutral-800 p-4 rounded-xl cursor-pointer hover:bg-neutral-700 transition-colors">
                <summary className="font-mono text-sm flex justify-between">
                  {color.toUpperCase()} <span>{i === 0 ? '(Base)' : 'Armónico'}</span>
                </summary>
                <button onClick={() => copyToClipboard(color)} className="mt-3 w-full bg-[#d90267] py-2 rounded-lg text-xs font-bold">COPIAR HEX</button>
              </details>
            ))}
          </div>
        </div>

        <button onClick={() => html2canvas(paletteRef.current).then(c => {
          const a = document.createElement('a'); a.href = c.toDataURL(); a.download = 'palette.png'; a.click();
        })} className="w-full py-4 border-2 border-[#d90267] text-[#d90267] rounded-2xl font-bold hover:bg-[#d90267] hover:text-white transition-all">
          DESCARGAR PALETA (PNG)
        </button>
      </div>
    </div>
  );
}

export default App;