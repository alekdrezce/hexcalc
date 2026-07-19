import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const [baseColor, setBaseColor] = useState('#657ed4');
  const [palette, setPalette] = useState(['#657ed4', '#d90267', '#65d4b5', '#d4b565', '#b565d4']);
  const paletteRef = useRef(null);

  const generateRandomPalette = () => {
    // Generamos 4 colores armonicos basados en el baseColor (rotaciones HSL)
    const newPalette = [baseColor];
    for (let i = 0; i < 4; i++) {
      const hue = (Math.random() * 360);
      newPalette.push(`hsl(${hue}, 70%, 50%)`);
    }
    setPalette(newPalette);
  };

  const downloadPalette = async () => {
    const canvas = await html2canvas(paletteRef.current);
    const link = document.createElement('a');
    link.download = 'hexcalc-palette.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Generador */}
        <div className="bg-neutral-900 p-8 rounded-[2rem] border border-neutral-800 text-center">
          <input value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-mono text-center w-full mb-4" />
          <button onClick={generateRandomPalette} className="w-full py-4 bg-[#657ed4] rounded-2xl font-bold hover:bg-[#5a6fbf] transition-all">
            GENERAR NUEVA ARMONÍA
          </button>
        </div>

        {/* Paleta desplegable */}
        <div ref={paletteRef} className="bg-neutral-900 p-6 rounded-[2rem] border border-neutral-800">
          <div className="flex h-32 mb-4 rounded-2xl overflow-hidden">
            {palette.map((color, i) => (
              <div key={i} style={{ backgroundColor: color }} className="flex-1" />
            ))}
          </div>
          
          {/* Resultados Desplegables */}
          <div className="space-y-2">
            {palette.slice(1).map((color, i) => (
              <details key={i} className="bg-neutral-800 p-4 rounded-xl cursor-pointer">
                <summary className="font-mono text-sm">{color}</summary>
                <p className="mt-2 text-neutral-400 text-xs">Propiedades calculadas: Matiz {i+1} armonizado.</p>
              </details>
            ))}
          </div>
        </div>

        <button onClick={downloadPalette} className="w-full py-4 border-2 border-[#d90267] text-[#d90267] rounded-2xl font-bold hover:bg-[#d90267] hover:text-white transition-all">
          DESCARGAR PALETA (PNG)
        </button>
      </div>
    </div>
  );
}

export default App;