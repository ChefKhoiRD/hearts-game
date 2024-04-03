import { GameState } from "../GameState";
// Assuming CardValueEnum and Suit are exported from CardValue.ts or their respective files
import { CardValueEnum, Suit } from "./CardValue";

export class PlayerActionHandler {
    static hit(gameState: GameState, playerId: string) {
        // Logic for handling the "hit" action
        const player = gameState.players.get(playerId); // Assuming players is a Map
        const card = gameState.dealCard(); // Adjusted to match the new dealCard method signature
        
        if (player && card) {
            player.hand.addCard(card); // Directly add the dealt card to the player's hand
            console.log(`Player ${playerId} hits.`);
            // Recalculate player's score or handle game state updates as needed here
        } else {
            console.error(`Player ${playerId} not found in the game state or failed to deal a card.`);
        }
    }

    static stand(gameState: GameState, playerId: string) {
        // Logic for handling the "stand" action
        const player = gameState.players.get(playerId); // Adjusted for Map access
        
        if (player) {
            console.log(`Player ${playerId} stands.`);
            // Perform any necessary actions when a player stands, e.g., change turn
        } else {
            console.error(`Player ${playerId} not found in the game state.`);
        }
    }

    // Other player actions can be defined here...
}
