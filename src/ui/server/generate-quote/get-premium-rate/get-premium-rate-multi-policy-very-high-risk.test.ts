import { getAvailableCover, getResultAndExpected } from './index.test';
import { EXTERNAL_API_MAPPINGS, FIELD_VALUES } from '../../constants';

const veryHighRisk2Months = getAvailableCover('MULTIPLE_POLICY', 'VERY_HIGH', 2);
const veryHighRisk3Months = getAvailableCover('MULTIPLE_POLICY', 'VERY_HIGH', 3);

describe('server/generate-quote/get-premium-rate', () => {
  const mockBase = {
    policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
    insuredFor: 70,
  };

  describe('multiple policy - very high risk', () => {
    const riskCategory = EXTERNAL_API_MAPPINGS.CIS.RISK.VERY_HIGH;
    const mock = {
      ...mockBase,
      riskCategory,
      creditPeriodInMonths: 1,
    };

    describe('1 month credit period', () => {
      beforeEach(() => {
        mock.creditPeriodInMonths = 1;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.creditPeriodInMonths + 1, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk2Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('2 months credit period', () => {
      beforeEach(() => {
        mock.creditPeriodInMonths = 2;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.creditPeriodInMonths + 1, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk3Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });
  });
});
