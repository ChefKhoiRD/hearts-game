import { MonitorOptions, monitor } from '@colyseus/monitor';
import { Server } from 'colyseus';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import { WebSocketTransport } from '@colyseus/ws-transport';
import path from 'path';
import { GAME_NAME } from './shared/Constants';
import { StateHandlerRoom } from './rooms/StateHandlerRoom';
import { BlackjackRoom } from './rooms/BlackJackRoom'; // Import BlackjackRoom
import { playerHit, playerStand } from './playerActions'; // Import playerHit and playerStand functions

dotenv.config({ path: '../../.env' });

const app: Application = express();
const router = express.Router();
const port: number = Number(process.env.PORT) || 3001;

const server = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
  }),
});

// Create an instance of BlackjackRoom
const blackjackRoom = new BlackjackRoom();

// Game Rooms
server
  .define(GAME_NAME, StateHandlerRoom)
  .filterBy(['channelId']);

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));
}

// If you don't want people accessing your server stats, comment this line.
router.use('/colyseus', monitor(server as Partial<MonitorOptions>));

// Fetch token from developer portal and return to the embedded app
router.post('/token', async (req: Request, res: Response) => {
  try {
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

    const { access_token } = (await response.json()) as { access_token: string };
    res.send({ access_token });
  } catch (error) {
    console.error('Error fetching token:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint for player hit
// API endpoint for player hit
router.post('/hit', async (req: Request, res: Response) => {
  try {
    const playerId = req.body.client.sessionId; // Use client sessionId as playerId
    const response = await playerHit(playerId, blackjackRoom); // Pass playerId and room instance to playerHit function
    console.log(response); // Log response in server console
    res.json(response);
  } catch (error) {
    console.error('Error hitting player:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint for player stand
router.post('/stand', async (req: Request, res: Response) => {
  try {
    const playerId = req.body.client.sessionId; // Use client sessionId as playerId
    const response = await playerStand(playerId, blackjackRoom); // Pass the playerId to playerStand function
    console.log(response); // Log response in server console
    res.json(response);
  } catch (error) {
    console.error('Error standing player:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Using a flat route in dev to match the vite server proxy config
app.use(process.env.NODE_ENV === 'production' ? '/api' : '/', router);

server.listen(port).then(() => {
  console.log(`App is listening on port ${port} !`);
});
