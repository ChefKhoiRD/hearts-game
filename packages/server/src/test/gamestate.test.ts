import { GameState } from '../entities/GameState';
import { Player } from '../entities/Player';

describe('GameState', () => {
  let gameState: GameState;

  beforeEach(() => {
    gameState = new GameState();
  });

  test('should return undefined if no players are in the game', () => {
    expect(gameState.determineCurrentTurnPlayer()).toBeUndefined();
  });

  test('should return the first player if no current turn player ID is set', () => {
    const player1 = new Player({ sessionId: '1', userId: '1', name: 'Player 1', avatarUri: '' });
    gameState.addPlayer(player1);

    expect(gameState.determineCurrentTurnPlayer()).toEqual(player1);
  });

  test('should return the player with current turn player ID', () => {
    const player1 = new Player({ sessionId: '1', userId: '1', name: 'Player 1', avatarUri: '' });
    const player2 = new Player({ sessionId: '2', userId: '2', name: 'Player 2', avatarUri: '' });
    gameState.addPlayer(player1);
    gameState.addPlayer(player2);
    gameState.currentTurnPlayerId = '2'; // Set player2 as the current turn player

    expect(gameState.determineCurrentTurnPlayer()).toEqual(player2);
  });

  test('should return undefined if current turn player ID is invalid', () => {
    const player1 = new Player({ sessionId: '1', userId: '1', name: 'Player 1', avatarUri: '' });
    gameState.addPlayer(player1);
    gameState.currentTurnPlayerId = 'invalid_player_id'; // Set an invalid player ID

    expect(gameState.determineCurrentTurnPlayer()).toBeUndefined();
  });

  test('should determine the current player correctly', () => {
    const player1 = new Player({ sessionId: '1', userId: '1', name: 'Player 1', avatarUri: '' });
    const player2 = new Player({ sessionId: '2', userId: '2', name: 'Player 2', avatarUri: '' });
    gameState.addPlayer(player1);
    gameState.addPlayer(player2);
    gameState.currentTurnPlayerId = '2'; // Set player2 as the current turn player

    expect(gameState.determineCurrentTurnPlayer()).toEqual(player2);
  });
});
