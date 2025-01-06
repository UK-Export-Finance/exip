import { getAvailableCover, getResultAndExpected } from './index.test';
import { EXTERNAL_API_MAPPINGS, FIELD_VALUES } from '../../constants';

const veryHighRisk2Months = getAvailableCover('SINGLE_POLICY', 'VERY_HIGH', 2);
const veryHighRisk3Months = getAvailableCover('SINGLE_POLICY', 'VERY_HIGH', 3);
const veryHighRisk4Months = getAvailableCover('SINGLE_POLICY', 'VERY_HIGH', 4);
const veryHighRisk5Months = getAvailableCover('SINGLE_POLICY', 'VERY_HIGH', 5);
const veryHighRisk6Months = getAvailableCover('SINGLE_POLICY', 'VERY_HIGH', 6);
const veryHighRisk7Months = getAvailableCover('SINGLE_POLICY', 'VERY_HIGH', 7);
const veryHighRisk8Months = getAvailableCover('SINGLE_POLICY', 'VERY_HIGH', 8);
const veryHighRisk9Months = getAvailableCover('SINGLE_POLICY', 'VERY_HIGH', 9);

describe('server/generate-quote/get-premium-rate', () => {
  const mockBase = {
    policyType: FIELD_VALUES.POLICY_TYPE.SINGLE,
    insuredFor: 70,
  };

  describe('single policy - very high risk', () => {
    const riskCategory = EXTERNAL_API_MAPPINGS.CIS.RISK.VERY_HIGH;
    const mock = {
      ...mockBase,
      riskCategory,
      policyLengthInMonths: 2,
    };

    describe('2 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 2;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.policyLengthInMonths, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk2Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('3 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 3;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.policyLengthInMonths, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk3Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('4 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 4;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.policyLengthInMonths, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk4Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('5 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 5;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.policyLengthInMonths, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk5Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('6 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 6;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.policyLengthInMonths, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk6Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('7 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 7;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.policyLengthInMonths, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk7Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('8 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 8;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.policyLengthInMonths, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk8Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('9 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 9;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(mock.policyType, mock.riskCategory, mock.policyLengthInMonths, mock.insuredFor);

        expect(result).toEqual(expected);

        const manualDataCheck = veryHighRisk9Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });
  });
});
