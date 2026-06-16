import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app-container">
        <h1>🐙 OctoFit Tracker</h1>
        <p>Modern multi-tier fitness tracking application</p>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count: {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
