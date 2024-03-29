import { Schema, ArraySchema, type } from '@colyseus/schema';
import { v4 as uuidv4 } from 'uuid';

// Define interface for player options
export interface TPlayerOptions {
  id?: string;
  name?: string;
  userId?: string;
  avatarUri?: string;
  sessionId?: string;
  hand?: ArraySchema<string>;
  isStanding?: boolean;
}

// Define Player class
export class Player extends Schema {
  @type('string')
  public id: string; // Player ID

  @type('string')
  public sessionId: string;

  @type('string')
  public userId: string;

  @type('string')
  public avatarUri: string;

  @type('string')
  public name: string; // Add the 'name' property

  @type('boolean')
  public talking: boolean = false;

  @type([ 'string' ])
  public hand: ArraySchema<string> = new ArraySchema<string>();

  @type('boolean')
  public isStanding = false;

  // Init
  constructor({ id, name, userId, avatarUri, sessionId, hand, isStanding }: Partial<TPlayerOptions> = {}) {
    super();
    // Initialize properties with provided values or default to empty strings
    this.id = id || generatePlayerId(); // Generate unique player ID
    this.userId = userId || '';
    this.avatarUri = avatarUri || '';
    this.name = name || '';
    this.sessionId = sessionId || '';

    // Initialize hand with an empty ArraySchema<string> if not provided
    this.hand = hand || new ArraySchema<string>();

    // Initialize isStanding with false if not provided
    this.isStanding = isStanding !== undefined ? isStanding : false;
  }
}

// Function to generate a unique player ID
function generatePlayerId(): string {
  return uuidv4();
}
