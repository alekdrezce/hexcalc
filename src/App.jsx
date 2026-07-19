import { useState } from 'react';

function App() {
  const [baseColor, setBaseColor] = useState('#657ed4');
  const [harmonies, setHarmonies] = useState([]);

  // Lógica de cálculo de armonías (Conversión HSL para manipular el matiz)
  const calculateHarmonies = (hex) => {
    // 1. Convertir HEX a HSL básico
    // 2. Calcular: 
    //    - Complementario: (H + 180) % 360
    //    - Triada: (H + 120) % 360, (H + 240) % 360
    //    - Análogos: (H - 30), (H + 30)
    
    // Aquí implementaremos la lógica que definimos:
    const newHarmonies = [
      { type: 'Complementario', value: '#d90267' }, // El que definimos como operador
      { type: 'Triada', value: '#d4657e' },
      { type: 'Análogo', value: '#7e65d4' }
    ];
    setHarmonies(newHarmonies);
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-8 text-white">
      <div className="max-w-md mx-auto space-y-6">
        <div className="p-6 bg-neutral-900 rounded-[2rem] border border-neutral-800">
          <input 
            type="text" 
            value={baseColor} 
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-full bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-center text-xl font-mono"
          />
          <button 
            onClick={() => calculateHarmonies(baseColor)}
            className="w-full mt-4 h-14 bg-[#657ed4] rounded-2xl font-bold hover:opacity-90 transition-opacity"
          >
            GENERAR ARMONÍAS
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {harmonies.map((h, i) => (
            <div key={i} className="text-center">
              <div 
                className="h-24 w-full rounded-2xl mb-2 border border-neutral-800" 
                style={{ backgroundColor: h.value }}
              />
              <span className="text-xs text-neutral-500 uppercase tracking-widest">{h.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;