const mapSubmittedValues = require('./map-submitted-values');
const { FIELD_IDS, FIELD_VALUES } = require('../constants');

const {
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  POLICY_LENGTH,
} = FIELD_IDS;

describe('server/helpers/map-submitted-values', () => {
  describe(`when ${POLICY_TYPE} is single`, () => {
    it(`should return ${SINGLE_POLICY_LENGTH} as ${POLICY_LENGTH}`, () => {
      const mockValues = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        [POLICY_LENGTH]: 12,
      };

      const result = mapSubmittedValues(mockValues);

      const expected = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        [SINGLE_POLICY_LENGTH]: 12,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${POLICY_TYPE} is multi`, () => {
    it(`should return ${MULTI_POLICY_LENGTH} as ${POLICY_LENGTH}`, () => {
      const mockValues = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        [POLICY_LENGTH]: 12,
      };

      const result = mapSubmittedValues(mockValues);

      const expected = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        [MULTI_POLICY_LENGTH]: 12,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no submitted values', () => {
    it('should return empty object', () => {
      const result = mapSubmittedValues({});

      expect(result).toEqual({});
    });
  });
});
