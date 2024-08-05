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
 * GENERIC_IRRELEVANT_FIELD_IDS
 * List of generic field IDs that are not relevant for V1 and V2 applications.
 */
export const GENERIC_IRRELEVANT_FIELD_IDS = [BUYER_COUNTRY_ISO_CODE, COVER_PERIOD_ID, HAVE_AN_ACCOUNT, TOTAL_CONTRACT_VALUE_ID];

/**
 * IRRELEVANT_FIELD_IDS
 * List of field IDs that are not relevant for V1 or V2 applications.
 * If an application has been migrated from V1 to V2, the IS_PARTY_TO_CONSORTIUM and IS_MEMBER_OF_A_GROUP fields are NOT required.
 * Otherwise, these 2x fields are required.
 * This is because:
 * - In V1, IS_PARTY_TO_CONSORTIUM and IS_MEMBER_OF_A_GROUP fields do NOT exist.
 * - In V2, IS_PARTY_TO_CONSORTIUM and IS_MEMBER_OF_A_GROUP do exist.
 */
export const IRRELEVANT_FIELD_IDS = {
  V1: GENERIC_IRRELEVANT_FIELD_IDS,
  V2: [...GENERIC_IRRELEVANT_FIELD_IDS, IS_PARTY_TO_CONSORTIUM, IS_MEMBER_OF_A_GROUP],
};

/**
 * Required fields for the insurance - eligibility section
 * Depending on the application version,
 * generate a list of field IDs that are required eligibility fields.
 * Some fields are required for V2, but not V1.
 * Additionally, the following fields are part of eligibility field IDs, but do not require data checks.
 * 1) HAVE_AN_ACCOUNT field - has no data/value.
 * 2) BUYER_COUNTRY_ISO_CODE field - data is saved as BUYER_COUNTRY relationship object.
 * 3) TOTAL_CONTRACT_VALUE_ID field - data is saved as TOTAL_CONTRACT_VALUE relationship object.
 * 4) COVER_PERIOD_ID field - data is saved as COVER_PERIOD relationship object.
 * @param {Boolean} migratedV1toV2: Application has been migrated from V1 to V2
 * @returns {Array} Required field IDs
 */
const requiredFields = (migratedV1toV2?: boolean): Array<string> => {
  const fieldIds = Object.values(FIELD_IDS);

  let filteredFieldIds = [];

  if (migratedV1toV2) {
    filteredFieldIds = fieldIds.filter((id) => !IRRELEVANT_FIELD_IDS.V2.includes(id));
  } else {
    filteredFieldIds = fieldIds.filter((id) => !IRRELEVANT_FIELD_IDS.V1.includes(id));
  }

  return filteredFieldIds;
};

export default requiredFields;
