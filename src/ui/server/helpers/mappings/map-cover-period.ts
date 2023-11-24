import { DEFAULT } from '../../content-strings';
import { COVER_PERIOD } from '../../constants';

const { LESS_THAN_2_YEARS, MORE_THAN_2_YEARS } = COVER_PERIOD;

/**
 * mapCoverPeriodField
 * maps cover period based on database id
 * @param {Number} answer
 * @returns {String} Less or more than 2 years value
 */
const mapCoverPeriodField = (answer?: number) => {
  if (answer === LESS_THAN_2_YEARS.DB_ID) {
    return LESS_THAN_2_YEARS.VALUE;
  }

  if (answer === MORE_THAN_2_YEARS.DB_ID) {
    return MORE_THAN_2_YEARS.VALUE;
  }

  return DEFAULT.EMPTY;
};

export default mapCoverPeriodField;
