import { handler } from './build/handler.js';
import express from 'express';

// [PI-PORT] Uncomment this when you want to pass in a specific port.
// const PORT = process.env.PORT || 8080;
const PORT = 8080;
const app = express();

// Any routes that need to be outside of SvelteKit's perview go here.
app.get('/health', (req, res) => {
    res.end('ok');
});

// "SvelteKit, handle everything else."
app.use(handler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

function shutdownServer() {
  console.log('Server shutting down.');
}

process.on('SIGINT', shutdownServer);
process.on('SIGTERM', shutdownServer);
