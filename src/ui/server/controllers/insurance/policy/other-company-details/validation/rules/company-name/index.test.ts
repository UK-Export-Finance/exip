import companyName from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { POLICY_FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import providedAndMaxLength from '../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  OTHER_COMPANY_TO_INSURE_NAME_TBC: { COMPANY_NAME: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  OTHER_COMPANY_TO_INSURE_NAME_TBC: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

const MAXIMUM = Number(POLICY_FIELDS.OTHER_COMPANY_TO_INSURE_NAME_TBC[FIELD_ID].MAXIMUM);

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
