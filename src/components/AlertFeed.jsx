import React, { useState, useEffect } from 'react';
import '../styles/AlertFeed.css';

function AlertFeed() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const types = ['info', 'warning', 'error', 'success'];
      const messages = [
        'Machine 5 status changed',
        'Low stock on SKU-A1',
        'Order ORD-001 completed',
        'System running smoothly'
      ];

      const newAlert = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        message: messages[Math.floor(Math.random() * messages.length)]
      };

      setAlerts((prev) => [...prev, newAlert].slice(-3)); // Keep last 3

      // Auto-dismiss after 5s
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== newAlert.id));
      }, 5000);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="alert-feed">
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <span className="alert-message">{alert.message}</span>
        </div>
      ))}
    </div>
  );
}

export default AlertFeed;
