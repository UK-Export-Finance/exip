import { Context } from '.keystone/types';

/**
 * createABuyerContact
 * Create a buyer contact with buyer relationships.
 * @param {Context} KeystoneJS context API
 * @param {String} buyerId: Buyer ID
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created buyer contact
 */
const createABuyerContact = async (context: Context, buyerId: string, applicationId: string) => {
  console.info('Creating a buyer contact for ', buyerId);

  try {
    const buyerContact = await context.db.BuyerContact.createOne({
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

    return buyerContact;
  } catch (err) {
    console.error('Error creating a buyer contact %O', err);

    throw new Error(`Creating a buyer contact ${err}`);
  }
};

export default createABuyerContact;
