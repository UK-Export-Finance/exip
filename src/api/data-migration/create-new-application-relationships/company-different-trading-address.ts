import { Context } from '.keystone/types'; // eslint-disable-line

const createCompanyDifferentTradingAddress = async (context: Context, applications: Array<object>) => {
  const loggingMessage = 'Creating companyDifferentTradingAddresses with company relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const companyIdsConnectArray = applications.map((application) => ({
      company: {
        connect: {
          // @ts-ignore
          id: application.companyId,
        },
      },
    }));

    const created = await context.db.CompanyDifferentTradingAddress.createMany({
      data: companyIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createCompanyDifferentTradingAddress;
