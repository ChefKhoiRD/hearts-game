import React, { useState } from 'react';
import { Client } from 'colyseus.js'; // Import the Client class

interface MyComponentProps {
  // Define any props needed by your component
}

const MyComponent: React.FC<MyComponentProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleJoinRoom = async () => {
    try {
      // Create an instance of the Client class
      const client = new Client('ws://localhost:2567'); // Replace with your Colyseus server URL
      
      // Connect to the Colyseus server
      await client.connect();

      // Attempt to join a specific room
      const room = await client.joinOrCreate('my_room_name');

      // If successful, navigate to the game room or update UI accordingly
      console.log('Joined room:', room);
    } catch (error) {
      // Handle any errors that occur during the join process
      console.error('Error joining room:', error);
      setErrorMessage('Error joining room. Please try again.');
    }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default MyComponent;
