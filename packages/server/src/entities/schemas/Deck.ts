import { Card } from './Card';
import { CardValue, Suit, CardValueEnum } from './CardValue'; // Assuming enums are exported from CardValue.ts

export class Deck {
  cards: Card[] = [];

  constructor() {
    this.initializeDeck();
  }

  // Initialize the deck with standard cards
  initializeDeck() {
    Object.values(Suit).forEach(suit => {
      Object.values(CardValueEnum).forEach(value => {
        // Create a new card for each suit and value combination
        const card = new Card(suit, value, true); // Visibility can be adjusted based on game logic
        this.cards.push(card);
      });
    });
  }

  // Shuffle the deck
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // Get the size of the deck
  getDeckSize(): number {
    return this.cards.length;
  }

  // Deal a card from the top of the deck
  dealCard(visible: boolean = true): Card | undefined {
    const card = this.cards.pop();
    if (card) {
      card.visible = visible;
    }
    return card;
  }
}
