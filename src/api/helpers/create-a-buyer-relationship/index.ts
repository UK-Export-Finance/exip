import { Context } from '../../types';

/**
 * createABuyerRelationship
 * Create a buyer relationship row with buyer relationships.
 * @param {Context} context: KeystoneJS context API
 * @param {string} buyerId: Buyer ID
 * @param {string} applicationId: Application ID
 * @returns {Promise<object>} Created buyer relationship
 */
const createABuyerRelationship = async (context: Context, buyerId: string, applicationId: string) => {
  console.info('Creating a buyer relationship for %s', buyerId);

  try {
    const buyerRelationship = await context.db.BuyerRelationship.createOne({
      data: {
        buyer: {
          connect: {
            id: buyerId,
          },
        },
        application: {
          connect: {
            id: applicationId,
          },
        },
      },
    });

    return buyerRelationship;
  } catch (error) {
    console.error('Error creating a buyer relationship %o', error);

    throw new Error(`Creating a buyer relationship ${error}`);
  }
};

export default createABuyerRelationship;
