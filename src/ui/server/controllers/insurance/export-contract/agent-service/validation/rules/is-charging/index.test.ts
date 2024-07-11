import isCharging from '.';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  AGENT_SERVICE: { IS_CHARGING: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_SERVICE: {
    [FIELD_ID]: { IS_EMPTY: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-service/validation/rules/is-charging', () => {
  it('should return the result of emptyFieldValidation', () => {
    const mockBody = {};
    const result = isCharging(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE, mockErrors);

    expect(result).toEqual(expected);
  });
});
