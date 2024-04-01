import { Schema, type } from '@colyseus/schema';

export class CardValue extends Schema {
    @type('string') suit: string;
    @type('string') value: string;
  
    public get numericValue() {
      if (this.value == 'A') return 11;
      if (isNaN(Number(this.value))) return 10;
      return Number(this.value);
    }
}