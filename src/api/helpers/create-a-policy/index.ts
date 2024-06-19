import { Context } from '.keystone/types';
import { APPLICATION } from '../../constants';
import createAJointlyInsuredParty from '../create-a-jointly-insured-party';
// import { CreatePolicyResponse } from '../../types';

/**
 * createAPolicy
 * Create a policy with an application relationship.
 * @param {Context} KeystoneJS context API
 * @param {String} Application ID
 * @returns {Promise<Object>} Created policy
 */
// const createAPolicy = async (context: Context, applicationId: string): Promise<CreatePolicyResponse> => {
const createAPolicy = async (context: Context, applicationId: string): Promise<object> => {
  console.info('Creating a policy for ', applicationId);

  try {
    const policy = await context.db.Policy.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
        needPreCreditPeriodCover: APPLICATION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER,
      },
    });

    const jointlyInsuredParty = await createAJointlyInsuredParty(context, policy.id);

    return {
      policy,
      jointlyInsuredParty,
    };
  } catch (err) {
    console.error('Error creating a policy %O', err);

    throw new Error(`Creating a policy ${err}`);
  }
};

export default createAPolicy;
