import positionRule from './position';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { POLICY_FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import alphaCharactersAndMaxLengthValidation from '../../../../../../shared-validation/alpha-characters-and-max-length';
import { mockErrors } from '../../../../../../test-mocks';

const {
  POLICY: {
    NAME_ON_POLICY: { POSITION: FIELD_ID, NAME, SAME_NAME },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

const { NAME_ON_POLICY } = POLICY_FIELDS;

const MAXIMUM = Number(NAME_ON_POLICY[FIELD_ID].MAXIMUM);

describe('controllers/insurance/policy/name-on-policy/validation/rules/position', () => {
  describe(`when ${NAME} does NOT equal ${SAME_NAME}`, () => {
    it('should return provided error object', () => {
      const mockSubmittedData = {};

      const result = positionRule(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`when ${NAME} equals ${SAME_NAME}`, () => {
    it('should return the result of alphaCharactersOnlyValidation', () => {
      const mockBody = {
        [NAME]: SAME_NAME,
      };

      const result = positionRule(mockBody, mockErrors);

      const expected = alphaCharactersAndMaxLengthValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM);

      expect(result).toEqual(expected);
    });
  });
});
