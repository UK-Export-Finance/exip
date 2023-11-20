import { DEFAULT } from '../../../../content-strings';
import { COVER_PERIOD, FIELD_IDS } from '../../../../constants';
import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance/eligibility';

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.COVER_PERIOD;
const { LESS_THAN_2_YEARS, MORE_THAN_2_YEARS } = COVER_PERIOD;

const { ABOVE, BELOW } = FIELDS_ELIGIBILITY[FIELD_ID].OPTIONS;

/**
 * mapCoverPeriodField
 * maps cover period field value based on database id
 * @param {Number} answer
 * @returns {String} Above or below X years
 */
const mapCoverPeriodField = (answer?: number) => {
  if (answer === MORE_THAN_2_YEARS.DB_ID) {
    return ABOVE.TEXT;
  }

  if (answer === LESS_THAN_2_YEARS.DB_ID) {
    return BELOW.TEXT;
  }

  return DEFAULT.EMPTY;
};

export default mapCoverPeriodField;
