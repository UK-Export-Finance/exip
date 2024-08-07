import { Context } from '.keystone/types'; // eslint-disable-line
import { TOTAL_CONTRACT_VALUE } from '../constants';
import { TotalContractValue } from '../types';

const totalContractValueQuery = 'id value valueId';

/**
 * create totalContractValue test helper
 * Create an totalContractValue with mock data
 * @param {Context} context: KeystoneJS context API
 * @returns {Object} Created totalContractValue
 */
const create = async (context: Context) => {
  try {
    console.info('Creating an totalContractValue (test helpers)');

    const totalContractValue = (await context.query.TotalContractValue.createOne({
      data: {
        valueId: TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID,
        value: 'Mock value',
      },
      query: totalContractValueQuery,
    })) as TotalContractValue;

    return totalContractValue;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const totalContractValue = {
  create,
};

export default totalContractValue;
