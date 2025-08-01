import { Context, ApplicationPrivateMarket } from '../../types';

/**
 * createAPrivateMarket
 * Create a private market with an export contract relationship.
 * @param {Context} context: KeystoneJS context API
 * @param {string} exportContractId: Export contract ID
 * @returns {Promise<object>} Created private market
 */
const createAPrivateMarket = async (context: Context, exportContractId: string): Promise<ApplicationPrivateMarket> => {
  console.info('Creating a private market for %s', exportContractId);

  try {
    const privateMarket = await context.db.PrivateMarket.createOne({
      data: {
        exportContract: {
          connect: { id: exportContractId },
        },
      },
    });

    return privateMarket;
  } catch (error) {
    console.error('Error creating a private market %o', error);

    throw new Error(`Creating a private market ${error}`);
  }
};

export default createAPrivateMarket;
