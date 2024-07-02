import { Connection } from 'mysql2/promise';
import addStatusField from './add-status-field';
import addStatusConstraint from './add-status-constraint';
import addStatusUniqueKey from './add-status-unique-key';
import addStatusKey from './add-status-key';

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
    const tables = await Promise.all([addStatusField(connection), addStatusUniqueKey(connection), addStatusKey(connection), addStatusConstraint(connection)]);

    return tables;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateAccounts;
