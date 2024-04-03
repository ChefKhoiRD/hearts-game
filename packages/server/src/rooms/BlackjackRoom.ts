import { Room, Client } from "colyseus";
import { GameState } from "../entities/GameState";
import { Player } from "../entities/schemas/Player";
import { v4 as uuidv4 } from "uuid";

export class BlackjackRoom extends Room<GameState> {

  // Method triggered when a new room is created
  onCreate(options: any) {
    console.log('Blackjack room created.');
    this.setState(new GameState()); // Initialize the room state with a new GameState

    this.onMessage("action", (client, message) => {
      const { action } = message; // Extract the action from the message
      this.handlePlayerAction(client, action); // Delegate action handling
    });
  }

  // Method triggered when a new player joins the room
  onJoin(client: Client) {
    const playerName = 'Player'; // Example default name, might use client data
    const playerAvatarUri = ''; // Default or client-provided avatar URI
    const player = new Player({
      sessionId: client.sessionId, 
      userId: uuidv4(), 
      name: playerName, 
      avatarUri: playerAvatarUri
    });

    this.state.addPlayer(player); // Add the player to the game state
    // Potentially, handle more setup tasks here
  }

  // Method triggered at the start of each round
  onRoundStart() {
    console.log("Round started.");
    this.state.resetHands(); // Reset hands for players and dealer
    this.dealInitialCards(); // Deal initial cards to players and dealer
  }

  // Deal initial cards to players and dealer
  private dealInitialCards() {
    this.state.players.forEach((player, sessionId) => {
      // Assuming dealCard() in GameState now correctly handles visibility,
      // adjust if your game logic for card visibility differs.
      const card1 = this.state.dealCard(); // First card (visible/invisible based on game rules)
      const card2 = this.state.dealCard(); // Second card
      if (card1) player.hand.addCard(card1);
      if (card2) player.hand.addCard(card2);
      // Implement logic if specific cards need to be dealt as visible/invisible
    });
  }

  // Method to handle player actions (hit or stand)
  private handlePlayerAction(client: Client, action: string) {
    const playerId = client.sessionId;
    this.state.handlePlayerAction(playerId, action);
    // After handling the action, you might want to check game state changes,
    // like if a player stands, it might be the next player's turn, etc.
  }

  // Other room logic and methods...
}
