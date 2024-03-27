import { BlackjackRoom } from '../rooms/BlackJackRoom';
import { Client } from 'colyseus';
import { Player } from '../entities/Player';

describe('BlackjackRoom playerHit', () => {
  let room: BlackjackRoom;
  let mockClient: Client;

  beforeEach(() => {
    room = new BlackjackRoom();
    mockClient = {
      sessionId: 'mock-session-id',
    } as Client;
  });

  it('should deal a new card to the player and broadcast the updated game state', () => {
    // Mock player and setup initial state
    const mockPlayer: Player = {
      sessionId: 'mock-session-id',
      hand: [],
      isStanding: false,
    };
    room.state.players.set('mock-session-id', mockPlayer);

    // Spy on broadcastGameUpdate method
    const mockBroadcastGameUpdate = jest.spyOn(room, 'broadcastGameUpdate');

    // Call playerHit method
    room.playerHit(mockClient);

    // Get the drawn card from the player's hand
    const drawnCard = mockPlayer.hand[mockPlayer.hand.length - 1];

    // Log the card drawn by the player
    // console.log('Player drew:', drawnCard);

    // Assert that the broadcastGameUpdate method was called
    expect(mockBroadcastGameUpdate).toHaveBeenCalledTimes(1);
  });
});
