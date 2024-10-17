import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * addPolicyRequestedCreditLimitField
 * Add the new requestedCreditLimit field to the policy table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addPolicyRequestedCreditLimitField = (connection: Connection) =>
  executeSqlQuery({
    connection,
    query: `ALTER TABLE Policy ADD requestedCreditLimit tinyint(1) DEFAULT NULL`,
    loggingMessage: 'Adding FIELD requestedCreditLimit to policy table',
  });

export default addPolicyRequestedCreditLimitField;
