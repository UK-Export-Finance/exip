import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';
import { AccountStatus } from '../../../types';

/**
 * updateAccountStatusColumns
 * Update "account status" columns for all existing accounts.
 * TODO update documentation
 * 1) Create an array of "account status" data - using isVerified and isBlocked from the original accounts data.
 * 2) Create new "account status" entries.
 * @param {Connection} connection: SQL database connection
 * @param {Array<AccountMvp>} accounts: MVP accounts
 * @returns {Promise<Array<AccountStatus>>} Account statuses
 */
const updateAccountStatusColumns = async (connection: Connection, statusRows: Array<AccountStatus>, accountStatuses: Array<AccountStatus>) => {
  console.info('✅ Updating account status columns for all accounts (account table)');

  const accountPromises = statusRows.map(async (account: AccountStatus, index: number) => {
    const status = accountStatuses[index];

    const loggingMessage = 'Updating status columns for all accounts';

    const query = `
      UPDATE Account SET status='${status.id}' WHERE id='${account.id}'
    `;

    const updated = await executeSqlQuery({ connection, query, loggingMessage });

    return updated;
  });

  return Promise.all(accountPromises);
};

export default updateAccountStatusColumns;
