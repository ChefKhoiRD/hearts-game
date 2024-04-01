import { Card } from './Card';
import { CardValue } from './CardValue';
import { availableSuits, availableValues } from './cardValues';

export class Deck {
  cards: Card[];

    constructor() {
        this.cards = [];
        this.initializeDeck();
    }

    // Initialize the deck with standard cards
    initializeDeck() {
        for (const suit of availableSuits) {
            for (const value of availableValues) {
            const cardValue = new CardValue();
            cardValue.suit = suit;
            cardValue.value = value;
    
            const card = new Card(true); // Assume all cards are initially visible
            card.value = cardValue;
    
            this.cards.push(card);
            }
        }
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
    dealCard(): Card | undefined {
        return this.cards.pop();
    }
}
