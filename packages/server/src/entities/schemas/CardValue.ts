import { Schema, type } from '@colyseus/schema';

export enum Suit {
  Spades = '♠︎',
  Hearts = '♥︎',
  Clubs = '♣︎',
  Diamonds = '♦︎',
}

export enum CardValueEnum {
  Ace = 'A',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
}

class CardValue extends Schema {
  @type('string') suit: Suit;
  @type('string') value: CardValueEnum;

  constructor(suit: Suit, value: CardValueEnum) {
    super();
    this.suit = suit;
    this.value = value;
  }

  public get numericValue(): number {
    const valueMap: { [key in CardValueEnum]?: number } = {
      [CardValueEnum.Ace]: 11,
      [CardValueEnum.Two]: 2,
      [CardValueEnum.Three]: 3,
      [CardValueEnum.Four]: 4,
      [CardValueEnum.Five]: 5,
      [CardValueEnum.Six]: 6,
      [CardValueEnum.Seven]: 7,
      [CardValueEnum.Eight]: 8,
      [CardValueEnum.Nine]: 9,
      [CardValueEnum.Ten]: 10,
      [CardValueEnum.Jack]: 10,
      [CardValueEnum.Queen]: 10,
      [CardValueEnum.King]: 10,
    }
    
    return valueMap[this.value] || parseInt(this.value, 10);
  }
}

export { CardValue };
