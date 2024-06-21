import { Connection } from 'mysql2/promise';
import addStatusField from './add-status-field';
import addStatusConstraint from './add-status-constraint';
import removeIsVerifiedField from './remove-is-verified-field';
import removeIsBlockedField from './remove-is-blocked-field';

/**
 * updateAccounts
 * Update accounts from the MVP data model/structure, to the new "No PDF" data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateAccounts = async (connection: Connection) => {
  const loggingMessage = 'Updating accounts';

  console.info(`✅ ${loggingMessage}`);

  try {
    const tables = await Promise.all([
      addStatusField(connection),
      addStatusConstraint(connection),
      removeIsVerifiedField(connection),
      removeIsBlockedField(connection),
    ]);

    return tables;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateAccounts;
