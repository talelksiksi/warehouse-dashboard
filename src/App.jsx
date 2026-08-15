/**
 * App.jsx
 *
 * Main application root component.
 * Displays header + MachineGrid component
 * Establishes WebSocket connection on mount
 */

import React, { useEffect } from 'react';
import MachineGrid from './components/MachineGrid';
import InventoryTable from './components/InventoryTable';
import OrderQueue from './components/OrderQueue';
import AlertFeed from './components/AlertFeed';
import useWebSocket from './hooks/useWebSocket';
import './App.css';

function App() {
  // Get WebSocket URL from environment
  const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';

  // Connect to WebSocket
  const { isConnected, lastMessage, error } = useWebSocket(wsUrl);

  // Log connection status when it changes
  useEffect(() => {
    if (isConnected) {
      console.log('[App] WebSocket connected');
    } else {
      console.log('[App] WebSocket disconnected');
    }
  }, [isConnected]);

  // Log last message when it arrives
  useEffect(() => {
    if (lastMessage) {
      console.log('[App] Last message:', lastMessage);
    }
  }, [lastMessage]);

  return (
    <div className="App">
      {/* App Header */}
      <header className="app-header">
        <h1>🏭 Warehouse Operations Dashboard</h1>
        <p>Real-time factory floor monitoring</p>

        {/* WebSocket Status Indicator */}
        <div className="ws-status">
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <span className="status-text">
            {isConnected ? 'Live' : 'Offline'}
          </span>
          {error && <span className="status-error">({error})</span>}
        </div>
      </header>

      {/* Main Content: Pass lastMessage to MachineGrid */}
      <main className="app-main">
        <MachineGrid lastMessage={lastMessage} />
        <InventoryTable lastMessage={lastMessage} />
        <OrderQueue />
      </main>

      {/* App Footer */}
      <footer className="app-footer">
        <p>© 2024 Warehouse Dashboard | Status: {isConnected ? 'Online' : 'Offline'}</p>
      </footer>

      <AlertFeed />
    </div>
  );
}

export default App;
