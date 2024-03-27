// Import necessary modules
import { Schema, ArraySchema, type } from '@colyseus/schema';

// Define type for player options
export type TPlayerOptions = Pick<Player, 'sessionId' | 'userId' | 'name' | 'avatarUri' | 'talking' | 'hand' | 'isStanding'>;

// Define Player class
export class Player extends Schema {
  @type('string')
  public sessionId: string;

  @type('string')
  public userId: string;

  @type('string')
  public avatarUri: string;

  @type('string')
  public name: string;

  @type('boolean')
  public talking: boolean = false;

  @type(['string'])
  public hand = new ArraySchema<string>();

  @type('boolean')
  public isStanding = false;

  // Init
  constructor({name, userId, avatarUri, sessionId, hand, isStanding}: Partial<TPlayerOptions> = {}) {
    super();
    // Initialize properties with provided values or default to empty strings
    this.userId = userId || '';
    this.avatarUri = avatarUri || '';
    this.name = name || '';
    this.sessionId = sessionId || '';

    // Initialize hand with an empty ArraySchema<string> if not provided
    this.hand = hand !== undefined ? hand : new ArraySchema<string>();

    // Initialize isStanding with false if not provided
    this.isStanding = isStanding !== undefined ? isStanding : false;
  }
}