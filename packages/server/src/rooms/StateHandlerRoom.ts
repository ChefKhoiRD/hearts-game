import { Room, Client } from 'colyseus';
import { TPlayerOptions } from '../entities/Player';
import { GameState, IState } from '../entities/State';
import { computeRoundOutcome } from '../entities/schemas/RoundOutcome';
import { Hand } from '../entities/schemas/Hand';

export class StateHandlerRoom extends Room<GameState> {
  maxClients = 1000;

  onCreate(options: IState) {
    this.setState(new GameState(options));

    // Here's where we would add handlers for updating state
    this.onMessage('startTalking', (client, _data) => {
      this.state.startTalking(client.sessionId);
    });

    this.onMessage('stopTalking', (client, _data) => {
      this.state.stopTalking(client.sessionId);
    });
  }

  onAuth(_client: any, _options: any, _req: any) {
    return true;
  }

  onJoin(client: Client, options: TPlayerOptions & { isAdmin: boolean }) {
    // Extract player options and isAdmin parameter
    const { sessionId, userId, name, avatarUri, isAdmin } = options;

    // Create player options object
    const playerOptions: TPlayerOptions = {
      sessionId,
      userId,
      name,
      avatarUri,
      talking: false // You might need to add other player options here
    };

    // Create a new player instance with isAdmin parameter
    this.state.createPlayer(client.sessionId, playerOptions, isAdmin);
  }

  onLeave(client: Client) {
    this.state.removePlayer(client.sessionId);
  }

  onDispose() {
    console.log('Dispose StateHandlerRoom');
  }

  // Add this method to handle computing round outcome
  computeRoundOutcome(playerHand: Hand, dealerHand: Hand, bet: number) {
    // You can directly use the computeRoundOutcome function here
    return computeRoundOutcome(playerHand, dealerHand, bet);
  }
}
