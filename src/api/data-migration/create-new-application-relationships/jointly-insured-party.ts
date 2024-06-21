import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * createJointlyInsuredParty
 * Create new "jointly insured party" entries with "policy" relationships.
 * 1) Create an array of policy ID "connect" relationships.
 * 2) Create "jointly insured party" entries.
 * @param {Context} context: KeystoneJS context API
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<ApplicationJointlyInsuredParty>>} Jointly insured party entries
 */
const createJointlyInsuredParty = async (context: Context, applications: Array<object>) => {
  const loggingMessage = 'Creating jointlyInsuredParty with policy relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const policyIdsConnectArray = applications.map((application) => ({
      policy: {
        connect: {
          id: application.policyId,
        },
      },
    }));

    const created = await context.db.JointlyInsuredParty.createMany({
      data: policyIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createJointlyInsuredParty;
