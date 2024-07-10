import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addEligibilityHasEndBuyerField
 * Add a hasEndBuyer field to the eligibility table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addEligibilityHasEndBuyerField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD hasEndBuyer to eligibility table';

  const query = `
    ALTER TABLE Eligibility ADD hasEndBuyer tinyint(1) NOT NULL DEFAULT '0'
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addEligibilityHasEndBuyerField;
