import { Hand } from "./Hand";

type roundOutcome = 'bust' | 'win' | 'lose' | 'draw';

export function computeRoundOutcome(
    playerHand: Hand,
    dealerHand: Hand,
    bet: number
): {
    moneyChange: number;
    outcome: roundOutcome;
} {
    // Check if player busted, player loses regardless of dealer's hand
    if (playerHand.isBusted) {
        return {
            moneyChange: -bet,
            outcome: 'bust',
        };
    }

    // Player wins with a Blackjack and dealer does not have a Blackjack
    if (playerHand.isBlackjack && !dealerHand.isBlackjack) {
        return {
            moneyChange: bet * 1.5, // Payout at 3:2 rate for Blackjack
            outcome: 'win',
        };
    }

    // Dealer busts or player has higher score (and not busted), player wins
    if (dealerHand.isBusted || (playerHand.score > dealerHand.score)) {
        return {
            moneyChange: bet, // Straight win, player wins their bet back plus the same amount
            outcome: 'win',
        };
    }

    // Draw conditions - scores are equal and both have/don't have blackjack
    if (playerHand.score === dealerHand.score && 
        playerHand.isBlackjack === dealerHand.isBlackjack) {
        return {
            moneyChange: 0, // Bet returned to player
            outcome: 'draw',
        };
    }

    // If none of the above conditions are met, the player loses
    return {
        moneyChange: -bet, // Player loses their bet
        outcome: 'lose',
    };
}
