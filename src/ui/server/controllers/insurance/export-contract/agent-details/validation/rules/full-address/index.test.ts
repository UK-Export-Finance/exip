import fullAddress from '.';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  AGENT_DETAILS: { FULL_ADDRESS: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-details/validation/rules/full-address', () => {
  it('should return the result of providedAndMaxLength', () => {
    const mockBody = {};
    const result = fullAddress(mockBody, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.FULL_ADDRESS);

    expect(result).toEqual(expected);
  });
});
