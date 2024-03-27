import { BlackjackRoom } from '../rooms/BlackJackRoom';
import { Client } from 'colyseus';

describe('BlackjackRoom', () => {
  let room: BlackjackRoom;

  beforeEach(() => {
    room = new BlackjackRoom();
  });

  describe('shuffleDeck', () => {
    it('should shuffle the deck correctly', () => {
      // Call the shuffleDeck method to shuffle the deck
      room.shuffleDeck();

      // Get the shuffled deck from the room's state
      const shuffledDeck = room.state.deck.toArray();

      // Log the shuffled deck to the console
      // console.log('Shuffled Deck:', shuffledDeck);

      // Ensure that the shuffled deck is not equal to the initial deck
      expect(shuffledDeck).not.toEqual(room.initialDeck().toArray());
    });
  });
});
