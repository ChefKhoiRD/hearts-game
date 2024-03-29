import { Room, Client } from 'colyseus';
import { TPlayerOptions } from '../entities/Player';
import { State, IState } from '../entities/State';

export class StateHandlerRoom extends Room<State> {
  static GAME_NAME = "StateHandlerGame"; // Add GAME_NAME property

  maxClients = 1000;

  constructor() {
      super();
  }

  onCreate(options: IState): void {
      this.setState(new State(options));
  }

  onAuth(_client: any, _options: any, _req: any) {
      return true;
  }

  onLeave(client: Client) {
      this.state.removePlayer(client.sessionId);
  }

  onDispose() {
      console.log('Dispose StateHandlerRoom');
  }
}
