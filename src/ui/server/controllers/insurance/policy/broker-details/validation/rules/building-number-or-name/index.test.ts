import buildingNumberOrNameRules from '.';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../test-mocks';
import { RequestBody } from '../../../../../../../../types';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK, BUILDING_NUMBER_OR_NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  BROKER_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/broker-details/validation/rules/building-number-or-name', () => {
  const mockBody: RequestBody = {
    [FIELD_ID]: '',
  };

  describe(`when ${IS_BASED_IN_UK} is true`, () => {
    it('should return the result of providedAndMaxLength', () => {
      mockBody[IS_BASED_IN_UK] = 'true';

      const result = buildingNumberOrNameRules(mockBody, mockErrors);

      const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.BROKER_BUILDING_NUMBER_OR_NAME);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_BASED_IN_UK} is false`, () => {
    it('should return the provided errors object', () => {
      mockBody[IS_BASED_IN_UK] = 'false';

      const result = buildingNumberOrNameRules(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
