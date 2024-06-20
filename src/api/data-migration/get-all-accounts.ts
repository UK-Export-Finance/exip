import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';
import { AccountMvp } from '../types';

const getAllAccounts = async (connection: Connection) => {
  const loggingMessage = 'Getting all accounts';

  const query = 'SELECT * FROM Account';

  const [allAccounts] = await executeSqlQuery({ connection, query, loggingMessage });

  const accounts = allAccounts as Array<AccountMvp>;

  return accounts;
};

export default getAllAccounts;
