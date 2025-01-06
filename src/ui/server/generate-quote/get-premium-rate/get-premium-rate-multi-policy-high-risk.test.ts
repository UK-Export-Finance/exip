import { getAvailableCover, getResultAndExpected } from './index.test';
import { EXTERNAL_API_MAPPINGS, FIELD_VALUES } from '../../constants';

const highRisk2Months = getAvailableCover('MULTIPLE_POLICY', 'HIGH', 2);
const highRisk3Months = getAvailableCover('MULTIPLE_POLICY', 'HIGH', 3);

describe('server/generate-quote/get-premium-rate', () => {
  const mockBase = {
    policyType: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
    insuredFor: 70,
  };

  describe('multiple policy - high risk', () => {
    const riskCategory = EXTERNAL_API_MAPPINGS.CIS.RISK.HIGH;
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

        const manualDataCheck = highRisk2Months.rates[0].premiumRate;

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

        const manualDataCheck = highRisk3Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });
  });
});
