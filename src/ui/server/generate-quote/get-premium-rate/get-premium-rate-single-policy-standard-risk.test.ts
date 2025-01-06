import { getAvailableCover, getResultAndExpected } from './index.test';
import { EXTERNAL_API_MAPPINGS, FIELD_VALUES } from '../../constants';

const standardRisk2Months = getAvailableCover('SINGLE_POLICY', 'STANDARD', 2);
const standardRisk3Months = getAvailableCover('SINGLE_POLICY', 'STANDARD', 3);
const standardRisk4Months = getAvailableCover('SINGLE_POLICY', 'STANDARD', 4);
const standardRisk5Months = getAvailableCover('SINGLE_POLICY', 'STANDARD', 5);
const standardRisk6Months = getAvailableCover('SINGLE_POLICY', 'STANDARD', 6);
const standardRisk7Months = getAvailableCover('SINGLE_POLICY', 'STANDARD', 7);
const standardRisk8Months = getAvailableCover('SINGLE_POLICY', 'STANDARD', 8);
const standardRisk9Months = getAvailableCover('SINGLE_POLICY', 'STANDARD', 9);

describe('server/generate-quote/get-premium-rate', () => {
  const mockBase = {
    policyType: FIELD_VALUES.POLICY_TYPE.SINGLE,
    insuredFor: 70,
  };

  describe('single policy - standard risk', () => {
    const riskCategory = EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD;
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

        const manualDataCheck = standardRisk2Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk3Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk4Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk5Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk6Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk7Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk8Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk9Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });
  });
});
