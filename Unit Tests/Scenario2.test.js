import { designLoad, calculateSuppReactions, calculateBendMom, calculateDeflection, calculateShear } from "../Screens/Scenario2";

describe('designLoad function', () => {
    // Test case 1
    test('calculates design load correctly', () => {
      const result = designLoad(10, 20, 1.5, 2);
      expect(result).toBe(55);
    });
    test('calculates design load correctly with negative values', () => {
        const result = designLoad(-10, 5, 1, 0.5);
        expect(result).toBe(-7.5);
      });
});

describe('calculateSuppReactions function', () => {
    // Test case 1
    test('calculates dead and live support reactions correctly', () => {
      const [deadSuppReactionA, liveSuppReactionA, deadSuppReactionB, liveSuppReactionB] = calculateSuppReactions(10, 10, 6, 5);
      expect(deadSuppReactionA).toBeCloseTo(4.54, 1);
      expect(liveSuppReactionA).toBeCloseTo(4.54, 1);
      expect(deadSuppReactionB).toBeCloseTo(5.45, 1);
      expect(liveSuppReactionB).toBeCloseTo(5.45, 1);
    });
})

describe('bending moment function', () => {
    // Test case 1
    test('calculates design bending moment correctly', () => {
      const result = calculateBendMom(10, 3, 5);
      expect(result).toBe(18.75);
    });
});

describe('deflection function', () => {
    // Test case 1
    test('calculates dead and live deflections correctly', () => {
      const [deadDeflection, liveDeflection] = calculateDeflection(3,5,205,405,4,6);
      expect(deadDeflection).toBeCloseTo(71.2, 1);
      expect(liveDeflection).toBeCloseTo(118.7, 1);
    });
})

describe('shear  function', () => {
    // Test case 1
    test('calculates design shear force correctly', () => {
      const result = calculateShear(20);
      expect(result).toBe(10);
    });
});
