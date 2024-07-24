import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationPolicyContact } from '../types';

/**
 * Create policy contact test helper
 * Create a policy contact
 * @param {Context} context: KeystoneJS context API
 * @returns {ApplicationPolicyContact} Created policy
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a policyContact (test helpers)');

    const policyContact = (await context.query.PolicyContact.createOne({ data: {} })) as ApplicationPolicyContact;

    return policyContact;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * get policy contact test helper
 * Get an policy contact by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} policyContactId: Policy contact ID
 * @returns {Promise<ApplicationPolicyContact>} Policy contact
 */
const get = async (context: Context, policyContactId: string): Promise<ApplicationPolicyContact> => {
  try {
    console.info('Getting an policyContact by ID (test helpers)');

    const policyContact = (await context.db.PolicyContact.findOne({
      where: { id: policyContactId },
    })) as ApplicationPolicyContact;

    return policyContact;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting an policyContact by ID (test helpers) ${err}`);
  }
};

const policies = {
  create,
  get,
};

export default policies;
