/**
 * useWebSocket.js
 *
 * Custom React hook for WebSocket connection.
 * Handles connection, disconnection, errors, and message handling.
 * Returns: { isConnected, lastMessage, error }
 */

import { useEffect, useState } from 'react';

function useWebSocket(url) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't connect if URL not provided
    if (!url) {
      console.warn('[useWebSocket] No URL provided');
      return;
    }

    console.log(`[useWebSocket] Connecting to ${url}`);

    let ws = null;

    try {
      // Create WebSocket connection
      ws = new WebSocket(url);

      // Connection opened
      ws.onopen = () => {
        console.log('[useWebSocket] Connected!');
        setIsConnected(true);
        setError(null);
      };

      // Message received
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('[useWebSocket] Message received:', data);
          setLastMessage(data);
        } catch (e) {
          console.error('[useWebSocket] Failed to parse message:', e);
        }
      };

      // Connection closed
      ws.onclose = () => {
        console.log('[useWebSocket] Disconnected');
        setIsConnected(false);
      };

      // Error occurred
      ws.onerror = (error) => {
        console.error('[useWebSocket] Error:', error);
        setError('WebSocket error');
        setIsConnected(false);
      };

    } catch (err) {
      console.error('[useWebSocket] Failed to create WebSocket:', err);
      setError(err.message);
    }

    // Cleanup: close WebSocket on unmount
    return () => {
      if (ws) {
        console.log('[useWebSocket] Cleaning up connection');
        ws.close();
      }
    };
  }, [url]); // Re-run if URL changes

  return { isConnected, lastMessage, error };
}

export default useWebSocket;
