import { PRICING_GRID_MAP, getPremiumRate } from '.';
import { EXTERNAL_API_MAPPINGS, FIELD_VALUES } from '../../constants';
import PRICING_GRID from '../pricing-grid.json';
import { PricingGridMonth, PricingGridRate } from '../../../types';

const expectedPremiumRate = (policyType: string, riskCategory: string, totalMonths: number, insuredFor: number) => {
  const mappedPolicyType = PRICING_GRID_MAP.POLICY_TYPE[policyType];
  const mappedRiskCategory = PRICING_GRID_MAP.RISK_CATEGORY[riskCategory];

  const risk = PRICING_GRID[mappedPolicyType][mappedRiskCategory];

  const expectedMonth = risk.find((month: PricingGridMonth) => month.months === totalMonths);

  const expectedRateObj = expectedMonth.rates.find((rate: PricingGridRate) => rate.insuredFor === insuredFor);

  const expected = expectedRateObj.premiumRate;

  return expected;
};

const getResultAndExpected = (policyType: string, riskCategory: string, totalMonths: number, insuredFor: number) => {
  const result = getPremiumRate(policyType, riskCategory, totalMonths, insuredFor);

  const expected = expectedPremiumRate(policyType, riskCategory, totalMonths, insuredFor);

  return {
    result,
    expected,
  };
};

const getAvailableCover = (policyType: string, risk: string, coverMonths: number) =>
  PRICING_GRID[policyType][risk].find((month: PricingGridMonth) => month.months === coverMonths);

describe('server/generate-quote/get-premium-rate', () => {
  const mock = {
    policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
    insuredFor: 80,
    esraClassification: EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD,
    totalMonths: 2,
  };

  it('returns a number', () => {
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
