import name from '.';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import nameValidation from '../../../../../../../shared-validation/name';
import { RequestBody } from '../../../../../../../../types';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  AGENT_DETAILS: { NAME: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-details/validation/rules/name', () => {
  const mockBody: RequestBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of nameValidation', () => {
    const response = name(mockBody, mockErrors);

    const expected = nameValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.AGENT_NAME);

    expect(response).toEqual(expected);
  });
});
