import { format } from 'date-fns';
import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';
import { AccountMvp } from '../../../types';

/**
 * createAccountStatusRows
 * Create new "account status" rows for all existing accounts.
 * TODO update documentation
 * 1) Create an array of "account status" data - using isVerified and isBlocked from the original accounts data.
 * 2) Create new "account status" entries.
 * @param {Connection} connection: SQL database connection
 * @param {Array<AccountMvp>} accounts: MVP accounts
 * @returns {Promise<Array<AccountStatus>>} Account statuses
 */
const createAccountStatusRows = async (connection: Connection, accounts: Array<AccountMvp>) => {
  console.info('✅ Creating account status rows for all accounts (account status table)');

  const accountStatusData = accounts.map(
    (account: AccountMvp) => `('${account.id}', ${account.isBlocked}, ${account.isVerified}, '${format(account.updatedAt, 'yyyy-MM-dd HH:mm')}')`,
  );

  const loggingMessage = 'Creating new status rows for all accounts';

  const query = `
    INSERT INTO AccountStatus (id, isBlocked, isVerified, updatedAt) VALUES ${accountStatusData};
  `;

  await executeSqlQuery({ connection, query, loggingMessage });

  return accounts;
};

export default createAccountStatusRows;
