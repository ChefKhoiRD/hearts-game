import { Card } from "../entities/schemas/Card";

describe('Card', () => {
  test('should create a visible card with a valid value', () => {
    console.log("Creating a new visible card...");
    const card = new Card(true);
    console.log("Visible:", card.visible);
    console.log("Card created:", card);
    console.log("Card value:", card.value);
    console.log("Card suit:", card.value?.suit);
    console.log("Card value string:", card.value?.value);
    console.log("");

    // Asserting properties of the visible card
    expect(card.visible).toBe(true);
    expect(card.value).toBeDefined(); // Ensure value is defined
    expect(card.value?.suit).toBeDefined(); // Ensure suit is defined
    expect(card.value?.value).toBeDefined(); // Ensure value is defined
  });

  test('should create a hidden card with a valid value', () => {
    console.log("Creating a new hidden card...");
    const card = new Card(false);
    console.log("Visible:", card.visible);
    console.log("Card created:", card);
    console.log("Card value:", card.value);
    console.log("Card suit:", card.value?.suit);
    console.log("Card value string:", card.value?.value);
    console.log("");

    // Asserting properties of the hidden card
    expect(card.visible).toBe(false);
    expect(card.value).toBeDefined(); // Ensure value is defined
    expect(card.value?.suit).toBeDefined(); // Ensure suit is defined
    expect(card.value?.value).toBeDefined(); // Ensure value is defined
  });
});
