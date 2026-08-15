import React, { useState, useEffect } from 'react';
import '../styles/OrderQueue.css';

function OrderQueue() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/orders`);
        const data = await response.json();
        setOrders(data.slice(0, 10)); // Top 10
        setLoading(false);
      } catch (err) {
        console.error('[OrderQueue] Error:', err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    return status === 'complete' ? '#4CAF50' : status === 'in_progress' ? '#2196F3' : '#FFC107';
  };

  return (
    <div className="order-container">
      <div className="order-header">
        <h2>Order Queue</h2>
        <span className="order-count">{orders.length} orders</span>
      </div>

      {!loading && orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className={`order-item status-${order.status}`}>
              <div className="order-id">{order.order_id}</div>
              <div className="order-progress">
                <div className="stations">
                  {[1, 2, 3, 4, 5].map((station) => (
                    <div
                      key={station}
                      className={`station ${station <= order.station_id ? 'active' : ''}`}
                      style={{
                        backgroundColor: station <= order.station_id ? getStatusColor(order.status) : '#f0f0f0'
                      }}
                    >
                      {station}
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-status">{order.status.toUpperCase()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderQueue;
