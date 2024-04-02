import { Schema, type } from '@colyseus/schema';
import { Hand } from './schemas/Hand';
import gameConfig from '../game.config';

export type TPlayerOptions = Pick<Player, 'sessionId' | 'userId' | 'name' | 'avatarUri'>;

export class Player extends Schema {
  @type('string') public sessionId: string;
  @type('string') public userId: string;
  @type('string') public avatarUri: string;
  @type('string') public name: string;

  // Blackjack-related properties
  @type(Hand) hand: Hand = new Hand(); // Ensure hand is properly initialized

  @type('number') money: number = gameConfig.initialPlayerMoney;
  @type('number') bet: number = gameConfig.initialPlayerBet;
  @type('boolean') ready: boolean = false;
  @type('boolean') autoReady: boolean = false;
  @type('string') roundOutcome: string = '';

  // Constructor
  constructor({ name, userId, avatarUri, sessionId }: TPlayerOptions) {
    super();
    this.userId = userId;
    this.avatarUri = avatarUri;
    this.name = name;
    this.sessionId = sessionId;
  }
}
