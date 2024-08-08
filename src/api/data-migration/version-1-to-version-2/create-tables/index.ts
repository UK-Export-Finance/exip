import { Connection } from 'mysql2/promise';
import createAccountStatusTable from './create-account-status-table';
import createDeclarationVersionTable from './create-declaration-version-table';
import createJointlyInsuredPartyTable from './create-jointly-insured-party-table';
import createExportContractAgentServiceChargeTable from './create-export-contract-agent-service-charge-table';
import createExportContractAgentServiceTable from './create-export-contract-agent-service-table';
import createExportContractAgentTable from './create-export-contract-agent-table';
import createExportContractAwardMethodTable from './create-export-contract-award-method-table';
import createPrivateMarketTable from './create-private-market-table';
import createCompanyDifferentTradingAddressTable from './create-company-different-trading-address-table';
import createBuyerContactTable from './create-buyer-contact-table';
import createBuyerRelationshipTable from './create-buyer-relationship-table';
import createBuyerTradingHistoryTable from './create-buyer-trading-history-table';
import createNominatedLossPayeeTable from './create-nominated-loss-payee-table';
import createLossPayeeFinancialInternationalVectorTable from './create-nominated-loss-payee-financial-international-vector-table';
import createLossPayeeFinancialInternationalTable from './create-nominated-loss-payee-financial-international-table';
import createLossPayeeFinancialUkVectorTable from './create-nominated-loss-payee-financial-uk-vector-table';
import createLossPayeeFinancialUkTable from './create-nominated-loss-payee-financial-uk-table';

/**
 * createTables
 * Create new tables for the new "No PDF" data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const createTables = async (connection: Connection) => {
  const loggingMessage = 'Creating new tables';

  try {
    console.info('✅ %s', loggingMessage);

    const tables = await Promise.all([
      createAccountStatusTable(connection),
      createDeclarationVersionTable(connection),
      createJointlyInsuredPartyTable(connection),

      createExportContractAgentServiceChargeTable(connection),
      createExportContractAgentServiceTable(connection),
      createExportContractAgentTable(connection),
      createExportContractAwardMethodTable(connection),

      createPrivateMarketTable(connection),
      createCompanyDifferentTradingAddressTable(connection),

      createBuyerContactTable(connection),
      createBuyerRelationshipTable(connection),
      createBuyerTradingHistoryTable(connection),

      createNominatedLossPayeeTable(connection),
      createLossPayeeFinancialInternationalVectorTable(connection),
      createLossPayeeFinancialInternationalTable(connection),
      createLossPayeeFinancialUkVectorTable(connection),
      createLossPayeeFinancialUkTable(connection),
    ]);

    return tables;
  } catch (error) {
    console.error('🚨 error %s %O', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default createTables;
