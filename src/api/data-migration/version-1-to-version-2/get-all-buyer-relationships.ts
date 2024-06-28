import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';
import { ApplicationBuyerMvp } from '../../types';

/**
 * getAllBuyerRelationships
 * Get all buyer relationships in the "BuyerRelationship" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const getAllBuyerRelationships = async (connection: Connection) => {
  const loggingMessage = 'Getting all buyer relationships';

  const query = 'SELECT * FROM BuyerRelationship';

  const [allBuyers] = await executeSqlQuery({ connection, query, loggingMessage });

  const buyers = allBuyers as Array<ApplicationBuyerMvp>;

  return buyers;
};

export default getAllBuyerRelationships;
