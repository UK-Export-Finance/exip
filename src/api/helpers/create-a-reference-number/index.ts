import { Context } from '../../types';

/**
 * createAReferenceNumber
 * Create a reference number with application relationship
 * @param {Context} KeystoneJS context API
 * @param {String} Application ID
 * @returns {Promise<Object>} Created reference number
 */
const createAReferenceNumber = async (context: Context, applicationId: string) => {
  console.info('Creating a reference number for ', applicationId);

  try {
    const created = await context.db.ReferenceNumber.createOne({
      data: { applicationId },
    });

    
    return {
      ...created,
      referenceNumber: created.id,
    };
  } catch (err) {
    console.error('Error creating a reference number %O', err);

    throw new Error(`Creating a reference number ${err}`);
  }
};

export default createAReferenceNumber;
