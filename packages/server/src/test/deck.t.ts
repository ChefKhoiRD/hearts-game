import { Deck } from '../entities/schemas/Deck';
import { Card } from '../entities/schemas/Card';

describe('Deck', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck();
  });

  test('should initialize, shuffle, and deal cards', () => {
    // Log the initial deck
    console.log('Initial deck:');
    console.log(deck.cards);

    // Shuffle the deck
    console.log('Shuffling deck...');
    deck.shuffle();
    console.log('Shuffled deck:');
    console.log(deck.cards);

    // Deal cards from the deck
    console.log('Dealing cards:');
    const dealtCards: Card[] = [];
    for (let i = 0; i < 5; i++) {
      const card = deck.dealCard();
      if (card) {
        dealtCards.push(card);
        console.log('Dealt card:', card);
      } else {
        console.log('No more cards in the deck!');
      }
    }

    // Log the remaining deck
    console.log('Remaining deck:');
    console.log(deck.cards);

    // Assert that the dealt cards are removed from the deck
    expect(deck.cards.length).toBe(52 - dealtCards.length);
  });
});
