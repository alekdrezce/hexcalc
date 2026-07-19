import { useState } from 'react';

function App() {
  const [display, setDisplay] = useState('0');

  const handlePress = (val) => {
    setDisplay(prev => prev === '0' ? val : prev + val);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
      <div className="w-80 p-6 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800">
        <div className="text-right text-4xl mb-6 font-mono overflow-x-auto">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((btn) => (
            <button 
              key={btn}
              onClick={() => btn === '=' ? setDisplay('Result') : handlePress(btn)}
              className="h-14 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors font-bold"
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