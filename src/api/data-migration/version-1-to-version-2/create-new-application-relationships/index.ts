import { Connection } from 'mysql2/promise';
import getAllApplications from '../get-all-applications';
import createLossPayee from './loss-payee';
import createJointlyInsuredParty from './jointly-insured-party';
import createExportContractAgent from './export-contract-agent';
import createPrivateMarket from './private-market';
import updateExportContractPrivateMarket from './export-contract-private-market';
import createCompanyDifferentTradingAddress from './company-different-trading-address';

/**
 * createNewApplicationRelationships
 * Create new application relationships
 * 1) Get all applications.
 * 2) Create new relationships.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} New application relationships
 */
const createNewApplicationRelationships = async (connection: Connection) => {
  const loggingMessage = 'Creating new relationships for all applications';

  console.info(`✅ ${loggingMessage}`);

  try {
    const applications = await getAllApplications(connection);

    const newRelationships = await Promise.all([
      createLossPayee(connection, applications),
      createJointlyInsuredParty(connection, applications),
      createExportContractAgent(connection, applications),
      createPrivateMarket(connection, applications),
      updateExportContractPrivateMarket(connection),
      createCompanyDifferentTradingAddress(connection, applications),
    ]);

    return newRelationships;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createNewApplicationRelationships;
