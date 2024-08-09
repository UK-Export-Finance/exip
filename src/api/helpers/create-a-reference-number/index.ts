import { Context } from '../../types';

/**
 * createAReferenceNumber
 * Create a reference number with an application relationship
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created reference number
 */
const createAReferenceNumber = async (context: Context, applicationId: string) => {
  console.info('Creating a reference number for %s', applicationId);

  try {
    const created = await context.db.ReferenceNumber.createOne({
      data: {
        application: {
          connect: {
            id: applicationId,
          },
        },
      },
    });

    return created.id;
  } catch (error) {
    console.error('Error creating a reference number %O', error);

    throw new Error(`Creating a reference number ${error}`);
  }
};

export default createAReferenceNumber;
