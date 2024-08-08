import { Connection } from 'mysql2/promise';
import removeAntiBriberyTable from './anti-bribery';
import removeConfidentialityTable from './confidentiality';
import removeConfirmationAndAcknowledgementTable from './confirmation-and-acknowledgement';
import removeHowDataWillBeUsedTable from './how-data-will-be-used';

/**
 * removeDeclarationContentTables
 * Remove declaration content tables.
 * All declaration content has been moved from the API into content strings.
 * The following tables will be removed:
 * - DeclarationAntiBribery
 * - DeclarationConfidentiality
 * - DeclarationConfirmationAndAcknowledgement
 * - DeclarationHowDataWillBeUsed
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const removeDeclarationContentTables = async (connection: Connection) => {
  const loggingMessage = 'Removing TABLES declaration content';

  console.info(`✅ ${loggingMessage}`);

  try {
    const tables = await Promise.all([
      removeAntiBriberyTable(connection),
      removeConfidentialityTable(connection),
      removeConfirmationAndAcknowledgementTable(connection),
      removeHowDataWillBeUsedTable(connection),
    ]);

    return tables;
  } catch (error) {
    console.error(`🚨 error ${loggingMessage} %O`, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default removeDeclarationContentTables;
