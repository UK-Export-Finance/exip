import { Context, ApplicationJointlyInsuredParty } from '../../types';

/**
 * createAJointlyInsuredParty
 * Create a jointly insured party with a policy relationship.
 * @param {Context} KeystoneJS context API
 * @param {String} Policy ID
 * @returns {Promise<Object>} Created policy
 */
const createAJointlyInsuredParty = async (context: Context, policyId: string): Promise<ApplicationJointlyInsuredParty> => {
  console.info('Creating a jointly insured party for ', policyId);

  try {
    const jointlyInsuredParty = await context.db.JointlyInsuredParty.createOne({
      data: {
        policy: {
          connect: { id: policyId },
        },
      },
    });

    return jointlyInsuredParty;
  } catch (err) {
    console.error('Error creating a jointly insured party %O', err);

    throw new Error(`Creating a jointly insured party ${err}`);
  }
};

export default createAJointlyInsuredParty;
