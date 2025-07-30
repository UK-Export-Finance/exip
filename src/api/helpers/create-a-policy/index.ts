import { APPLICATION } from '../../constants';
import createAJointlyInsuredParty from '../create-a-jointly-insured-party';
import { Context, CreatePolicyResponse } from '../../types';

/**
 * createAPolicy
 * Create a policy with an application relationship.
 * @param {Context} context: KeystoneJS context API
 * @param {string} applicationId: Application ID
 * @returns {Promise<object>} Created policy
 */
const createAPolicy = async (context: Context, applicationId: string): Promise<CreatePolicyResponse> => {
  console.info('Creating a policy for %s', applicationId);

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
      ...policy,
      jointlyInsuredParty,
    };
  } catch (error) {
    console.error('Error creating a policy %o', error);

    throw new Error(`Creating a policy ${error}`);
  }
};

export default createAPolicy;
