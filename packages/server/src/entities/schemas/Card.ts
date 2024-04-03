import { Schema, type, filter } from '@colyseus/schema';
import { CardValue, Suit, CardValueEnum } from './CardValue'; // Adjust import to include Suit and CardValueEnum

export class Card extends Schema {
    @type('boolean') visible: boolean;

    @filter(function (this: Card) {
      return this.visible;
    })
    @type(CardValue) value?: CardValue; // Keep value optional based on your design, though it seems it should always be set based on the constructor

    constructor(suit: Suit, cardValue: CardValueEnum, visible: boolean = true) {
      super();
      this.visible = visible;
      // Directly use the passed suit and cardValue to create a CardValue instance
      this.value = new CardValue(suit, cardValue);
    }
}
