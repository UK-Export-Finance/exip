import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';
import { AccountMvp } from '../../types';

/**
 * getAllAccountStatuses
 * Get all entries in the "AccountStatus" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const getAllAccountStatuses = async (connection: Connection) => {
  const loggingMessage = 'Getting all account statuses';

  const query = 'SELECT * FROM AccountStatus';

  const [allAccounts] = await executeSqlQuery({ connection, query, loggingMessage });

  const accounts = allAccounts as Array<AccountMvp>;

  return accounts;
};

export default getAllAccountStatuses;
