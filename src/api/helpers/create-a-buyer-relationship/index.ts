import { Context } from '../../types';

/**
 * createABuyerRelationship
 * Create a buyer relationship row with buyer relationships.
 * @param {Object} KeystoneJS context API
 * @param {String} buyerId: Buyer ID
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created buyer relationship
 */
const createABuyerRelationship = async (context: Context, buyerId: string, applicationId: string) => {
  console.info('Creating a buyer relationship for ', buyerId);

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
  } catch (err) {
    console.error('Error creating a buyer relationship %O', err);

    throw new Error(`Creating a buyer relationship ${err}`);
  }
};

export default createABuyerRelationship;
