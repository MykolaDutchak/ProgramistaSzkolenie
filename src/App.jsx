import { useState } from "react";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark app-container" : "app-container"}>
      <header className="app-header">
        <h1>💰 Budget Tracker</h1>
        {/* TODO: onClick powinien przełączać isDark */}
        <button className="btn btn-dark-toggle" onClick={() => setIsDark(!isDark)}>Dark Mode</button>  
      </header>

      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
