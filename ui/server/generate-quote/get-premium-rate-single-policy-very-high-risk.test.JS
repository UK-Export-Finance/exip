const getResultAndExpected = require('./get-premium-rate.test');
const { FIELD_VALUES } = require('../constants');
const veryHighRisk2Months = require('./pricing-grid/data/multi-policy/very-high-risk/2-months');
const veryHighRisk3Months = require('./pricing-grid/data/multi-policy/very-high-risk/3-months');
const veryHighRisk4Months = require('./pricing-grid/data/multi-policy/very-high-risk/4-months');
const veryHighRisk5Months = require('./pricing-grid/data/multi-policy/very-high-risk/5-months');
const veryHighRisk6Months = require('./pricing-grid/data/multi-policy/very-high-risk/6-months');
const veryHighRisk7Months = require('./pricing-grid/data/multi-policy/very-high-risk/7-months');
const veryHighRisk8Months = require('./pricing-grid/data/multi-policy/very-high-risk/8-months');
const veryHighRisk9Months = require('./pricing-grid/data/multi-policy/very-high-risk/9-months');

describe('server/generate-quote/get-premium-rate', () => {
  const mockBase = {
    policyType: FIELD_VALUES.POLICY_TYPE.MULTI,
    insuredFor: 70,
  };

  describe('single policy - very high risk', () => {
    const riskCategory = 5;
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

        const manualDataCheck = veryHighRisk2Months.rates[0].premiumRate;

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

        const manualDataCheck = veryHighRisk3Months.rates[0].premiumRate;

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

        const manualDataCheck = veryHighRisk4Months.rates[0].premiumRate;

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

        const manualDataCheck = veryHighRisk5Months.rates[0].premiumRate;

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

        const manualDataCheck = veryHighRisk6Months.rates[0].premiumRate;

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

        const manualDataCheck = veryHighRisk7Months.rates[0].premiumRate;

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

        const manualDataCheck = veryHighRisk8Months.rates[0].premiumRate;

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

        const manualDataCheck = veryHighRisk9Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });
  });
});
