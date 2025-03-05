import { Connection } from 'mysql2/promise';
import { APPLICATION } from '../../../constants';
import executeSqlQuery from '../../execute-sql-query';

const { STATUS } = APPLICATION;

/**
 * updateApplicationMigrated
 * Update IN_PROGRESS applications migratedV2toV3 fields to have a value of 1/true
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updateApplicationMigrated = (connection: Connection) => {
  const loggingMessage = `Updating migratedV2toV3 FIELD to true in the Application table`;

  const query = `
    UPDATE Application SET migratedV2toV3 = 1 WHERE status = '${STATUS.IN_PROGRESS}'
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default updateApplicationMigrated;
