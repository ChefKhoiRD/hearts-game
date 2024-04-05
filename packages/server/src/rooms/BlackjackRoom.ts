import { Room, Client } from "colyseus";
import { GameState } from "../entities/GameState";
import { Player, TPlayerOptions } from "../entities/schemas/Player";
import { Hand } from "../entities/schemas/Hand";
import { v4 as uuidv4 } from "uuid";

export class BlackjackRoom extends Room<GameState> {
  maxClients = 4;

  onCreate(options: any) {
    console.log('Blackjack room created.');
    this.setState(new GameState()); // Assuming GameState doesn't need options for initialization

    // Listen for player action messages
    this.onMessage("action", (client, message) => {
      const { action } = message; // Extract the action from the message
      this.handlePlayerAction(client, action); // Delegate action handling
    });
  }

  async onAuth(client: Client, options: any, request: any): Promise<boolean> {
    return true;
  }

  onJoin(client: Client, options: TPlayerOptions) {
    console.log(`${client.sessionId} joined with options: ${JSON.stringify(options)}`);
    // Adjusted to use GameState's player management
    const playerOptions = {
      ...options,
      sessionId: client.sessionId, 
      userId: uuidv4() // Generate a unique ID for the user
    };
    this.state.createPlayer(client.sessionId, playerOptions);
  }

  onLeave(client: Client) {
    console.log(`${client.sessionId} left`);
    this.state.removePlayer(client.sessionId); // Utilize GameState's removePlayer
  }

  onDispose() {
    console.log('Dispose BlackjackRoom');
    // Perform any cleanup if necessary
  }

  // Method triggered at the start of each round
  onRoundStart() {
    console.log("Round started.");
    this.state.resetHands(); // Reset hands for players and dealer
    this.dealInitialCards(); // Deal initial cards to players and dealer
  }

  private dealInitialCards() {
    // Ensure all players have a hand before dealing cards
    this.state.players.forEach((player, sessionId) => {
      if (!player.hand) {
        player.hand = new Hand(); // Ensure the player has a hand
      }
      // Deal two cards to each player
      const visibleCard = this.state.dealCard(true);
      const hiddenCard = this.state.dealCard(false);
      if (visibleCard) player.hand.addCard(visibleCard);
      if (hiddenCard) player.hand.addCard(hiddenCard);
    });
  }

  private handlePlayerAction(client: Client, action: string) {
    // Delegate action handling to GameState
    this.state.handlePlayerAction(client.sessionId, action);
  }
}
