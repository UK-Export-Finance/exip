import { Context } from '../../types';

/**
 * createAPolicyContact
 * Create a policy contact with an application relationship
 * @param {Context} context: KeystoneJS context API
 * @param {string} applicationId: Application ID
 * @returns {Promise<object>} Created policy contact
 */
const createAPolicyContact = async (context: Context, applicationId: string) => {
  console.info('Creating a policy contact for %s', applicationId);

  try {
    const policyContact = await context.db.PolicyContact.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });

    return policyContact;
  } catch (error) {
    console.error('Error creating a policy contact %o', error);

    throw new Error(`Creating a policy contact ${error}`);
  }
};

export default createAPolicyContact;
