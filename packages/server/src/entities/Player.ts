import { Schema, type } from '@colyseus/schema';
import { Hand } from './schemas/Hand';
import gameConfig from '../game.config';

export type TPlayerOptions = Pick<Player, 'sessionId' | 'userId' | 'name' | 'avatarUri' >;

export class Player extends Schema {
  @type('string') public sessionId: string;
  @type('string') public userId: string;
  @type('string') public avatarUri: string;
  @type('string') public name: string;

  // Blackjack-related properties
  @type(Hand) hand = new Hand(); // Player's hand in blackjack
  @type('number') money: number = gameConfig.initialPlayerMoney; // Player's money in blackjack
  @type('number') bet: number = gameConfig.initialPlayerBet; // Player's bet in blackjack
  @type('boolean') ready: boolean = false; // Player's readiness status in blackjack
  @type('boolean') autoReady: boolean = false; // Player's auto-ready status in blackjack
  @type('string') roundOutcome: string = ''; // Outcome of the round for the player in blackjack

  // Init
  constructor({ name, userId, avatarUri, sessionId }: TPlayerOptions) {
    super();
    this.userId = userId;
    this.avatarUri = avatarUri;
    this.name = name;
    this.sessionId = sessionId;
  }
}
