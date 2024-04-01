import { Schema, MapSchema, type } from '@colyseus/schema';
import { TPlayerOptions, Player } from './Player';
import { Hand } from './schemas/Hand';

export interface IState {
  roomName: string;
  channelId: string;
}

export class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();

  @type('string') public roomName: string;
  @type('string') public channelId: string;

  serverAttribute = 'this attribute wont be sent to the client-side';

  // Blackjack-related properties
  @type(Hand) dealerHand = new Hand(); // Dealer's hand in blackjack
  @type('string') roundState: 'idle' | 'dealing' | 'turns' | 'end' = 'idle'; // Current round state in blackjack
  @type('string') currentTurnPlayerId: string; // ID of the player whose turn it is in blackjack
  @type('uint64') currentTurnTimeoutTimestamp: number = 0; // Timestamp for the end of the current player's turn
  @type('uint64') nextRoundStartTimestamp: number = 0; // Timestamp for the start of the next round in blackjack

  // Init
  constructor(attributes: IState) {
    super();
    this.roomName = attributes.roomName;
    this.channelId = attributes.channelId;
  }

  private _getPlayer(sessionId: string): Player | undefined {
    return Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
  }

  createPlayer(sessionId: string, playerOptions: TPlayerOptions, isAdmin: boolean) {
    const existingPlayer = Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
    if (existingPlayer == null) {
      this.players.set(playerOptions.userId, new Player({ ...playerOptions, sessionId }, isAdmin));
    }
  }

  removePlayer(sessionId: string) {
    const player = Array.from(this.players.values()).find((p) => p.sessionId === sessionId);
    if (player != null) {
      this.players.delete(player.userId);
    }
  }

  startTalking(sessionId: string) {
    const player = this._getPlayer(sessionId);
    if (player != null) {
      player.talking = true;
    }
  }

  stopTalking(sessionId: string) {
    const player = this._getPlayer(sessionId);
    if (player != null) {
      player.talking = false;
    }
  }
}
