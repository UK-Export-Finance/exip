import countryCode from '.';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors, mockCountries } from '../../../../../../../test-mocks';

const {
  AGENT_DETAILS: { COUNTRY_CODE: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_DETAILS: {
    [FIELD_ID]: { IS_EMPTY: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-details/validation/rules/country-code', () => {
  const mockBody = {
    [FIELD_ID]: mockCountries[0].name,
  };

  it('should return the result of emptyFieldValidation', () => {
    const result = countryCode(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE, mockErrors);

    expect(result).toEqual(expected);
  });
});
