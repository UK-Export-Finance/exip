import requiredFields from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  ELIGIBILITY: { ACCOUNT_TO_APPLY_ONLINE, BUYER_COUNTRY_ISO_CODE, COMPANY, COMPANIES_HOUSE, COMPANIES_HOUSE_NUMBER, ...FIELD_IDS },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/required-fields/eligibility', () => {
  it('should return array of required fields', () => {
    const result = requiredFields();

    const fieldIds = Object.values(FIELD_IDS);

    const expected = fieldIds.filter((fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE && fieldId !== BUYER_COUNTRY_ISO_CODE);

    expect(result).toEqual(expected);
  });
});
