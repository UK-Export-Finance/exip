import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getPolicyContactById
 * Get a policy contact by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Policy contact ID
 * @returns {Promise<ApplicationPolicyContact>}
 */
const getPolicyContactById = async (context: Context, id: string) => {
  try {
    console.info('Getting policyContact by ID %s', id);

    const policyContact = await context.db.PolicyContact.findOne({
      where: { id },
    });

    return policyContact;
  } catch (error) {
    console.error('Getting policyContact by ID %s %O', id, error);

    throw new Error(`Error Getting policyContact by ID ${id} ${error}`);
  }
};

export default getPolicyContactById;
