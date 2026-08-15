# Warehouse Operations Dashboard

Real-time warehouse operations dashboard built with React. Displays live machine
status, inventory levels, and order flow, all updated over a WebSocket connection.

**Live demo:** https://warehouse-dashboard-umber.vercel.app

## Features

- **Machine grid** — 50 shop-floor machines, color-coded by state (idle/running/error), with a pulse animation on live updates
- **Inventory table** — top 20 SKUs, color-coded by stock level (ok/low/critical)
- **Order queue** — pending orders with per-station progress indicators
- **Alert feed** — toast notifications in the bottom-right corner
- **Live updates** — a WebSocket connection streams machine state changes from the backend every ~3 seconds

## Stack

- React 18 (Create React App)
- Native WebSocket (no socket.io)
- Deployed on Vercel

## Setup

```bash
npm install
npm start
```

Requires a `.env.local` with:

```
REACT_APP_API_URL=https://your-backend-url
REACT_APP_WS_URL=wss://your-backend-url
```

See the [backend repo](https://github.com/talelksiksi/warehouse-dashboard-backend) for the API/WebSocket server.
