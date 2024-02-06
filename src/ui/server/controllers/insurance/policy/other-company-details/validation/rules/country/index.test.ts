import country from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors, mockCountries } from '../../../../../../../test-mocks';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COUNTRY: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: {
    [FIELD_ID]: { IS_EMPTY: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/other-company-details/validation/rules/country', () => {
  const mockBody = {
    [FIELD_ID]: mockCountries[0].name,
  };

  it('should return the result of providedAndMaxLength', () => {
    const result = country(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE, mockErrors);

    expect(result).toEqual(expected);
  });
});
