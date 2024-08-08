import { ApplicationPolicy, TestHelperPolicyCreate, TestHelperPolicyUpdate } from '../types';

/**
 * Update policy test helper
 * Update a policy with provied custom policy data.
 * @param {Context} context: KeystoneJS context API, policy data
 * @param {Object} data: Policy data
 * @param {String} policyId: Policy ID
 * @returns {ApplicationPolicy} Created policy
 */
const update = async ({ context, data, policyId }: TestHelperPolicyUpdate) => {
  try {
    console.info('Updating a policy (test helpers)');

    const policy = (await context.db.Policy.updateOne({
      where: { id: policyId },
      data,
    })) as ApplicationPolicy;

    return policy;
  } catch (error) {
    console.error(error);
    return error;
  }
};

/**
 * Create policy test helper
 * Create a policy with or without any provied custom policy data.
 * @param {Context} context: KeystoneJS context API, policy data
 * @param {Object} data: Policy data
 * @returns {ApplicationPolicy} Created policy
 */
const create = async ({ context, data = {} }: TestHelperPolicyCreate) => {
  try {
    console.info('Creating a policy (test helpers)');

    const policy = (await context.db.Policy.createOne({ data })) as ApplicationPolicy;

    return policy;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const policies = {
  create,
  update,
};

export default policies;
