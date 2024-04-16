import payableCountryCode from '.';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  AGENT_CHARGES: { PAYABLE_COUNTRY_CODE: FIELD_ID },
} = FIELD_IDS;

const {
  AGENT_CHARGES: {
    [FIELD_ID]: { IS_EMPTY: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT;

describe('controllers/insurance/export-contract/agent-charges/validation/rules/payable-country-code', () => {
  const mockBody = {};

  it('should return the result of emptyFieldValidation', () => {
    const result = payableCountryCode(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE, mockErrors);

    expect(result).toEqual(expected);
  });
});
