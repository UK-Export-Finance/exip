import isHighRiskCountryEligible from './index';

const assertions = [
  // Standard risk country
  {
    response: true,
    isHighRisk: false,
    cover: 70,
  },
  {
    response: true,
    isHighRisk: false,
    cover: 75,
  },
  {
    response: true,
    isHighRisk: false,
    cover: 80,
  },
  {
    response: true,
    isHighRisk: false,
    cover: 85,
  },
  {
    response: true,
    isHighRisk: false,
    cover: 90,
  },
  {
    response: true,
    isHighRisk: false,
    cover: 95,
  },
  // High risk country
  {
    response: true,
    isHighRisk: true,
    cover: 70,
  },
  {
    response: true,
    isHighRisk: true,
    cover: 75,
  },
  {
    response: true,
    isHighRisk: true,
    cover: 80,
  },
  {
    response: true,
    isHighRisk: true,
    cover: 85,
  },
  {
    response: true,
    isHighRisk: true,
    cover: 90,
  },
  {
    response: false,
    isHighRisk: true,
    cover: 95,
  },
];

describe('isHighRiskCountryEligible', () => {
  it.each(assertions)(
    "should return $response when the country's high risk classification is $isHighRisk and the cover is $cover%",
    ({ response, isHighRisk, cover }: { response: boolean; isHighRisk: boolean; cover: number }) => {
      // Act
      const expected = isHighRiskCountryEligible(isHighRisk, cover);

      // Assert
      expect(response).toBe(expected);
    },
  );
});
