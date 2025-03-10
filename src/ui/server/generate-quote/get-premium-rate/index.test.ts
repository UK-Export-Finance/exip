import { PRICING_GRID_MAP, getPremiumRate } from '.';
import { EXTERNAL_API_MAPPINGS, FIELD_VALUES } from '../../constants';
import PRICING_GRID from '../pricing-grid.json';
import { PricingGridMonth, PricingGridRate } from '../../../types';

const expectedPremiumRate = (policyType: string, esraClassification: string, totalMonths: number, insuredFor: number) => {
  const mappedPolicyType = PRICING_GRID_MAP.POLICY_TYPE[policyType];
  const mappedRiskCategory = PRICING_GRID_MAP.RISK_CATEGORY[esraClassification];

  const risk = PRICING_GRID[mappedPolicyType][mappedRiskCategory];

  const expectedMonth = risk.find((month: PricingGridMonth) => month.months === totalMonths) as PricingGridMonth;

  const expectedRateObj = expectedMonth.rates.find((rate: PricingGridRate) => rate.insuredFor === insuredFor) as PricingGridRate;

  const expected = expectedRateObj.premiumRate;

  return expected;
};

const getResultAndExpected = (policyType: string, esraClassification: string, totalMonths: number, insuredFor: number) => {
  const result = getPremiumRate(policyType, esraClassification, totalMonths, insuredFor);

  const expected = expectedPremiumRate(policyType, esraClassification, totalMonths, insuredFor);

  return {
    result,
    expected,
  };
};

const getAvailableCover = (policyType: keyof typeof PRICING_GRID, risk: keyof (typeof PRICING_GRID)[keyof typeof PRICING_GRID], coverMonths: number) =>
  PRICING_GRID[policyType][risk].find((month: PricingGridMonth) => month.months === coverMonths);

describe('server/generate-quote/get-premium-rate', () => {
  const mock = {
    policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
    insuredFor: 80,
    esraClassification: EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD,
    totalMonths: 2,
  };

  it('should return a number', () => {
    const result = getPremiumRate(mock.policyType, mock.esraClassification, mock.totalMonths, mock.insuredFor);

    expect(typeof result).toEqual('number');
  });

  describe('when the mapping fails', () => {
    it('should throw an error', () => {
      const invalidEsraClassification = 'invalid classification';

      expect(() => getPremiumRate(mock.policyType, invalidEsraClassification, mock.totalMonths, mock.insuredFor)).toThrow(
        new Error(`Getting premium rate TypeError: Cannot read properties of undefined (reading 'find')`),
      );
    });
  });
});

export { getResultAndExpected, getAvailableCover };
