import { Connection } from 'mysql2/promise';
import { APPLICATION } from '../../../constants';
import executeSqlQuery from '../../execute-sql-query';

const { STATUS, LATEST_VERSION_NUMBER, VERSIONS } = APPLICATION;

/**
 * updateApplicationVersion
 * Update IN_PROGRESS applications from the "No PDF" version (2), to the new "No PDF iterations" version (3)
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updateApplicationVersion = (connection: Connection) => {
  const originalVersionNumber = VERSIONS[1].VERSION_NUMBER;

  const loggingMessage = `Updating IN_PROGRESS FIELD VERSION from ${originalVersionNumber} to ${LATEST_VERSION_NUMBER} in the Application table`;

  const query = `
    UPDATE Application SET version = '${LATEST_VERSION_NUMBER}' WHERE status = '${STATUS.IN_PROGRESS}'
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default updateApplicationVersion;
