import { Room, Client } from "colyseus";
import { GameState } from "../entities/GameState";
import { Player, TPlayerOptions } from "../entities/schemas/Player";
import { Hand } from "../entities/schemas/Hand";
import { v4 as uuidv4 } from "uuid";

export class BlackjackRoom extends Room<GameState> {
  maxClients = 4;

  onCreate(options: any) {
    console.log('Blackjack room created.');
    this.setState(new GameState());

    // Specific handlers for player actions
    this.onMessage("hit", (client, message) => {
      console.log(`Player ${client.sessionId} hits`);
      this.handlePlayerAction(client, "hit");
    });

    this.onMessage("stand", (client, message) => {
      console.log(`Player ${client.sessionId} stands`);
      this.handlePlayerAction(client, "stand");
    });

    this.onMessage("ready", (client, message) => {
      const player = this.state.players.get(client.sessionId);
      if (player) {
          player.ready = !player.ready; // Toggle readiness or set based on a specific message flag
          console.log(`Player ${client.sessionId} is now ${player.ready ? "ready" : "not ready"}.`);
          this.checkAllPlayersReady();
      }
  });
  }

  async onAuth(client: Client, options: any, request: any): Promise<boolean> {
    return true;
  }

  onJoin(client: Client, options: TPlayerOptions) {
    console.log(`${client.sessionId} joined with options: ${JSON.stringify(options)}`);
    if (!this.state.players.get(client.sessionId)) {
      const playerOptions = {
        ...options,
        sessionId: client.sessionId, 
        userId: uuidv4()  // Ensure each player has a unique ID
      };
      this.state.createPlayer(client.sessionId, playerOptions);
    } else {
      console.log(`Player ${client.sessionId} rejoined`);
    }

    // Check if all players have joined, then deal cards
    if (this.clients.length === this.maxClients) {
      this.dealInitialCards();
    }
  }

  onLeave(client: Client) {
    console.log(`${client.sessionId} left`);
    this.state.removePlayer(client.sessionId);
  }

  onDispose() {
    console.log('Dispose BlackjackRoom');
  }

  private dealInitialCards() {
    this.state.players.forEach((player, sessionId) => {
      if (!player.hand) {
        player.hand = new Hand();
      }
      const visibleCard = this.state.dealCard(true);
      const hiddenCard = this.state.dealCard(false);
      player.hand.addCard(visibleCard);
      player.hand.addCard(hiddenCard);
    });
    console.log("Initial cards dealt to all players.");
  }

  private handlePlayerAction(client: Client, action: string) {
    const player = this.state.players.get(client.sessionId);
    if (!player) {
      console.log(`Action received from non-existent player ${client.sessionId}: ${action}`);
      return;
    }
  
    if (player.hasStood && action === "hit") {
      console.log(`Player ${client.sessionId} attempted to hit after standing.`);
      return;  // Player cannot hit after standing
    }
  
    this.state.handlePlayerAction(client.sessionId, action);
  }

  private checkAllPlayersReady() {
    const allReady = Array.from(this.state.players.values()).every(player => player.ready);
    if (allReady && this.state.players.size === this.maxClients) {
        console.log("All players are ready. Starting the game...");
        this.dealInitialCards();
    }
}
}

