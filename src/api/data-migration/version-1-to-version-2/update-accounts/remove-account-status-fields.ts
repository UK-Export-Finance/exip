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
  const loggingMessage = 'Removing FIELDS account statuses';

  console.info('✅ %s', loggingMessage);

  try {
    const queries = await Promise.all([removeIsVerifiedField(connection), removeIsBlockedField(connection)]);

    return queries;
  } catch (error) {
    console.error('🚨 error %s %O', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default removeAccountStatusFields;
