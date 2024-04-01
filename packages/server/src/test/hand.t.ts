import { Hand } from "../entities/schemas/Hand";
import { Card } from "../entities/schemas/Card";
import { CardValue } from "../entities/schemas/CardValue";

describe('Hand', () => {
    let hand: Hand;
  
    beforeEach(() => {
      hand = new Hand();
    });
  
    test('should calculate the score correctly', () => {
        // Create instances of CardValue
        const card1Value = new CardValue();
        card1Value.suit = '♠︎';
        card1Value.value = '5';
        
        const card2Value = new CardValue();
        card2Value.suit = '♥︎';
        card2Value.value = '5';
        
        const card3Value = new CardValue();
        card3Value.suit = '♥︎';
        card3Value.value = 'A';

        const card4Value = new CardValue();
        card4Value.suit = '♣︎';
        card4Value.value = 'A'; // Corrected assignment
        
        // Add cards with specific values
        console.log("Adding cards...");
        hand.addCard(true, card1Value);
        hand.addCard(true, card2Value);
        hand.addCard(true, card3Value);
        hand.addCard(true, card4Value);
    
        // Calculate the score
        console.log("Setting card values...");
        hand.calculateScore();
    
        // Verify the score calculation
        console.log("Score:", hand.score);
        console.log("Is Blackjack:", hand.isBlackjack);
        console.log("Is Busted:", hand.isBusted);
        expect(hand.score).toBe(12); // Assuming the values of '2', '3', and 'Q' add up to 15
        expect(hand.isBlackjack).toBe(false);
        expect(hand.isBusted).toBe(false);
    });
});
