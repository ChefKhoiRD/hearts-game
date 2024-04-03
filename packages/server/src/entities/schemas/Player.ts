import { Schema, type } from '@colyseus/schema';
import { Hand } from './Hand';
import gameConfig from '../../game.config';

export type TPlayerOptions = Pick<Player, 'sessionId' | 'userId' | 'name' | 'avatarUri'>;

export class Player extends Schema {
  @type('string') public sessionId: string;
  @type('string') public userId: string;
  @type('string') public avatarUri: string = ''; // Default empty string if not provided
  @type('string') public name: string;

  // Blackjack-related properties
  @type(Hand) public hand: Hand = new Hand();

  @type('number') public money: number = gameConfig.initialPlayerMoney ?? 1000; // Providing a fallback value
  @type('number') public bet: number = gameConfig.initialPlayerBet ?? 0; // Providing a fallback value
  @type('boolean') public ready: boolean = false;
  @type('boolean') public autoReady: boolean = false;
  @type('string') public roundOutcome: string = '';

  constructor(options: TPlayerOptions) {
    super();
    this.sessionId = options.sessionId;            
    this.userId = options.userId;
    this.name = options.name;
    // Only set avatarUri if provided, otherwise, it remains the default empty string
    if (options.avatarUri) this.avatarUri = options.avatarUri;
  }
}
