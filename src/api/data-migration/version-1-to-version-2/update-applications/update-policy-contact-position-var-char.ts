import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * updatePolicyContactPositionVarChar
 * Update the policy contact table's "position" field VarChar
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updatePolicyContactPositionVarChar = async (connection: Connection) => {
  const loggingMessage = 'Updating FIELD position VARCHAR in the policyContact table';

  const query = `ALTER TABLE PolicyContact MODIFY COLUMN position VARCHAR(50)`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default updatePolicyContactPositionVarChar;
