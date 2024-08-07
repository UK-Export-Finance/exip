import { Context } from '../../types';

/**
 * createAPolicyContact
 * Create a policy contact with an application relationship
 * @param {Context} KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created policy contact
 */
const createAPolicyContact = async (context: Context, applicationId: string) => {
  console.info('Creating a policy contact for ', applicationId);

  try {
    const policyContact = await context.db.PolicyContact.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });

    return policyContact;
  } catch (err) {
    console.error('Error creating a policy contact %O', err);

    throw new Error(`Creating a policy contact ${err}`);
  }
};

export default createAPolicyContact;
