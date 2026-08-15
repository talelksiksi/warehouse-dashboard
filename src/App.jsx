/**
 * App.jsx
 *
 * Main application root component.
 * Displays header + MachineGrid component
 */

import React from 'react';
import MachineGrid from './components/MachineGrid';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* App Header */}
      <header className="app-header">
        <h1>🏭 Warehouse Operations Dashboard</h1>
        <p>Real-time factory floor monitoring</p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <MachineGrid />
      </main>

      {/* App Footer */}
      <footer className="app-footer">
        <p>© 2024 Warehouse Dashboard | Status: Online</p>
      </footer>
    </div>
  );
}

export default App;
