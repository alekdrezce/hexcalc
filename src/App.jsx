import { useState } from 'react';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      {/* Contenedor principal con estilo curvo */}
      <div className="w-full max-w-sm p-8 bg-neutral-900 rounded-[2rem] border border-neutral-800 shadow-2xl">
        
        {/* Pantalla de visualización */}
        <div className="mb-8 p-6 bg-neutral-950 rounded-2xl border border-neutral-800 text-right">
          <div className="text-[#657ed4] text-sm font-bold uppercase tracking-widest mb-1">HexCalc</div>
          <div className="text-white text-5xl font-light tracking-tighter">0</div>
        </div>

        {/* Grid de botones con tu paleta */}
        <div className="grid grid-cols-4 gap-3">
          {/* Botones numéricos estándar */}
          {[7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', '=', '+'].map((btn) => (
            <button 
              key={btn}
              className={`
                h-16 rounded-2xl font-semibold transition-all duration-300
                ${btn === '=' || btn === '+' || btn === '-' || btn === '*' || btn === '/' 
                  ? 'bg-[#d90267] text-white hover:bg-pink-600' 
                  : 'bg-neutral-800 text-neutral-300 hover:bg-[#657ed4] hover:text-white'}
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;