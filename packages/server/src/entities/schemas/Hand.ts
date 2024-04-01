import { Schema, type, ArraySchema } from '@colyseus/schema';
import { Card } from './Card';
import { CardValue } from './CardValue';

export class Hand extends Schema {
    @type('number') score: number;
    @type('boolean') isBlackjack: boolean = false;
    @type('boolean') isBusted: boolean = false;
    @type([Card]) cards = new ArraySchema<Card>();
  
    public addCard(visible?: boolean, value?: CardValue) {
        const card = new Card(visible);
        card.value = value; // Set the value property
        this.cards.push(card);
        if (visible === false) this.clearScore();
        else this.calculateScore();
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
        let tmpScore = this.cards
          .map((c) => c.value!.numericValue)
          .reduce((a, b) => a + b);
      
        let numberOfAces = this.cards.filter((c) => c.value!.value === 'A').length;
        while (tmpScore > 21 && numberOfAces > 0) {
          tmpScore -= 10;
          numberOfAces--;
        }
      
        this.score = tmpScore;
        this.isBlackjack = tmpScore === 21 && this.cards.length === 2;
        this.isBusted = tmpScore > 21;
      }
  }