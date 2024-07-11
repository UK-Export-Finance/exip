import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * updateBuyerAddressVarChar
 * Update the buyer table's "address" field VarChar
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updateBuyerAddressVarChar = async (connection: Connection) => {
  const loggingMessage = 'Updating FIELD address VARCHAR in the buyer table';

  const query = `ALTER TABLE Buyer MODIFY COLUMN address VARCHAR(500)`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default updateBuyerAddressVarChar;
