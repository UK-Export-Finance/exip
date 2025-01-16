import { Connection } from 'mysql2/promise';
import { APPLICATION } from '../../../constants';
import executeSqlQuery from '../../execute-sql-query';

const { STATUS } = APPLICATION;

/**
 * updateInProgressApplicationsMigratedTo
 * Update IN_PROGRESS applications migratedTo fields to have a value of 4.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<object>} executeSqlQuery response
 */
const updateInProgressApplicationsMigratedTo = (connection: Connection) => {
  const loggingMessage = `Updating in progress application's migratedTo FIELD to 5 in the application table`;

  const query = `
    UPDATE Application SET migratedTo=5 WHERE status = '${STATUS.IN_PROGRESS}'
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default updateInProgressApplicationsMigratedTo;
