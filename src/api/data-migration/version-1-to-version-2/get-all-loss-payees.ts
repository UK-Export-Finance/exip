import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllLossPayees
 * Get all entries in the "NominatedLossPayee" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const getAllLossPayees = async (connection: Connection) => {
  const loggingMessage = 'Getting all nominated loss payees';

  const query = 'SELECT * FROM NominatedLossPayee';

  const [lossPayees] = await executeSqlQuery({ connection, query, loggingMessage });

  return lossPayees;
};

export default getAllLossPayees;
