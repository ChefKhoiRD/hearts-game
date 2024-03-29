import { Client } from 'colyseus';
import { BlackjackRoom } from '../rooms/BlackJackRoom';
import { Player } from '../entities/Player';

describe('onJoin method', () => {
  let blackjackRoom: BlackjackRoom;

  beforeEach(() => {
    blackjackRoom = new BlackjackRoom();
  });

  test('should add players to BlackjackRoom up to maximum allowed', () => {
    const maxPlayers = BlackjackRoom.MAX_PLAYERS;
    const excessPlayers = 3; // Number of players exceeding the maximum allowed

    const options: any = {}; // Mock options for players

    // Simulate joining maximum allowed players
    for (let i = 0; i < maxPlayers; i++) {
      const client: Client = { sessionId: `client_${i}` } as Client; // Unique client object for each player
      blackjackRoom.onJoin(client, options);
    }

    // Simulate joining excess players
    for (let i = 0; i < excessPlayers; i++) {
      const client: Client = { sessionId: `client_${maxPlayers + i}` } as Client; // Unique client object for each excess player
      blackjackRoom.onJoin(client, options);
    }

    // Assert that only maximum allowed players are added to BlackjackRoom
    expect(blackjackRoom.state.players.size).toBe(maxPlayers);
  });

  // You can add more test cases to cover other scenarios such as room full, error handling, etc.
});
