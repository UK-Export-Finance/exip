import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';
import { AccountStatus } from '../../../types';

/**
 * updateAccountStatusColumns
 * Update "account status" columns for all existing accounts.
 * 1) Map over each account status entry.
 * 2) Update the Account table to have a status ID/relationship.
 * @param {Connection} connection: SQL database connection
 * @param {Array<AccountStatus>} statusRows: Account status entries
 * @param {Array<AccountMvp>} accounts: MVP accounts
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updateAccountStatusColumns = async (connection: Connection, statusRows: Array<AccountStatus>, accountStatuses: Array<AccountStatus>) => {
  console.info('✅ Updating account status columns for all accounts (account table)');

  const accountPromises = statusRows.map(async (accountStatus: AccountStatus, index: number) => {
    const status = accountStatuses[index];

    const loggingMessage = `Updating status column in account table for account status ${accountStatus.id}`;

    const query = `
      UPDATE Account SET status='${status.id}' WHERE id='${accountStatus.id}'
    `;

    const updated = await executeSqlQuery({ connection, query, loggingMessage });

    return updated;
  });

  return Promise.all(accountPromises);
};

export default updateAccountStatusColumns;
