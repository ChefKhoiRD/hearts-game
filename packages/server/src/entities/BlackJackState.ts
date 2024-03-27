// blackjackState.js
import { Schema, MapSchema, ArraySchema, type } from "@colyseus/schema";

class Player extends Schema {
    @type(['string'])
    hand = new ArraySchema<string>();

    @type('boolean')
    isStanding = false;

    // Other properties and methods specific to each player
}

export class BlackjackState extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    @type(['string'])
    deck = new ArraySchema<string>();

    @type('string')
    currentTurn = "";

    @type('number')
    currentPlayerIndex = 0;

    @type('string')
    gameStatus = 'waiting';

    // Other properties and methods specific to the blackjack game state
}

