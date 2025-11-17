/* eslint-disable */
const express = require('express');
const next = require('next');

// Decide mode based on NODE_ENV; default to production if not set explicitly
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await app.prepare();
    const server = express();

    // Trust proxy (needed if behind Nginx for correct IP / protocol)
    server.set('trust proxy', true);

    // Health check endpoint
    server.get('/healthz', (req, res) => {
      res.json({ status: 'ok', env: dev ? 'development' : 'production', timestamp: Date.now() });
    });

    // Catch-all: delegate to Next.js
    server.all('*', (req, res) => handle(req, res));

    const httpServer = server.listen(PORT, () => {
      console.log(`> Server ready on http://localhost:${PORT} (dev=${dev})`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`\nReceived ${signal}, shutting down gracefully...`);
      httpServer.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
      // Force exit if not closed in 10s
      setTimeout(() => process.exit(1), 10000).unref();
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
