import preCreditPeriodRule from './another-company';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  POLICY: { NEED_ANOTHER_COMPANY_TO_BE_INSURED: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/another-company/validation/rules/pre-credit-period', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  it('should return the result of emptyFieldValidation', () => {
    const result = preCreditPeriodRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
