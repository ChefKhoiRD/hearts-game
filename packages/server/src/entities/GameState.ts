// GameState.ts
import { MapSchema, Schema, type } from '@colyseus/schema';
import { Hand } from './schemas/Hand';
import { Player, TPlayerOptions } from './schemas/Player'; // Ensure this import is correctly referenced
import { Card } from './schemas/Card';
import { Deck } from './schemas/Deck';
import { computeRoundOutcome } from './schemas/RoundOutcome';

export class GameState extends Schema {
  @type(Hand) dealerHand: Hand = new Hand();
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
  }

  getDeckSize(): number {
    return this.deck.getDeckSize();
  }

  dealCard(visible: boolean): Card | undefined {
    const card = this.deck.dealCard();
    if (card) {
      card.visible = visible;
    }
    return card;
  }

  createPlayer(sessionId: string, playerOptions: TPlayerOptions): void {
    const existingPlayer = this.players.get(sessionId);
    if (!existingPlayer) {
      const player = new Player({...playerOptions, sessionId});
      this.players.set(sessionId, player);
      if (!this.currentTurnPlayerId) {
        this.currentTurnPlayerId = sessionId;
      }
    }
  }

  removePlayer(sessionId: string): void {
    if (this.players.has(sessionId)) {
      this.players.delete(sessionId);
    }
  }

  // Assuming TPlayerOptions should include sessionId based on your error message.
  addPlayer(player: Player): void {
    console.log("Adding player:", player);
    // Directly pass the existing player properties as TPlayerOptions
    // Including sessionId in TPlayerOptions as required
    const playerOptions: TPlayerOptions = { 
      sessionId: player.sessionId, // Ensure sessionId is included
      userId: player.userId, 
      name: player.name, 
      avatarUri: player.avatarUri 
    };
    this.createPlayer(player.sessionId, playerOptions);
  }

  determineCurrentTurnPlayer(): Player | undefined {
    if (this.players.size === 0) {
      return undefined;
    }
    const firstPlayerId = this.players.keys().next().value;
    const currentPlayer = this.players.get(this.currentTurnPlayerId) || this.players.get(firstPlayerId);
    return currentPlayer;
  }

  handlePlayerAction(playerId: string, action: string): void {
    const player = this.players.get(playerId);
    if (!player) {
      console.error(`Player with ID ${playerId} not found.`);
      return;
    }

    switch (action) {
      case 'hit':
        const card = this.dealCard(true);
        if (card) {
          player.hand.addCard(card);
        }
        break;
      case 'stand':
        // Logic for stand action, potentially ending the player's turn
        break;
      default:
        console.error(`Invalid action: ${action}`);
        break;
    }
  }

  determineRoundOutcome(): void {
    // Iterate through all players to compute and update each outcome
    this.players.forEach((player, sessionId) => {
        if (!player || !player.hand) return; // Ensure player and their hand exist

        // Assume a fixed bet for simplicity; adjust as needed
        const betAmount = 100; // Placeholder bet amount, adjust based on your game's betting logic

        // Compute outcome using the player's hand and the dealer's hand
        const outcome = computeRoundOutcome(player.hand, this.dealerHand, betAmount);

        // Apply the outcome to the player's state
        player.money += outcome.moneyChange; // Adjust player's money based on the outcome
        player.roundOutcome = outcome.outcome; // Update player's round outcome state

        // Optionally, log the outcome for debugging
        console.log(`Player ${sessionId} outcome: ${outcome.outcome}, money change: ${outcome.moneyChange}`);
    });

    // Additional logic to reset hands, prepare for next round, etc., as necessary
  }

  resetHands(): void {
    this.dealerHand.clear();
    this.players.forEach(player => player.hand.clear());
  }
}
