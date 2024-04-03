import { MonitorOptions, monitor } from '@colyseus/monitor';
import { Server } from 'colyseus';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import { WebSocketTransport } from '@colyseus/ws-transport';
import path from 'path';
import { BlackjackRoom } from './rooms/BlackjackRoom';
import { GameState } from './entities/GameState';

dotenv.config({ path: '../../.env' });

const app: Application = express();
const router = express.Router();
const port: number = Number(process.env.PORT) || 3001;

const server = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
  }),
});

// Define BlackjackRoom
server.define('blackjack', BlackjackRoom);

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));
}

// If you don't want people accessing your server stats, comment this line.
router.use('/colyseus', monitor(server as Partial<MonitorOptions>));

// Fetch token from developer portal and return to the embedded app
router.post('/token', async (req: Request, res: Response) => {
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: req.body.code,
    }),
  });

  const { access_token } = (await response.json()) as {
    access_token: string;
  };

  res.send({ access_token });
});

// Using a flat route in dev to match the vite server proxy config
app.use(process.env.NODE_ENV === 'production' ? '/api' : '/', router);

server.listen(port).then(() => {
  console.log(`App is listening on port ${port} !`);
});
