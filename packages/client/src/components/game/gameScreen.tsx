import React, { useState } from 'react';

const BlackjackGame = () => {
  const [message, setMessage] = useState<string>('');

  const handlePlayerHit = async () => {
    try {
      const response = await fetch('/api/hit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ client: { sessionId: 'your-client-session-id' } })
      });

      if (response.ok) {
        setMessage('Player hit successful');
      } else {
        setMessage(`Player hit failed: ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error hitting player: ${error.message}`);
      } else {
        setMessage(`Error hitting player: ${String(error)}`);
      }
    }
  };

  const handlePlayerStand = async () => {
    try {
      const response = await fetch('/api/stand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ client: { sessionId: 'your-client-session-id' } })
      });

      if (response.ok) {
        setMessage('Player stand successful');
      } else {
        setMessage(`Player stand failed: ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error standing player: ${error.message}`);
      } else {
        setMessage(`Error standing player: ${String(error)}`);
      }
    }
  };

  return (
    <div>
      <h1>Blackjack Game</h1>
      <button onClick={handlePlayerHit}>Hit</button>
      <button onClick={handlePlayerStand}>Stand</button>
      <p>{message}</p>
    </div>
  );
};

export default BlackjackGame;
