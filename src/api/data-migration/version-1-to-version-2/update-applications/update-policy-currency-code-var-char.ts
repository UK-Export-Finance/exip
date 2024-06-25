import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * updatePolicyCurrencyCodeVarChar
 * Update the policy table's "policy country code" field VarChar
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updatePolicyCurrencyCodeVarChar = async (connection: Connection) => {
  const loggingMessage = 'Updating FIELD policyCurrencyCode VARCHAR in the policy table';

  const query = `ALTER TABLE Policy MODIFY COLUMN policyCurrencyCode VARCHAR(3)`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default updatePolicyCurrencyCodeVarChar;
