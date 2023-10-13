import { APPLICATION } from '../../constants';
import { Context } from '../../types';

/**
 * createAPolicy
 * Create a policy with an application relationship.
 * @param {Object} KeystoneJS context API
 * @param {String} Country ID
 * @param {String} Application ID
 * @returns {Object} Created policy
 */
const createAPolicy = async (context: Context, applicationId: string) => {
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

    return policy;
  } catch (err) {
    console.error('Error creating a policy %O', err);

    throw new Error(`Creating a policy ${err}`);
  }
};

export default createAPolicy;
