import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationPrivateMarket } from '../types';

/**
 * Create an private market test helper
 * Create an private market
 * @param {Context} context: KeystoneJS context API
 * @returns {ApplicationPrivateMarket} Created private market
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a privateMarket (test helpers)');

    const agent = (await context.query.PrivateMarket.createOne({ data: {} })) as ApplicationPrivateMarket;

    return agent;
  } catch (error) {
    console.error('Error creating a privateMarket (test helpers) %o', error);

    return error;
  }
};

/**
 * Get private market test helper
 * Get an private market by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} privateMarketId: Private market ID
 * @returns {Promise<ApplicationPrivateMarket>} Private market
 */
const get = async (context: Context, agentId: string) => {
  try {
    console.info('Getting an privateMarket by ID (test helpers)');

    const agent = await context.db.PrivateMarket.findOne({
      where: { id: agentId },
    });

    return agent;
  } catch (error) {
    console.error('Error getting a privateMarket by ID (test helpers) %o', error);

    throw new Error(`Getting an privateMarket by ID (test helpers) ${error}`);
  }
};

const privateMarket = {
  create,
  get,
};

export default privateMarket;
