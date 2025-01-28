import { Context } from '.keystone/types'; // eslint-disable-line
import { COVER_PERIOD } from '../constants';

const coverPeriodQuery = 'id value valueId';

/**
 * Create coverPeriod test helper
 * Create an coverPeriod with mock data
 * @param {Context} context: KeystoneJS context API
 * @returns {Object} Created coverPeriod
 */
const create = async (context: Context) => {
  try {
    console.info('Creating an coverPeriod (test helpers)');

    const coverPeriod = await context.query.CoverPeriod.createOne({
      data: {
        valueId: COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID,
        value: 'Mock value',
      },
      query: coverPeriodQuery,
    });

    return coverPeriod;
  } catch (error) {
    console.error('Error creating a coverPeriod (test helpers)');

    return error;
  }
};

const coverPeriod = {
  create,
};

export default coverPeriod;
