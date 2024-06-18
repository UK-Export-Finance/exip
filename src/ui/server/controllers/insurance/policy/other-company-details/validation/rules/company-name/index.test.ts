import companyName, { MAXIMUM } from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/other-company-details/validation/rules/company-name', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of providedAndMaxLength', () => {
    const result = companyName(mockBody, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM);

    expect(result).toEqual(expected);
  });
});
