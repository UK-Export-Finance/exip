import { getAvailableCover, getResultAndExpected } from './index.test';
import { API, FIELD_VALUES } from '../../constants';

const highRisk2Months = getAvailableCover('MULTI_POLICY', 'HIGH', 2);
const highRisk3Months = getAvailableCover('MULTI_POLICY', 'HIGH', 3);
const highRisk4Months = getAvailableCover('MULTI_POLICY', 'HIGH', 4);
const highRisk5Months = getAvailableCover('MULTI_POLICY', 'HIGH', 5);
const highRisk6Months = getAvailableCover('MULTI_POLICY', 'HIGH', 6);
const highRisk7Months = getAvailableCover('MULTI_POLICY', 'HIGH', 7);
const highRisk8Months = getAvailableCover('MULTI_POLICY', 'HIGH', 8);
const highRisk9Months = getAvailableCover('MULTI_POLICY', 'HIGH', 9);

describe('server/generate-quote/get-premium-rate', () => {
  const mockBase = {
    policyType: FIELD_VALUES.POLICY_TYPE.MULTI,
    insuredFor: 70,
  };

  describe('multi policy - high risk', () => {
    const riskCategory = API.MAPPINGS.RISK.HIGH;
    const mock = {
      ...mockBase,
      riskCategory,
    };

    describe('2 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 2;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(
          mock.policyType,
          mock.riskCategory,
          mock.policyLengthInMonths,
          mock.insuredFor,
        );

        expect(result).toEqual(expected);

        const manualDataCheck = highRisk2Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('3 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 3;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(
          mock.policyType,
          mock.riskCategory,
          mock.policyLengthInMonths,
          mock.insuredFor,
        );

        expect(result).toEqual(expected);

        const manualDataCheck = highRisk3Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('4 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 4;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(
          mock.policyType,
          mock.riskCategory,
          mock.policyLengthInMonths,
          mock.insuredFor,
        );

        expect(result).toEqual(expected);

        const manualDataCheck = highRisk4Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('5 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 5;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(
          mock.policyType,
          mock.riskCategory,
          mock.policyLengthInMonths,
          mock.insuredFor,
        );

        expect(result).toEqual(expected);

        const manualDataCheck = highRisk5Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('6 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 6;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(
          mock.policyType,
          mock.riskCategory,
          mock.policyLengthInMonths,
          mock.insuredFor,
        );

        expect(result).toEqual(expected);

        const manualDataCheck = highRisk6Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('7 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 7;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(
          mock.policyType,
          mock.riskCategory,
          mock.policyLengthInMonths,
          mock.insuredFor,
        );

        expect(result).toEqual(expected);

        const manualDataCheck = highRisk7Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('8 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 8;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(
          mock.policyType,
          mock.riskCategory,
          mock.policyLengthInMonths,
          mock.insuredFor,
        );

        expect(result).toEqual(expected);

        const manualDataCheck = highRisk8Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });

    describe('9 months policy length', () => {
      beforeEach(() => {
        mock.policyLengthInMonths = 9;
      });

      it('should return a premium rate from pricing grid', () => {
        const { result, expected } = getResultAndExpected(
          mock.policyType,
          mock.riskCategory,
          mock.policyLengthInMonths,
          mock.insuredFor,
        );

        expect(result).toEqual(expected);

        const manualDataCheck = highRisk9Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });
  });
});
