import { Context } from '.keystone/types'; // eslint-disable-line

const createPrivateMarket = async (context: Context, applications: Array<object>) => {
  const loggingMessage = 'Creating privateMarkets with exportContract relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const exportContractIdsConnectArray = applications.map((application) => ({
      exportContract: {
        connect: {
          // @ts-ignore
          id: application.exportContractId,
        },
      },
    }));

    const created = await context.db.PrivateMarket.createMany({
      data: exportContractIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createPrivateMarket;
