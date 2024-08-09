import { Context } from '../../types';

/**
 * createABroker
 * Create a broker with an application relationship
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created broker
 */
const createABroker = async (context: Context, applicationId: string) => {
  console.info('Creating a broker for %s', applicationId);

  try {
    const broker = await context.db.Broker.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });

    return broker;
  } catch (error) {
    console.error('Error creating a broker %O', error);

    throw new Error(`Creating a broker ${error}`);
  }
};

export default createABroker;
