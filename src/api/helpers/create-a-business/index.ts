import { Context } from '../../types';

/**
 * createABusiness
 * Create a business with an application relationship
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created business
 */
const createABusiness = async (context: Context, applicationId: string) => {
  console.info('Creating a business for %s', applicationId);

  try {
    const business = await context.db.Business.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });

    return business;
  } catch (error) {
    console.error('Error creating a business %o', error);

    throw new Error(`Creating a business ${error}`);
  }
};

export default createABusiness;
