import isHighRiskCountryEligible from './index';

const assertions = [
  // Standard risk country
  {
    expected: true,
    isHighRisk: false,
    cover: 70,
  },
  {
    expected: true,
    isHighRisk: false,
    cover: 75,
  },
  {
    expected: true,
    isHighRisk: false,
    cover: 80,
  },
  {
    expected: true,
    isHighRisk: false,
    cover: 85,
  },
  {
    expected: true,
    isHighRisk: false,
    cover: 90,
  },
  {
    expected: true,
    isHighRisk: false,
    cover: 95,
  },
  // High risk country
  {
    expected: true,
    isHighRisk: true,
    cover: 70,
  },
  {
    expected: true,
    isHighRisk: true,
    cover: 75,
  },
  {
    expected: true,
    isHighRisk: true,
    cover: 80,
  },
  {
    expected: true,
    isHighRisk: true,
    cover: 85,
  },
  {
    expected: true,
    isHighRisk: true,
    cover: 90,
  },
  {
    expected: false,
    isHighRisk: true,
    cover: 95,
  },
];

describe('isHighRiskCountryEligible', () => {
  it.each(assertions)(
    "should return $response when the country's high risk classification is $isHighRisk and the cover is $cover%",
    ({ expected, isHighRisk, cover }: { expected: boolean; isHighRisk: boolean; cover: number }) => {
      // Act
      const result = isHighRiskCountryEligible(isHighRisk, cover);

      // Assert
      expect(expected).toBe(result);
    },
  );
});
