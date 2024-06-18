import companyOrOrganisationNameRules from './organisation-name';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants/validation';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../test-mocks';

const {
  COMPANY_OR_ORGANISATION: { NAME: FIELD_ID },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/validation/organisation-name', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of providedAndMaxLength', () => {
    const result = companyOrOrganisationNameRules(mockBody, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.BUYER.COMPANY_OR_ORGANISATION);

    expect(result).toEqual(expected);
  });
});
