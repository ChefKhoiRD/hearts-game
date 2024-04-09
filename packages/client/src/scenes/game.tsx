import React, { useState, useEffect } from 'react';
import { Client, Room } from 'colyseus.js';
import { MapSchema } from '@colyseus/schema';

interface Card {
  value: string;
  suit: string;
}

interface Player {
  sessionId: string;
  name: string;
  ready: boolean;
  hand: Card[];
  score: number;
}

interface GameState {
  players: MapSchema<Player>;
  currentTurn: string;
}

const Game = () => {
  const [room, setRoom] = useState<Room<GameState> | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const client = new Client('ws://localhost:3001');
    let isActive = true;

    const joinOrCreateRoom = async () => {
      try {
        const joinedRoom = await client.joinOrCreate<GameState>("blackjack");
        if (!isActive) {
          joinedRoom.leave();
          return;
        }
        setRoom(joinedRoom);

        joinedRoom.onStateChange.once(state => {
          if (isActive) {
            setGameState(state);
          }
        });

        joinedRoom.onStateChange(state => {
          if (isActive) {
            setGameState(state);
          }
        });
      } catch (error) {
        if (isActive) {
          console.error("Join or create room failed:", error);
          setError("Failed to connect to the game server.");
        }
      }
    };

    joinOrCreateRoom();

    return () => {
      isActive = false;
      room?.leave();
    };
  }, []);

  const sendRoomAction = (actionType: string) => {
    if (!room) return;
    room.send(actionType);
  };

  if (error) return <p>Error: {error}</p>;
  if (!room) return <p>Connecting to game server...</p>;
  if (!gameState) return <p>Loading game...</p>;

  const toggleReady = () => sendRoomAction('ready');

  const playersArray = gameState ? Array.from(gameState.players.values()) : [];

  return (
    <div>
      <h1>Blackjack Game</h1>
      <p>Current Turn: {gameState.currentTurn}</p>
      {playersArray.map((player) => (
        <div key={player.sessionId}>
          <p>{player.name}: {player.score} Points</p>
          <ul>
          {player.hand && Array.isArray(player.hand) && player.hand.map((card, index) => (
            <li key={index}>{card.value} of {card.suit}</li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={() => sendRoomAction('hit')}>Hit</button>
      <button onClick={() => sendRoomAction('stand')}>Stand</button>
      <button onClick={toggleReady}>{gameState.players.get(room.sessionId)?.ready ? "Unready" : "Ready"}</button>
    </div>
  );
};

export default Game;
