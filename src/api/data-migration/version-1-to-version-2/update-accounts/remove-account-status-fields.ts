import { Connection } from 'mysql2/promise';
import removeIsVerifiedField from './remove-is-verified-field';
import removeIsBlockedField from './remove-is-blocked-field';

/**
 * removeAccountStatusFields
 * Remove status related fields from the account table.
 * These have been moved to the account status table, as per the new "No PDF" data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const removeAccountStatusFields = async (connection: Connection) => {
  const loggingMessage = 'Removing account status fields';

  console.info(`✅ ${loggingMessage}`);

  try {
    const tables = await Promise.all([
      removeIsVerifiedField(connection),
      removeIsBlockedField(connection),
    ]);

    return tables;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default removeAccountStatusFields;
