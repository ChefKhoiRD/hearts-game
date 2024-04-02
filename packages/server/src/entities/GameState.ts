import { MapSchema, Schema, type } from '@colyseus/schema';
import { Hand } from './schemas/Hand';
import { Player } from './Player';
import { Card } from './schemas/Card';
import { Deck } from './schemas/Deck';

export class GameState extends Schema {
  @type(Hand) dealerHand = new Hand();
  @type({ map: Player }) players = new MapSchema<Player>();
  @type('string') roundState: 'idle' | 'dealing' | 'turns' | 'end' = 'idle';
  @type('string') currentTurnPlayerId: string = '';
  @type('uint64') currentTurnTimeoutTimestamp: number = 0;
  @type('uint64') nextRoundStartTimestamp: number = 0;

  private deck: Deck = new Deck();

  constructor() {
    super();
    this.deck.initializeDeck();
    this.deck.shuffle();
  };

  // Get the size of the deck
  getDeckSize(): number {
    return this.deck.getDeckSize();
  };

  dealCard(): Card | undefined {
    return this.deck.dealCard();
  };

  addPlayer(player: Player): void {
    this.players[player.sessionId] = player;
    if (!this.currentTurnPlayerId) {
      this.currentTurnPlayerId = player.sessionId;
    }
  };

  determineCurrentTurnPlayer(): Player | undefined {
    // Check if there are any players in the game
    if (Object.keys(this.players).length === 0) {
      return undefined; // No players in the game
    }
  
    // If there's no current turn player ID set, select the first player as the current turn player
    if (!this.currentTurnPlayerId) {
      return this.players['1']; // Assuming player IDs start from 1
    }
  
    // Find the player with the current turn player ID
    const currentPlayer = Object.values(this.players).find(player => player.sessionId === this.currentTurnPlayerId);
    
    return currentPlayer; // Return the player with the current turn player ID
  };
  
  // Handle a player's action (e.g., hit or stand)
  handlePlayerAction(playerId: string, action: string) {
    // Retrieve the player from the players map using the playerId
    const player = this.players[playerId];
    
    // Check if the player exists
    if (!player) {
        console.error(`Player with ID ${playerId} not found.`);
        return;
    }

    // Handle different types of actions
    switch (action) {
        case 'hit':
            // Logic for when the player chooses to hit
            // For example:
            const card = this.dealCard(); // Deal a card from the deck
            if (card) {
                player.hand.addCard(card); // Add the dealt card to the player's hand
            }
            break;
        case 'stand':
            // Logic for when the player chooses to stand
            // For example:
            // Nothing needs to be done here since the player is standing
            break;
        // Add cases for other actions like doubling down, splitting, etc.
        default:
            console.error(`Invalid action: ${action}`);
            break;
    }
  };

  // Determine the outcome of the current round
  determineRoundOutcome() {
    // Your logic to determine round outcome goes here
  };

  // Start the next round
  startNextRound() {
    // Your logic to start the next round goes here
  };
}
