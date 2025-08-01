import { DEFAULT } from '../../content-strings';
import { TOTAL_CONTRACT_VALUE, FIELD_IDS } from '../../constants';
import { ELIGIBILITY_FIELDS } from '../../content-strings/fields/insurance/eligibility';

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.TOTAL_CONTRACT_VALUE;
const { LESS_THAN_250K, MORE_THAN_250K } = TOTAL_CONTRACT_VALUE;

const { ABOVE, BELOW } = ELIGIBILITY_FIELDS[FIELD_ID].SUMMARY;

/**
 * mapTotalContractValueField
 * maps total contract value based on database id
 * @param {number} answer
 * @returns {string} Above or below max amount
 */
const mapTotalContractValueField = (answer?: number) => {
  if (answer === MORE_THAN_250K.DB_ID) {
    return ABOVE;
  }

  if (answer === LESS_THAN_250K.DB_ID) {
    return BELOW;
  }

  return DEFAULT.EMPTY;
};

export default mapTotalContractValueField;
