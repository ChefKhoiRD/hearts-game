import { Room, Client} from 'colyseus';
import { ArraySchema } from '@colyseus/schema';
import { BlackjackState } from '../entities/BlackJackState';
import { Player } from '../entities/Player';

export class BlackjackRoom extends Room<BlackjackState> {
    static MAX_PLAYERS = 4;
    static CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    static CARD_SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

    constructor() {
        super();
    }

    onCreate(options: any): void {
        this.setState(new BlackjackState());
        this.shuffleDeck();
    }

    shuffleDeck(): void {
        const deck = new ArraySchema<string>(); // Initialize deck as ArraySchema<string>
        for (let value of BlackjackRoom.CARD_VALUES) {
            for (let suit of BlackjackRoom.CARD_SUITS) {
                deck.push(`${value} of ${suit}`);
            }
        }
        this.state.deck = deck;
    }

    shuffle(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    drawCard(): string | undefined {
        if (this.state.deck.length === 0) {
            this.shuffleDeck();
        }
        return this.state.deck.pop();
    }

    onJoin(client: Client): void {
        if (this.clients.length <= BlackjackRoom.MAX_PLAYERS) {
            const newPlayer = new Player();
            this.state.players.set(client.sessionId, newPlayer);
        } else {
            client.send('room-full');
        }
    }

    // Custom methods and logic specific to BlackjackRoom
}
