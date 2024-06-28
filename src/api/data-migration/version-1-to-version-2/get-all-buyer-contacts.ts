import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';
import { ApplicationBuyerMvp } from '../../types';

/**
 * getAllBuyerContacts
 * Get all buyer contacts in the "BuyerContact" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const getAllBuyerContacts = async (connection: Connection) => {
  const loggingMessage = 'Getting all buyer contacts';

  const query = 'SELECT * FROM BuyerContact';

  const [allBuyers] = await executeSqlQuery({ connection, query, loggingMessage });

  const buyers = allBuyers as Array<ApplicationBuyerMvp>;

  return buyers;
};

export default getAllBuyerContacts;
