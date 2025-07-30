import { Context, ApplicationJointlyInsuredParty } from '../../types';

/**
 * createAJointlyInsuredParty
 * Create a jointly insured party with a policy relationship.
 * @param {Context} context: KeystoneJS context API
 * @param {string} Policy ID
 * @returns {Promise<object>} Created policy
 */
const createAJointlyInsuredParty = async (context: Context, policyId: string): Promise<ApplicationJointlyInsuredParty> => {
  console.info('Creating a jointly insured party for %s', policyId);

  try {
    const jointlyInsuredParty = await context.db.JointlyInsuredParty.createOne({
      data: {
        policy: {
          connect: { id: policyId },
        },
      },
    });

    return jointlyInsuredParty;
  } catch (error) {
    console.error('Error creating a jointly insured party %o', error);

    throw new Error(`Creating a jointly insured party ${error}`);
  }
};

export default createAJointlyInsuredParty;
