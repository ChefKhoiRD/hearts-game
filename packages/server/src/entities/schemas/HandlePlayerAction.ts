import { GameState } from "../GameState";
import { Player } from "../Player";
import { CardValue } from "./CardValue";
import { Card } from "./Card";

export class PlayerActionHandler {
    static hit(gameState: GameState, playerId: string) {
        // Logic for handling the "hit" action
        const player = gameState.players[playerId];
        const card = gameState.dealCard(); // Assume dealCard() deals a card from the deck
        if (player && card) {
          // Set the value property of the card using CardValue class
          const cardValue = new CardValue();
          cardValue.suit = card.value?.suit; // Access the suit property through card.value
          cardValue.value = card.value?.value; // Access the value property through card.value
          card.value = cardValue;
          player.hand.addCard(card); // Use addCard method to add the dealt card to the player's hand
        }
    }

    static stand(gameState: GameState, playerId: string) {
        // Logic for handling the "stand" action
        // Additional logic if necessary
    }

    // Other player actions can be defined here...
}
