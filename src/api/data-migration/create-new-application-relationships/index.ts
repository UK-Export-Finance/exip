import { Context } from '.keystone/types'; // eslint-disable-line
import getAllApplications from '../get-all-applications';
import createLossPayee from './loss-payee';
import createJointlyInsuredParty from './jointly-insured-party';
import createExportContractAgent from './export-contract-agent';
import createPrivateMarket from './private-market';
import createCompanyDifferentTradingAddress from './company-different-trading-address';

const createNewApplicationRelationships = async (context: Context) => {
  const loggingMessage = 'Creating new relationships for all applications';

  console.info(`✅ ${loggingMessage}`);

  try {
    const { applications, applicationIdsConnectArray } = await getAllApplications(context);

    const newRelationships = await Promise.all([
      createLossPayee(context, applicationIdsConnectArray),
      createJointlyInsuredParty(context, applications),
      createExportContractAgent(context, applications),
      createPrivateMarket(context, applications),
      createCompanyDifferentTradingAddress(context, applications),
    ]);

    return newRelationships;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createNewApplicationRelationships;
