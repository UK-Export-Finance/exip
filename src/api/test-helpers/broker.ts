import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationBroker } from '../types';

/**
 * Create an broker test helper
 * Create an broker
 * @param {Context} context: KeystoneJS context API
 * @returns {ApplicationBroker} Created broker
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a broker (test helpers)');

    const broker = (await context.query.Broker.createOne({ data: {} })) as ApplicationBroker;

    return broker;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * Get broker test helper
 * Get an broker by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} brokerId: Broker ID
 * @returns {Promise<ApplicationExportContract>} Broker
 */
const get = async (context: Context, brokerId: string) => {
  try {
    console.info('Getting a broker by ID (test helpers)');

    const broker = await context.db.Broker.findOne({
      where: { id: brokerId },
    });

    return broker;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting an broker by ID (test helpers) ${err}`);
  }
};

const broker = {
  create,
  get,
};

export default broker;
