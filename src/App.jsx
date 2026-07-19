import { useState } from 'react';

function App() {
  const [baseColor, setBaseColor] = useState('#657ed4');
  const [channels, setChannels] = useState({ r: 101, g: 126, b: 212 });
  const [palette, setPalette] = useState({ triadic: [], tints: [], shades: [] });

  // Función para descomponer HEX a RGB
  const updateChannels = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    setChannels({ r, g, b });
  };

  // Cuentagotas (EyeDropper API)
  const pickColor = async () => {
    if (!window.EyeDropper) return alert("EyeDropper no soportado");
    const eyeDropper = new window.EyeDropper();
    const result = await eyeDropper.open();
    setBaseColor(result.sRGBHex);
    updateChannels(result.sRGBHex);
  };

  // Lógica de paletas: Tintas, Sombras y Tríadas
  const generatePalette = (hex) => {
    // Nota: Lógica simplificada para demostración de estructura
    // En producción usaríamos librerías como 'colord' para mayor precisión
    setPalette({
      triadic: ['#657ed4', '#d4657e', '#7ed465'],
      tints: ['#8fa4e0', '#b9c8eb', '#e2e9f6'],
      shades: ['#4d5fa0', '#364370', '#1f2741']
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Panel de Control */}
        <div className="bg-neutral-900 p-6 rounded-[2rem] border border-neutral-800 flex gap-4">
          <input 
            value={baseColor}
            onChange={(e) => { setBaseColor(e.target.value); updateChannels(e.target.value); }}
            className="flex-1 bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-mono"
          />
          <button onClick={pickColor} className="px-6 bg-[#657ed4] rounded-2xl font-bold">Capturar</button>
          <button onClick={() => generatePalette(baseColor)} className="px-6 bg-[#d90267] rounded-2xl font-bold">Generar</button>
        </div>

        {/* Canales RGB */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {Object.entries(channels).map(([key, val]) => (
            <div key={key} className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
              <div className="text-neutral-500 uppercase text-xs">{key}</div>
              <div className="text-2xl font-mono">{val}</div>
            </div>
          ))}
        </div>

        {/* Paletas generadas */}
        <div className="space-y-4">
          <PaletteRow title="Tríada" colors={palette.triadic} />
          <PaletteRow title="Tintas" colors={palette.tints} />
          <PaletteRow title="Sombras" colors={palette.shades} />
        </div>
      </div>
    </div>
  );
}

const PaletteRow = ({ title, colors }) => (
  <div className="bg-neutral-900 p-6 rounded-[2rem] border border-neutral-800">
    <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-neutral-500">{title}</h3>
    <div className="flex gap-2">
      {colors.map((c, i) => (
        <div key={i} className="h-12 flex-1 rounded-xl" style={{ backgroundColor: c }} />
      ))}
    </div>
  </div>
);

export default App;