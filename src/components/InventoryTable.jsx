/**
 * InventoryTable.jsx
 *
 * Displays inventory SKUs with stock levels
 * Color-coded: green (ok), yellow (low), red (critical)
 * Updates via WebSocket
 */

import React, { useState, useEffect } from 'react';
import '../styles/InventoryTable.css';

function InventoryTable({ lastMessage }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch inventory on mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/inventory`);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        // Take top 20
        setInventory(data.slice(0, 20));
        console.log(`[InventoryTable] Loaded ${Math.min(20, data.length)} items`);
      } catch (err) {
        console.error('[InventoryTable] Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Get status color
  const getStatusColor = (quantity, minLevel) => {
    if (quantity <= minLevel) return 'critical'; // Red
    if (quantity <= minLevel * 1.5) return 'low'; // Yellow
    return 'ok'; // Green
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory Status</h2>
        <span className="inventory-count">{inventory.length} SKUs</span>
      </div>

      {loading && <div className="loading"><p>Loading inventory...</p></div>}
      {error && <div className="error"><p>Error: {error}</p></div>}

      {!loading && !error && inventory.length > 0 && (
        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Min Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => {
                const status = getStatusColor(item.quantity, item.min_level);
                return (
                  <tr key={item.id} className={`status-${status}`}>
                    <td className="sku">{item.sku}</td>
                    <td className="quantity">{item.quantity}</td>
                    <td className="min-level">{item.min_level}</td>
                    <td className="status">
                      <span className={`badge badge-${status}`}>
                        {status === 'ok' ? '✓ OK' : status === 'low' ? '⚠ LOW' : '✗ CRITICAL'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InventoryTable;
