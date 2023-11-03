import requiredFields from '.';
import { FIELD_IDS } from '../../../constants';

const { ACCOUNT_TO_APPLY_ONLINE, BUYER_COUNTRY_ISO_CODE, TOTAL_CONTRACT_VALUE_ID, WANT_COVER_OVER_MAX_AMOUNT } = FIELD_IDS.INSURANCE.ELIGIBILITY;

describe('server/helpers/required-fields/eligibility', () => {
  it('should return array of required fields', () => {
    const result = requiredFields();

    const fieldIds = Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY);

    const expected = fieldIds.filter(
      (id) => id !== ACCOUNT_TO_APPLY_ONLINE && id !== BUYER_COUNTRY_ISO_CODE && id !== WANT_COVER_OVER_MAX_AMOUNT && id !== TOTAL_CONTRACT_VALUE_ID,
    );

    expect(result).toEqual(expected);
  });
});
