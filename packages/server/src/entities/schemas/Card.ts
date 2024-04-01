import { Schema, type, filter } from '@colyseus/schema';
import { CardValue } from './CardValue';
import { getRandomArrayItem, availableSuits, availableValues } from './cardValues';

export class Card extends Schema {
    @type('boolean') visible: boolean;

    @filter(function (this: Card) {
      return this.visible;
    })
    @type(CardValue) value?: CardValue; // Make value optional

    constructor(visible = true) {
      super();

      this.visible = visible;

      // Initialize value with default CardValue
      this.value = new CardValue();
      this.value.suit = getRandomArrayItem(availableSuits);
      this.value.value = getRandomArrayItem(availableValues);
    }
}
