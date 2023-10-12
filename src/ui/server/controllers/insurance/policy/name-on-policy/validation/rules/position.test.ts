import positionRule from './position';
import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  POLICY: {
    NAME_ON_POLICY: { POSITION: FIELD_ID, NAME, SAME_NAME, OTHER_NAME },
  },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    POLICY: {
      NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/name-on-policy/validation/rules/position', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when the field is not provided and ${NAME} and ${SAME_NAME} are not selected`, () => {
    it('should return provided error object', () => {
      const mockSubmittedData = {};

      const result = positionRule(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`when the field is not provided and ${OTHER_NAME} is selected`, () => {
    it('should return provided error object', () => {
      const mockSubmittedData = {
        [NAME]: OTHER_NAME,
      };

      const result = positionRule(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`when the field is not provided and ${SAME_NAME} is selected`, () => {
    it('should return result of emptyFieldValidation', () => {
      const mockSubmittedData = {
        [NAME]: SAME_NAME,
      };

      const result = positionRule(mockSubmittedData, mockErrors);

      const expected = emptyFieldValidation(mockSubmittedData, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [FIELD_ID]: 'Mock text',
      };

      const result = positionRule(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
