import { BlackjackRoom } from '../rooms/BlackJackRoom';
import { Client } from 'colyseus';
import { Player } from '../entities/Player';

describe('BlackjackRoom playerStand', () => {
  let room: BlackjackRoom;
  let mockClient: Client;

  beforeEach(() => {
    room = new BlackjackRoom();
    mockClient = {
      sessionId: 'mock-session-id',
    } as Client;
  });

  it('should set the player as standing and broadcast the updated game state', () => {
    // Mock player and setup initial state
    const mockPlayer: Player = {
      sessionId: 'mock-session-id',
      hand: [],
      isStanding: false,
    };
    room.state.players.set('mock-session-id', mockPlayer);

    // Spy on broadcastGameUpdate method
    const mockBroadcastGameUpdate = jest.spyOn(room, 'broadcastGameUpdate');

    // Call playerStand method
    room.playerStand(mockClient);

    // Assert that the player's isStanding flag has been set to true
    expect(mockPlayer.isStanding).toBe(true);

    // Assert that the broadcastGameUpdate method was called
    expect(mockBroadcastGameUpdate).toHaveBeenCalledTimes(1);
  });
});
