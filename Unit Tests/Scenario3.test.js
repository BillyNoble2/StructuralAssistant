import { designLoad, calculateSuppReactions, calculateShear, calculateBendMom, calculateDeflection } from "../Screens/Scenario3";

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
      const [deadSuppReaction, liveSuppReaction] = calculateSuppReactions(6, 7, 10);
      expect(deadSuppReaction).toBeCloseTo(30, 1);
      expect(liveSuppReaction).toBeCloseTo(35, 1);
    });
})

describe('shear  function', () => {
    // Test case 1
    test('calculates design shear force correctly', () => {
      const result = calculateShear(20, 10);
      expect(result).toBe(100);
    });
});

describe('bending moment function', () => {
    // Test case 1
    test('calculates design bending moment correctly', () => {
      const result = calculateBendMom(10, 10);
      expect(result).toBe(125);
    });
});

describe('deflection function', () => {
    // Test case 1
    test('calculates dead and live deflections correctly', () => {
      const [deadDeflection, liveDeflection] = calculateDeflection(10,15,205,2059,10);
      expect(deadDeflection).toBeCloseTo(308.5, 1);
      expect(liveDeflection).toBeCloseTo(462.7, 1);
    });
});