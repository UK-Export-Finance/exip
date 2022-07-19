const getResultAndExpected = require('./index.test');
const {
  API,
  FIELD_VALUES,
} = require('../../constants');
const highRisk2Months = require('../pricing-grid/data/single-policy/high-risk/2-months');
const highRisk3Months = require('../pricing-grid/data/single-policy/high-risk/3-months');
const highRisk4Months = require('../pricing-grid/data/single-policy/high-risk/4-months');
const highRisk5Months = require('../pricing-grid/data/single-policy/high-risk/5-months');
const highRisk6Months = require('../pricing-grid/data/single-policy/high-risk/6-months');
const highRisk7Months = require('../pricing-grid/data/single-policy/high-risk/7-months');
const highRisk8Months = require('../pricing-grid/data/single-policy/high-risk/8-months');
const highRisk9Months = require('../pricing-grid/data/single-policy/high-risk/9-months');

describe('server/generate-quote/get-premium-rate', () => {
  const mockBase = {
    policyType: FIELD_VALUES.POLICY_TYPE.SINGLE,
    insuredFor: 80,
  };

  describe('single policy - high risk', () => {
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
