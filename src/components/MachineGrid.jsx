/**
 * MachineGrid.jsx
 *
 * Main component that:
 * 1. Fetches machines from backend on mount
 * 2. Manages loading/error states
 * 3. Displays grid of MachineCard components
 * 4. Shows helpful messages for empty/error states
 */

import React, { useState, useEffect } from 'react';
import MachineCard from './MachineCard';
import '../styles/MachineGrid.css';

function MachineGrid() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch machines from backend on component mount
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get API URL from environment variable
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

        // Fetch from backend
        const response = await fetch(`${apiUrl}/api/machines`);

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Parse JSON
        const data = await response.json();

        // Update state with machines
        setMachines(data);
        console.log(`[MachineGrid] Loaded ${data.length} machines`);

      } catch (err) {
        // Log error and set error state
        console.error('[MachineGrid] Fetch error:', err);
        setError(err.message);

      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };

    // Call fetch function
    fetchMachines();
  }, []); // Empty dependency array = run once on mount

  // Render
  return (
    <div className="machine-grid-container">
      {/* Grid Header */}
      <div className="grid-header">
        <h2>Shop Floor Machines</h2>
        <span className="machine-count">{machines.length} machines</span>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading">
          <p>Loading machines...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error">
          <p>Error loading machines: {error}</p>
          <small>Check that your backend URL is correct in .env.local</small>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && machines.length === 0 && (
        <div className="empty-state">
          <p>No machines found in database</p>
        </div>
      )}

      {/* Success State: Display Grid */}
      {!loading && !error && machines.length > 0 && (
        <div className="grid">
          {machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MachineGrid;
