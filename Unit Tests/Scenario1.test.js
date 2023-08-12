// designLoad.test.js
import { designLoad, calculateSuppReactions, calculateShear, calculateBendMom, calculateDeflection } from "../Screens/Scenario1";


describe('designLoad function', () => {
  // Test case 1
  test('Test that design load is calculated correctly.', () => {
    const result = designLoad(10, 20, 1.5, 2);
    expect(result).toBe(55);
  });
    //Test case 2
    test('calculates design load correctly with negative values', () => {
    const result = designLoad(-10, 5, 1, 0.5);
    expect(result).toBe(-7.5);
  });
});

describe('calculateSuppReactions function', () => {
    test('Test that dead and live support reactions are calculated correctly', () => {
      const [deadReaction, liveReaction] = calculateSuppReactions(10, 20);
      expect(deadReaction).toBe(5);
      expect(liveReaction).toBe(10);
    });
})

describe('calculate shear function', () => {
    test('Test that design shear is calculated correctly', () => {
        const result = calculateShear(60);
        expect(result).toBe(30);
    });
})

describe('calculate bending function', () => {
    test('Test that design bending moment is calculated correctly.', () => {
        const result = calculateBendMom(10, 4);
        expect(result).toBe(10);
    });
})

describe('calculateDeflction function', () => {
    test('Test that dead and live deflctions are calculated correctly', () => {
      const [deadDeflection, liveDeflection] = calculateDeflection(25, 30, 205, 29300, 10);
      expect(deadDeflection).toBe(8.7);
      expect(liveDeflection).toBe(10.4);
    });
})