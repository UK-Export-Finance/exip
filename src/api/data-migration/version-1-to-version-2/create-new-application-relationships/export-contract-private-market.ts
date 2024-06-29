import { Connection } from 'mysql2/promise';
import getAllExportContracts from '../get-all-export-contracts';
import getAllPrivateMarkets from '../get-all-private-markets';
import executeSqlQuery from '../execute-sql-query';

/**
 * updateExportContractPrivateMarket
 * Update "private market" columns in "export contract" entries
 * 1) Map over each "export contract".
 * 2) Generate "export contract" values (private market ID relationship)
 * 3) Update the values in the ExportContract table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateExportContractPrivateMarket = async (connection: Connection) => {
  const loggingMessage = 'Updating exportContract privateMarket columns';

  console.info(`✅ ${loggingMessage}`);

  try {
    const exportContracts = await getAllExportContracts(connection);
    const privateMarkets = await getAllPrivateMarkets(connection);

    const accountPromises = exportContracts.map(async (exportContract: object, index: number) => {
      const privateMarket = privateMarkets[index];

      const query = `
        UPDATE ExportContract SET privateMarket='${privateMarket.id}' WHERE id='${exportContract.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating privateMarket column in export contract table for exportContract ${exportContract.id}`,
      });

      return updated;
    });

    return Promise.all(accountPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateExportContractPrivateMarket;
