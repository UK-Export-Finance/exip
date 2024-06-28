import { format } from 'date-fns';
import { Connection } from 'mysql2/promise';
import getAllAccounts from '../get-all-accounts';
import executeSqlQuery from '../execute-sql-query';
import { AccountMvp } from '../../../types';

/**
 * createNewAccountStatusRelationships
 * Create new "account status" relationships for all existing accounts.
 * 1) Get all accounts
 * 2) Create an array of "account status" data - using isVerified and isBlocked from the original accounts data.
 * 3) Create new "account status" entries.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<AccountStatus>>} Account status entires
 */
const createNewAccountStatusRelationships = async (connection: Connection): Promise<boolean> => {
  const loggingMessage = 'Creating new status relationships for all accounts';

  console.info(`✅ ${loggingMessage}`);

  try {
    const accounts = await getAllAccounts(connection);

    const accountStatusData = accounts.map(
      (account: AccountMvp) => `('${account.id}', ${account.isBlocked}, ${account.isVerified}, '${format(account.updatedAt, 'yyyy-MM-dd HH:mm')}')`,
    );

    const query = `
      INSERT INTO AccountStatus (id, isBlocked, isVerified, updatedAt) VALUES ${accountStatusData};
    `;

    await executeSqlQuery({ connection, query, loggingMessage });

    return true;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createNewAccountStatusRelationships;
