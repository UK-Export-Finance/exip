import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * removeConfirmationAndAcknowledgementTable
 * Remove the "confirmation and acknowledgement" declaration table
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const removeConfirmationAndAcknowledgementTable = (connection: Connection) => {
  const loggingMessage = 'Removing TABLE DeclarationConfirmationAndAcknowledgement';

  const query = `DROP TABLE DeclarationConfirmationAndAcknowledgement`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default removeConfirmationAndAcknowledgementTable;
