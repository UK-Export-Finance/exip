import name from '.';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  AGENT_SERVICE: { SERVICE_DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_SERVICE: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-details/validation/rules/service-description', () => {
  const mockBody = {};

  it('should return the result of alphaCharactersAndMaxLengthValidation', () => {
    const response = name(mockBody, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.AGENT_SERVICE_DESCRIPTION);

    expect(response).toEqual(expected);
  });
});
