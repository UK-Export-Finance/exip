const rule = require('./policy-length');
const { FIELD_IDS, FIELD_VALUES } = require('../../../../constants');
const { ERROR_MESSAGES } = require('../../../../content-strings');
const generateValidationErrors = require('../../../../helpers/validation');

describe('controllers/tell-us-about-your-policy/validation/rules/policy-length', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  };

  describe(`when ${FIELD_IDS.POLICY_TYPE} is ${FIELD_VALUES.POLICY_TYPE.SINGLE}`, () => {
    beforeEach(() => {
      mockBody[FIELD_IDS.POLICY_TYPE] = FIELD_VALUES.POLICY_TYPE.SINGLE;
    });

    describe(`when ${FIELD_IDS.SINGLE_POLICY_LENGTH} is not provided`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.SINGLE_POLICY_LENGTH] = '';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.SINGLE_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.SINGLE_POLICY_LENGTH} has a decimal`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.SINGLE_POLICY_LENGTH] = '1.2';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.SINGLE_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.SINGLE_POLICY_LENGTH} is not a number`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.SINGLE_POLICY_LENGTH] = 'invalid';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.SINGLE_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.SINGLE_POLICY_LENGTH} is below the minimum`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.SINGLE_POLICY_LENGTH] = '0';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.SINGLE_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.SINGLE_POLICY_LENGTH} is above the maximum`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.SINGLE_POLICY_LENGTH] = '25';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.SINGLE_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });
  });

  describe(`when ${FIELD_IDS.POLICY_TYPE} is ${FIELD_VALUES.POLICY_TYPE.MULTI}`, () => {
    beforeEach(() => {
      mockBody[FIELD_IDS.POLICY_TYPE] = FIELD_VALUES.POLICY_TYPE.MULTI;
    });

    describe(`when ${FIELD_IDS.MULTI_POLICY_LENGTH} is not provided`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.MULTI_POLICY_LENGTH] = '';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.MULTI_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].IS_EMPTY,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.MULTI_POLICY_LENGTH} has a decimal`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.MULTI_POLICY_LENGTH] = '1.2';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.MULTI_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.MULTI_POLICY_LENGTH} is not a number`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.MULTI_POLICY_LENGTH] = 'invalid';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.MULTI_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].NOT_A_NUMBER,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.MULTI_POLICY_LENGTH} is below the minimum`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.MULTI_POLICY_LENGTH] = '0';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.MULTI_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].BELOW_MINIMUM,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_IDS.POLICY_LENGTH} is above the maximum`, () => {
      it('should return validation error', () => {
        mockBody[FIELD_IDS.MULTI_POLICY_LENGTH] = '13';

        const result = rule(mockBody, mockErrors);

        const expected = generateValidationErrors(
          FIELD_IDS.MULTI_POLICY_LENGTH,
          ERROR_MESSAGES[FIELD_IDS.MULTI_POLICY_LENGTH].ABOVE_MAXIMUM,
          mockErrors,
        );

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      mockBody[FIELD_IDS.POLICY_TYPE] = FIELD_VALUES.POLICY_TYPE.MULTI;
      mockBody[FIELD_IDS.MULTI_POLICY_LENGTH] = '10';

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
