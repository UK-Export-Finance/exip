import { COVER_PERIOD } from '../constants';
import { CoverPeriod, TestHelperCreate } from '../types';

const coverPeriodQuery = 'id value valueId';

/**
 * create coverPeriod test helper
 * Create an coverPeriod with mock data
 * @param {Object} KeystoneJS context API
 * @returns {Object} Created coverPeriod
 */
const create = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating an coverPeriod (test helpers)');

    const coverPeriod = (await context.query.CoverPeriod.createOne({
      data: {
        valueId: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
        value: 'Mock value',
      },
      query: coverPeriodQuery,
    })) as CoverPeriod;

    return coverPeriod;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const coverPeriod = {
  create,
};

export default coverPeriod;
