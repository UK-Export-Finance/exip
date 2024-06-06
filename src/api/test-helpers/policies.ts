import { Application, TestHelperPolicyCreate } from '../types';

/**
 * Create policy test helper
 * Create a policy with or without any provied custom policy data.
 * @param {Context} KeystoneJS context API, policy data
 * @returns {Object} Created policy
 */
const create = async ({ context, data }: TestHelperPolicyCreate) => {
  try {
    console.info('Creating a policy (test helpers)');

    const policy = (await context.query.Policy.createOne({ data })) as Application;

    return policy;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const policies = {
  create,
};

export default policies;
