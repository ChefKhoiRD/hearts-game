import { Room } from "colyseus";
import { computeRoundOutcome } from "../entities/schemas/RoundOutcome";
import { Hand } from "../entities/schemas/Hand";

export class RoundOutcomeRoom extends Room {
  // Handle incoming messages from the Game Room indicating the end of a round
  onRoundEnd(playerHand: Hand, dealerHand: Hand, bet: number) {
    const roundResult = computeRoundOutcome(playerHand, dealerHand, bet);
    // Handle round outcome, e.g., update player's money, notify clients, etc.
  }
}
