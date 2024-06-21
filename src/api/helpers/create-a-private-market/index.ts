import { Context, ApplicationPrivateMarket } from '../../types';

/**
 * createAPrivateMarket
 * Create a private market with an export contract relationship.
 * @param {Context} context: KeystoneJS context API
 * @param {String} exportContractId: Export contract ID
 * @returns {Promise<Object>} Created private market
 */
const createAPrivateMarket = async (context: Context, exportContractId: string): Promise<ApplicationPrivateMarket> => {
  console.info('Creating a private market for ', exportContractId);

  try {
    const privateMarket = await context.db.PrivateMarket.createOne({
      data: {
        exportContract: {
          connect: { id: exportContractId },
        },
      },
    });

    // @ts-ignore
    return privateMarket;
  } catch (err) {
    console.error('Error creating a private market %O', err);

    throw new Error(`Creating a private market ${err}`);
  }
};

export default createAPrivateMarket;
