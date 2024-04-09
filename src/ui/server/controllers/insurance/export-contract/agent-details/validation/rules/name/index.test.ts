import name from '.';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import alphaCharactersAndMaxLengthValidation from '../../../../../../../shared-validation/alpha-characters-and-max-length';
import { RequestBody } from '../../../../../../../../types';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  AGENT_DETAILS: { NAME: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-details/validation/rules/name', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of alphaCharactersAndMaxLengthValidation', () => {
    const response = name(mockBody, mockErrors);

    const expected = alphaCharactersAndMaxLengthValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.AGENT_NAME);

    expect(response).toEqual(expected);
  });
});
