import { Schema, type, ArraySchema } from '@colyseus/schema';
import { Card } from './Card';
import { CardValueEnum } from './CardValue'; // Ensure this is correctly imported

export class Hand extends Schema {
    @type('number') score: number = 0; // Initialize score to 0
    @type('boolean') isBlackjack: boolean = false;
    @type('boolean') isBusted: boolean = false;
    @type([Card]) cards = new ArraySchema<Card>();
  
    public addCard(card: Card) {
        this.cards.push(card);
        // Recalculate the score every time a new card is added
        this.calculateScore();
    }
  
    public clear() {
        this.cards.clear();
        this.clearScore();
    }
  
    private clearScore() {
        this.score = 0;
        this.isBlackjack = false;
        this.isBusted = false;
    }
  
    public calculateScore() {
        let tmpScore = 0;
        let numberOfAces = 0;

        this.cards.forEach(card => {
            if (card.value) { // Ensure card.value is not undefined
                const numericValue = card.value.numericValue;
                tmpScore += numericValue;

                if (card.value.value === CardValueEnum.Ace) {
                    numberOfAces++;
                }
            }
        });

        // Adjust for Aces being 1 or 11
        while (tmpScore > 21 && numberOfAces > 0) {
            tmpScore -= 10; // Subtract 10 to count an Ace as 1 instead of 11
            numberOfAces--;
        }

        this.score = tmpScore;
        this.isBlackjack = this.score === 21 && this.cards.length === 2;
        this.isBusted = this.score > 21;
    }
}
