import { COVER_PERIOD } from '../../constants';

/**
 * mapCoverPeriodId
 * @param {Boolean} answer: cover period answer
 * @returns {Number} cover period DB ID
 */
export const mapCoverPeriodId = (answer: boolean) => (answer ? COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID : COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID);

export default mapCoverPeriodId;
