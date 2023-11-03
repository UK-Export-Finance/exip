import { COVER_PERIOD } from '../../constants';

/**
 * mapCoverPeriodId
 * @param {Boolean} answer: cover period answer
 * @returns {Number} cover period DB ID
 */
export const mapCoverPeriodId = (answer: boolean) => {
  if (answer) {
    return COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID;
  }

  return COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID;
};

export default mapCoverPeriodId;
