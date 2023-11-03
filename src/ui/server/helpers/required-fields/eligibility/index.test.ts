import requiredFields, { irrelevantFields } from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const { ACCOUNT_TO_APPLY_ONLINE, BUYER_COUNTRY_ISO_CODE } = INSURANCE_FIELD_IDS.ELIGIBILITY;
const { TOTAL_CONTRACT_VALUE_ID, WANT_COVER_OVER_MAX_AMOUNT, WANT_COVER_OVER_MAX_PERIOD, COVER_PERIOD_ID } = INSURANCE_FIELD_IDS.ELIGIBILITY;

describe('server/helpers/required-fields/eligibility', () => {
  describe('irrelevantFields', () => {
    it('should return array of irrelevant fields', () => {
      const expected = [
        ACCOUNT_TO_APPLY_ONLINE,
        BUYER_COUNTRY_ISO_CODE,
        WANT_COVER_OVER_MAX_AMOUNT,
        TOTAL_CONTRACT_VALUE_ID,
        WANT_COVER_OVER_MAX_PERIOD,
        COVER_PERIOD_ID,
      ];

      expect(irrelevantFields).toEqual(expected);
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields();

      const fieldIds = Object.values(INSURANCE_FIELD_IDS.ELIGIBILITY);

      const expected = fieldIds.filter((id) => !irrelevantFields.includes(id));

      expect(result).toEqual(expected);
    });
  });
});
