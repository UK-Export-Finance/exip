import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getBrokerById
 * Get a broker by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Broker ID
 * @returns {Promise<ApplicationBroker>}
 */
const getBrokerById = async (context: Context, id: string) => {
  try {
    console.info(`Getting broker by ID ${id}`);

    const broker = await context.db.Broker.findOne({
      where: { id },
    });

    return broker;
  } catch (err) {
    console.error(`Getting broker by ID ${id} %O`, err);

    throw new Error(`Error Getting broker by ID ${id} ${err}`);
  }
};

export default getBrokerById;
