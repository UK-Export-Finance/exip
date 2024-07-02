import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllBuyerRelationships
 * Get all entries in the "BuyerRelationship" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const getAllBuyerRelationships = async (connection: Connection) => {
  const loggingMessage = 'Getting all buyer relationships';

  const query = 'SELECT * FROM BuyerRelationship';

  const [relationships] = await executeSqlQuery({ connection, query, loggingMessage });

  return relationships;
};

export default getAllBuyerRelationships;
