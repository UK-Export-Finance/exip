import requiredFields from '.';
import { FIELD_IDS } from '../../../constants';

const { ACCOUNT_TO_APPLY_ONLINE, BUYER_COUNTRY_ISO_CODE, WANT_COVER_OVER_MAX_AMOUNT } = FIELD_IDS.INSURANCE.ELIGIBILITY;

describe('server/helpers/required-fields/eligibility', () => {
  it('should return array of required fields', () => {
    const result = requiredFields();

    const fieldIds = Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY);

    const expected = fieldIds.filter(
      (fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE && fieldId !== BUYER_COUNTRY_ISO_CODE && fieldId !== WANT_COVER_OVER_MAX_AMOUNT,
    );

    expect(result).toEqual(expected);
  });
});
