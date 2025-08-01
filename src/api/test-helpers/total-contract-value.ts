import { Context } from '.keystone/types'; // eslint-disable-line
import { TOTAL_CONTRACT_VALUE } from '../constants';
import { TotalContractValue } from '../types';

const totalContractValueQuery = 'id value valueId';

/**
 * create totalContractValue test helper
 * Create an totalContractValue with mock data
 * @param {Context} context: KeystoneJS context API
 * @returns {object} Created totalContractValue
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a totalContractValue (test helpers)');

    const totalContractValue = (await context.query.TotalContractValue.createOne({
      data: {
        valueId: TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID,
        value: 'Mock value',
      },
      query: totalContractValueQuery,
    })) as TotalContractValue;

    return totalContractValue;
  } catch (error) {
    console.error('Error creating a totalContractValue (test helpers) %o', error);

    return error;
  }
};

const totalContractValue = {
  create,
};

export default totalContractValue;
