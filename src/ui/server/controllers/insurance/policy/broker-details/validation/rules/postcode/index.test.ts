import postcodeRules from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import postcodeValidation from '../../../../../../../shared-validation/postcode';
import { mockErrors } from '../../../../../../../test-mocks';
import { RequestBody } from '../../../../../../../../types';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK, POSTCODE: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/broker-details/validation/rules/postcode', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  describe(`when ${IS_BASED_IN_UK} is true`, () => {
    it('should return the result of postcodeValidation', () => {
      mockBody[IS_BASED_IN_UK] = 'true';

      const result = postcodeRules(mockBody, mockErrors);

      const expected = postcodeValidation(FIELD_ID, mockBody[FIELD_ID], ERROR_MESSAGE.IS_EMPTY, ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_BASED_IN_UK} is false`, () => {
    it('should return the provided errors object', () => {
      mockBody[IS_BASED_IN_UK] = 'false';

      const result = postcodeRules(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
