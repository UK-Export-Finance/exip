import { Application, TestHelperPolicyCreate } from '../types';

/**
 * create policy test helper
 * Create an policy with mock policy data and any provied custom policy data.
 * @param {Object} KeystoneJS context API, policy data
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
