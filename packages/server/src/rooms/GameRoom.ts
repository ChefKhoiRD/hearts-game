import { Room } from "colyseus";
import { Hand } from "../entities/schemas/Hand";
import { computeRoundOutcome } from "../entities/schemas/RoundOutcome";

export class GameRoom extends Room {
    // Add this method to handle computing round outcome
    computeRoundOutcome(playerHand: Hand, dealerHand: Hand, bet: number) {
      // You can directly use the computeRoundOutcome function here
      return computeRoundOutcome(playerHand, dealerHand, bet);
    }
}
