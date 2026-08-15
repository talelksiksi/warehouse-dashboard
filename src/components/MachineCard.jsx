/**
 * MachineCard.jsx
 *
 * Individual machine card component.
 * Displays: name, station, state, uptime %, production rate, last update time
 * Color-coded based on state (idle=green, running=blue, error=red)
 */

import React from 'react';
import '../styles/MachineGrid.css'; // Uses shared CSS

function MachineCard({ machine }) {
  // Map machine state to color
  const stateColorMap = {
    idle: '#4CAF50',    // Green
    running: '#2196F3', // Blue
    error: '#F44336',   // Red
  };

  const bgColor = stateColorMap[machine.state] || '#9E9E9E'; // Fallback to gray

  return (
    <div
      className="machine-card"
      style={{
        borderLeftColor: bgColor,
        backgroundColor: `${bgColor}15`, // 15% opacity for light background
      }}
    >
      {/* Card Header: Name + State Badge */}
      <div className="card-header">
        <h3 className="machine-name">{machine.name}</h3>
        <span
          className="state-badge"
          style={{
            backgroundColor: bgColor,
            color: '#fff',
          }}
        >
          {machine.state.toUpperCase()}
        </span>
      </div>

      {/* Card Body: Machine Details */}
      <div className="card-content">
        <div className="info-row">
          <span className="label">Station:</span>
          <span className="value">{machine.station_id}</span>
        </div>

        <div className="info-row">
          <span className="label">Uptime:</span>
          <span className="value">{parseFloat(machine.uptime_pct).toFixed(1)}%</span>
        </div>

        <div className="info-row">
          <span className="label">Production:</span>
          <span className="value">{machine.production_rate} units/hr</span>
        </div>
      </div>

      {/* Card Footer: Timestamp */}
      <div className="card-footer">
        <span className="timestamp">
          Updated: {new Date(machine.last_updated).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export default MachineCard;
