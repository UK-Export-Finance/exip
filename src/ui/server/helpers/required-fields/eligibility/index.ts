import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';

const {
  HAVE_AN_ACCOUNT,
  BUYER_COUNTRY_ISO_CODE,
  COMPANIES_HOUSE,
  COMPANIES_HOUSE_NUMBER,
  COMPANY,
  COVER_PERIOD,
  COVER_PERIOD_ID,
  HAS_END_BUYER,
  TOTAL_CONTRACT_VALUE,
  TOTAL_CONTRACT_VALUE_ID,
  HAS_REVIEWED_ELIGIBILITY,
  IS_PARTY_TO_CONSORTIUM,
  IS_MEMBER_OF_A_GROUP,
  ...FIELD_IDS
} = INSURANCE_FIELD_IDS.ELIGIBILITY;

/**
 * IRRELEVANT_FIELD_IDS
 * List of field IDs that are not relevant.
 * These fields are part of eligibility field IDs, but do not require data checks.
 */
export const IRRELEVANT_FIELD_IDS: Array<string> = [
  BUYER_COUNTRY_ISO_CODE,
  COVER_PERIOD_ID,
  HAVE_AN_ACCOUNT,
  TOTAL_CONTRACT_VALUE_ID,
  IS_PARTY_TO_CONSORTIUM,
  IS_MEMBER_OF_A_GROUP,
  HAS_END_BUYER,
];

/**
 * Required fields for the insurance - eligibility section
 * @returns {Array<string>} Array of tasks/field IDs
 */
const requiredFields = (): Array<string> => {
  const fieldIds = Object.values(FIELD_IDS);

  const filteredFieldIds = fieldIds.filter((id) => !IRRELEVANT_FIELD_IDS.includes(id));

  return filteredFieldIds;
};

export default requiredFields;
