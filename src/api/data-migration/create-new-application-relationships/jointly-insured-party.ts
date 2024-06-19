import { Context } from '.keystone/types'; // eslint-disable-line

const createJointlyInsuredParty = async (context: Context, applications: Array<object>) => {
  const loggingMessage = 'Creating jointlyInsuredParty with policy relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const policyIdsConnectArray = applications.map((application) => ({
      policy: {
        connect: {
          // @ts-ignore
          id: application.policyId,
        },
      },
    }));

    const created = await context.db.JointlyInsuredParty.createMany({
      data: policyIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.info(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createJointlyInsuredParty;
