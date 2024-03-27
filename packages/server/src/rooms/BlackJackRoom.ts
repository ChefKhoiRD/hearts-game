import { Room, Client} from 'colyseus';
import { ArraySchema, MapSchema } from '@colyseus/schema';
import { BlackjackState } from '../entities/BlackJackState';
import { Player } from '../entities/Player';

export class BlackjackRoom extends Room<BlackjackState> {
    static MAX_PLAYERS = 4;
    static CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    static CARD_SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    public state: BlackjackState = new BlackjackState();

    constructor() {
        super();
        this.state = new BlackjackState();
    }

    onCreate(options: any): void {
        this.setState(new BlackjackState()); // Ensure proper initialization of the state
    }

    onJoin(client: Client): void {
        if (this.state && this.state.players && this.clients.length <= BlackjackRoom.MAX_PLAYERS) {
            const newPlayer = new Player();
            this.state.players.set(client.sessionId, newPlayer);
        } else {
            client.send('room-full');
        }
    }

    initialDeck(): ArraySchema<string> {
        const deck = new ArraySchema<string>(); // Initialize deck as ArraySchema<string>
        for (let value of BlackjackRoom.CARD_VALUES) {
            for (let suit of BlackjackRoom.CARD_SUITS) {
                deck.push(`${value} of ${suit}`);
            }
        }
        return deck;
    }

    shuffle(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    shuffleDeck(): void {
        const deck = this.initialDeck().toArray(); // Initialize the deck and convert it to an array
        this.state.deck = new ArraySchema<string>(...this.shuffle(deck)); // Shuffle the deck and set it to the state
    }
    
    drawCard(): string | undefined {
        if (this.state.deck.length === 0) {
            this.shuffleDeck();
        }
        return this.state.deck.pop();
    }

     // Method to broadcast game update to all clients
     broadcastGameUpdate(): void {
        // Get the updated game state from the room's state
        const gameState = this.state.toJSON();

        // Broadcast the serialized game state to all clients
        this.broadcast('game-update', gameState);
    }
    
    // Method to handle player hitting
    playerHit(client: Client): void {
        const player = this.state.players.get(client.sessionId);
        if (player && !player.isStanding) {
            const card = this.drawCard(); // Draw a card from the deck
            if (card) {
                player.hand.push(card); // Add the card to the player's hand
            }
            this.broadcastGameUpdate(); // Broadcast the updated game state
        }
    }

    // Method to handle player standing
    playerStand(client: Client): void {
        const player = this.state.players.get(client.sessionId);
        if (player && !player.isStanding) {
            player.isStanding = true; // Set the player as standing
            this.broadcastGameUpdate(); // Broadcast the updated game state
        }
    }

}
