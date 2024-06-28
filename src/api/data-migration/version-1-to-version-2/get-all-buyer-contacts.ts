import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllBuyerContacts
 * Get all buyer contacts in the "BuyerContact" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const getAllBuyerContacts = async (connection: Connection) => {
  const loggingMessage = 'Getting all buyer contacts';

  const query = 'SELECT * FROM BuyerContact';

  const [contacts] = await executeSqlQuery({ connection, query, loggingMessage });

  return contacts;
};

export default getAllBuyerContacts;
