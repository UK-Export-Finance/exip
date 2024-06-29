import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationCompanyDifferentTradingAddress } from '../../../types';

/**
 * createCompanyDifferentTradingAddress
 * Create new "company different trading address" entries with company relationships.
 * 1) Create an array of "company different trading address" data - using the application's companyId.
 * 2) Create new "company different trading address" entries.
 * @param {Context} context: KeystoneJS context API
 * @param {<Array<Application>>} applications: Applications
 * @returns {Promise<Array<ApplicationCompanyDifferentTradingAddress>>} Company different trading address entries
 */
const createCompanyDifferentTradingAddress = async (
  context: Context,
  applications: Array<object>,
): Promise<Array<ApplicationCompanyDifferentTradingAddress>> => {
  const loggingMessage = 'Creating companyDifferentTradingAddresses with company relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const companyIdsConnectArray = applications.map((application) => ({
      company: {
        connect: {
          id: application.company,
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
