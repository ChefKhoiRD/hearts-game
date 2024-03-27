import { BlackjackRoom } from '../rooms/BlackJackRoom';
import { Client } from 'colyseus';

describe('BlackjackRoom', () => {
  let room: BlackjackRoom;
  let mockClient: jest.Mocked<Client>;

  beforeEach(() => {
    room = new BlackjackRoom();
    mockClient = {
      sessionId: 'mock-session-id',
      send: jest.fn(), // Mock the send method
    } as any as jest.Mocked<Client>; // Cast to 'any' first
  });

  describe('onJoin', () => {
    it('should allow client to join if maximum players not reached', () => {
      // Set up initial state with less than maximum number of players
      const maxPlayers = BlackjackRoom.MAX_PLAYERS;
      for (let i = 0; i < maxPlayers - 1; i++) {
        room.clients.push({ sessionId: `player-${i}` } as Client);
      }

      // Attempt to join another player
      room.onJoin(mockClient);

      // Assert that the player was added to the room's state
      expect(room.state.players.size).toBe(maxPlayers);

      // Assert that the 'send' method was not called with 'room-full'
      expect(mockClient.send).not.toHaveBeenCalledWith('room-full');
    });

    it('should send room-full message when maximum players reached', () => {
      // Set up initial state with maximum number of players
      const maxPlayers = BlackjackRoom.MAX_PLAYERS;
      for (let i = 0; i < maxPlayers; i++) {
        room.clients.push({ sessionId: `player-${i}` } as Client);
      }

      // Attempt to join another player
      room.onJoin(mockClient);

      // Assert that the 'send' method was called with 'room-full'
      expect(mockClient.send).toHaveBeenCalledWith('room-full');
    });
  });
});

