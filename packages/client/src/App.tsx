import * as React from 'react';
import { StartScreen } from './components/start/StartScreen';
import { joinRoom, sendMessage, listenForMessages } from './colyseusClient.js';

async function startGame() {
  const room = await joinRoom('your-room-name');

  // Send a message to the server
  sendMessage(room, 'player-hit', { playerId: 'player-id' });

  // Listen for updates from the server
  listenForMessages(room, 'game-update', (message) => {
      // Handle game update message from the server
      console.log('Received game update:', message);
  });
}
startGame();

export default function App() {
  return (
    <StartScreen />
  );
}
