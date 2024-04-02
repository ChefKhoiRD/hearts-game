import { GameState } from "../entities/GameState";
import { Player } from "../entities/Player";
import { PlayerActionHandler } from "../entities/schemas/HandlePlayerAction";

describe('PlayerActionHandler', () => {
  let gameState: GameState;

  beforeEach(() => {
    gameState = new GameState();
  });

  test('hit should add a card to the player\'s hand', () => {
    const playerId = '1';
    const player = new Player({ sessionId: playerId, userId: '1', name: 'Player 1', avatarUri: '' });
    gameState.addPlayer(player);

    const initialHandSize = gameState.players[playerId].hand.cards.length;
    console.log('Initial hand size:', initialHandSize);

    PlayerActionHandler.hit(gameState, playerId);

    const finalHandSize = gameState.players[playerId].hand.cards.length;
    console.log('Final hand size:', finalHandSize);

    expect(finalHandSize).toBe(initialHandSize + 1);
  });
});
