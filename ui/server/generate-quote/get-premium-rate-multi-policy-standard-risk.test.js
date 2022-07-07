const getResultAndExpected = require('./get-premium-rate.test');
const { FIELD_VALUES } = require('../constants');
const standardRisk2Months = require('./pricing-grid/data/multi-policy/standard-risk/2-months');
const standardRisk3Months = require('./pricing-grid/data/multi-policy/standard-risk/3-months');
const standardRisk4Months = require('./pricing-grid/data/multi-policy/standard-risk/4-months');
const standardRisk5Months = require('./pricing-grid/data/multi-policy/standard-risk/5-months');
const standardRisk6Months = require('./pricing-grid/data/multi-policy/standard-risk/6-months');
const standardRisk7Months = require('./pricing-grid/data/multi-policy/standard-risk/7-months');
const standardRisk8Months = require('./pricing-grid/data/multi-policy/standard-risk/8-months');
const standardRisk9Months = require('./pricing-grid/data/multi-policy/standard-risk/9-months');

describe('server/generate-quote/get-premium-rate', () => {
  const mockBase = {
    policyType: FIELD_VALUES.POLICY_TYPE.MULTI,
    insuredFor: 80,
  };

  describe('multi policy - standard risk', () => {
    const riskCategory = 2;
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

        const manualDataCheck = standardRisk2Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk3Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk4Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk5Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk6Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk7Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk8Months.rates[0].premiumRate;

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

        const manualDataCheck = standardRisk9Months.rates[0].premiumRate;

        expect(result).toEqual(manualDataCheck);
      });
    });
  });
});
