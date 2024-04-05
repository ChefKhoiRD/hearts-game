// src/setupColyseusServer.ts
import { Server } from 'colyseus';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { createServer } from 'http';
import { Application } from 'express';
import { BlackjackRoom } from './rooms/BlackjackRoom';

export function setupColyseusServer(app: Application) {
  const gameServer = new Server({
    transport: new WebSocketTransport({
      server: createServer(app),
    }),
  });

  gameServer.define('blackjack', BlackjackRoom);

  return gameServer;
}
