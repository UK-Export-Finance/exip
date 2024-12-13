import { Connection } from 'mysql2/promise';
import { APPLICATION } from '../../../constants';
import executeSqlQuery from '../../execute-sql-query';

const { STATUS } = APPLICATION;

/**
 * updateApplicationMigrated
 * Update IN_PROGRESS applications migratedV3toV4 fields to have a value of 1/true
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updateApplicationMigrated = (connection: Connection) => {
  const loggingMessage = `Updating migratedV3toV4 FIELD to true in the application table`;

  const query = `
    UPDATE Application SET migratedV3toV4 = 1 WHERE status = '${STATUS.IN_PROGRESS}'
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default updateApplicationMigrated;
