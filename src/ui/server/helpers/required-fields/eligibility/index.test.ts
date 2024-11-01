import requiredFields, { IRRELEVANT_FIELD_IDS } from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  ELIGIBILITY: {
    BUYER_COUNTRY_ISO_CODE,
    COMPANY,
    COMPANIES_HOUSE,
    COMPANIES_HOUSE_NUMBER,
    COVER_PERIOD,
    COVER_PERIOD_ID,
    HAVE_AN_ACCOUNT,
    HAS_END_BUYER,
    TOTAL_CONTRACT_VALUE_ID,
    TOTAL_CONTRACT_VALUE,
    HAS_REVIEWED_ELIGIBILITY,
    IS_PARTY_TO_CONSORTIUM,
    IS_MEMBER_OF_A_GROUP,
    ...FIELD_IDS
  },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/required-fields/eligibility', () => {
  describe('IRRELEVANT_FIELD_IDS', () => {
    it('should return an object of irrelevant fields', () => {
      const expected = [
        BUYER_COUNTRY_ISO_CODE,
        COVER_PERIOD_ID,
        HAVE_AN_ACCOUNT,
        TOTAL_CONTRACT_VALUE_ID,
        IS_PARTY_TO_CONSORTIUM,
        IS_MEMBER_OF_A_GROUP,
        HAS_END_BUYER,
      ];

      expect(IRRELEVANT_FIELD_IDS).toEqual(expected);
    });
  });

  it('should return array of required fields', () => {
    const result = requiredFields();

    const fieldIds = Object.values(FIELD_IDS);

    const expected = fieldIds.filter((id) => !IRRELEVANT_FIELD_IDS.includes(id));

    expect(result).toEqual(expected);
  });
});
