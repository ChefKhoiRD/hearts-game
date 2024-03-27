import { Player } from '../entities/Player';
import { ArraySchema } from '@colyseus/schema';

describe('Player', () => {
  it('should initialize hand property as ArraySchema<string>', () => {
    const player = new Player(); // Create an instance of Player

    // Assert that the hand property is an instance of ArraySchema<string>
    expect(player.hand).toBeInstanceOf(ArraySchema);
    expect(Array.isArray(player.hand)).toBe(false); // Make sure it's not a regular array
  });
});