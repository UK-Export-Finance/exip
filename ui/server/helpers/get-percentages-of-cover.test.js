const getPercentagesOfCover = require('./get-percentages-of-cover');
const { API, FIELD_VALUES } = require('../constants');
const PRICING_GRID = require('../generate-quote/pricing-grid');

describe('server/helpers/get-percentages-of-cover', () => {
  describe('single policy type', () => {
    describe('standard risk', () => {
      it('should return percentages', () => {
        const result = getPercentagesOfCover(
          FIELD_VALUES.POLICY_TYPE.SINGLE,
          API.MAPPINGS.RISK.STANDARD,
        );

        const expected = PRICING_GRID.SINGLE_POLICY.STANDARD.COVER_PERCENTAGES;
        expect(result).toEqual(expected);
      });
    });

    describe('high risk', () => {
      it('should return percentages', () => {
        const result = getPercentagesOfCover(
          FIELD_VALUES.POLICY_TYPE.SINGLE,
          API.MAPPINGS.RISK.HIGH,
        );

        const expected = PRICING_GRID.SINGLE_POLICY.HIGH.COVER_PERCENTAGES;
        expect(result).toEqual(expected);
      });
    });

    describe('very high risk', () => {
      it('should return percentages', () => {
        const result = getPercentagesOfCover(
          FIELD_VALUES.POLICY_TYPE.SINGLE,
          API.MAPPINGS.RISK.VERY_HIGH,
        );

        const expected = PRICING_GRID.SINGLE_POLICY.VERY_HIGH.COVER_PERCENTAGES;
        expect(result).toEqual(expected);
      });
    });
  });

  describe('multi policy type', () => {
    describe('standard risk', () => {
      it('should return percentages', () => {
        const result = getPercentagesOfCover(
          FIELD_VALUES.POLICY_TYPE.MULTI,
          API.MAPPINGS.RISK.STANDARD,
        );

        const expected = PRICING_GRID.MULTI_POLICY.STANDARD.COVER_PERCENTAGES;
        expect(result).toEqual(expected);
      });
    });

    describe('high risk', () => {
      it('should return percentages', () => {
        const result = getPercentagesOfCover(
          FIELD_VALUES.POLICY_TYPE.MULTI,
          API.MAPPINGS.RISK.HIGH,
        );

        const expected = PRICING_GRID.MULTI_POLICY.HIGH.COVER_PERCENTAGES;
        expect(result).toEqual(expected);
      });
    });

    describe('very high risk', () => {
      it('should return percentages', () => {
        const result = getPercentagesOfCover(
          FIELD_VALUES.POLICY_TYPE.MULTI,
          API.MAPPINGS.RISK.VERY_HIGH,
        );

        const expected = PRICING_GRID.MULTI_POLICY.VERY_HIGH.COVER_PERCENTAGES;
        expect(result).toEqual(expected);
      });
    });
  });
});
