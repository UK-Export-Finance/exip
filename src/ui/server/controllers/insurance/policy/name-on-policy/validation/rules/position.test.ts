import positionRule from './position';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import nameValidation from '../../../../../../shared-validation/name';
import { mockErrors } from '../../../../../../test-mocks';

const {
  NAME_ON_POLICY: { POSITION: FIELD_ID, NAME, SAME_NAME },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

const MAXIMUM = MAXIMUM_CHARACTERS.NAME_ON_POLICY_POSITION;

describe('controllers/insurance/policy/name-on-policy/validation/rules/position', () => {
  describe(`when ${NAME} does NOT equal ${SAME_NAME}`, () => {
    it('should return provided error object', () => {
      const mockSubmittedData = {};

      const result = positionRule(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`when ${NAME} equals ${SAME_NAME}`, () => {
    it('should return the result of nameValidation', () => {
      const mockBody = {
        [NAME]: SAME_NAME,
      };

      const result = positionRule(mockBody, mockErrors);

      const expected = nameValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM);

      expect(result).toEqual(expected);
    });
  });
});
