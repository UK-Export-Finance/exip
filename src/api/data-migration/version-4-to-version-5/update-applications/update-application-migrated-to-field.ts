import { Connection } from 'mysql2/promise';
import { APPLICATION } from '../../../constants';
import executeSqlQuery from '../../execute-sql-query';

const { LATEST_VERSION_NUMBER, STATUS } = APPLICATION;

/**
 * updateInProgressApplicationsMigratedTo
 * Update IN_PROGRESS applications migratedTo fields to have a value of 4.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<object>} executeSqlQuery response
 */
const updateInProgressApplicationsMigratedTo = (connection: Connection) => {
  const loggingMessage = `Updating in progress application's migratedTo FIELD to 5 in the Application table`;

  const query = `UPDATE Application SET migratedTo=${LATEST_VERSION_NUMBER} WHERE status = '${STATUS.IN_PROGRESS}'`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default updateInProgressApplicationsMigratedTo;
