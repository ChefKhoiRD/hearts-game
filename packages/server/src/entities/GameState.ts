import { MapSchema, Schema, type } from '@colyseus/schema';
import { Hand } from './schemas/Hand';
import { Player } from './schemas/Player';
import { Card } from './schemas/Card';
import { Deck } from './schemas/Deck';

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

  dealCard(): Card | undefined {
    return this.deck.dealCard(); // Assume dealCard now handles card visibility appropriately
  }

  addPlayer(player: Player): void {
    console.log("Adding player:", player);
    this.players.set(player.sessionId, player);
    // Optionally, set the first player as the current turn player if not already set
    if (!this.currentTurnPlayerId) {
      this.currentTurnPlayerId = player.sessionId;
    }
  }

  determineCurrentTurnPlayer(): Player | undefined {
    if (this.players.size === 0) {
      return undefined;
    }
    // Logic remains the same, efficiently determining the current turn player
    const firstPlayerId = this.players.keys().next().value;
    return this.players.get(this.currentTurnPlayerId) || this.players.get(firstPlayerId);
  }

  handlePlayerAction(playerId: string, action: string) {
    const player = this.players.get(playerId);
    if (!player) {
      console.error(`Player with ID ${playerId} not found.`);
      return;
    }

    switch (action) {
      case 'hit':
        const card = this.dealCard(); // Visibility handled elsewhere
        if (card) player.hand.addCard(card);
        break;
      case 'stand':
        // Stand logic here
        break;
      default:
        console.error(`Invalid action: ${action}`);
    }
  }

  determineRoundOutcome() {
    // This method might need adjustment based on how bets are handled
    const player = this.players.get(this.currentTurnPlayerId);
    if (!player) {
      console.error("Current turn player not found.");
      return;
    }
    // Implementing round outcome logic...
  }

  resetHands() {
    this.dealerHand.clear();
    this.players.forEach(player => player.hand.clear());
  }
}
