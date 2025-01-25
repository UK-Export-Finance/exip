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
  const loggingMessage = `Updating in progress application's migratedTo FIELD to 4 in the application table`;

  const query = `
    UPDATE Application SET migratedTo=4 WHERE status = '${STATUS.IN_PROGRESS}'
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

/**
 * updatedMigratedV2toV3ApplicationsMigratedTo
 * Update applications with a migratedV2toV3 value of 1, to have a migratedTo value of 3.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<object>} executeSqlQuery response
 */
const updatedMigratedV2toV3ApplicationsMigratedTo = (connection: Connection) => {
  const loggingMessage = `Updating application's with a migratedV2toV3 FIELD of 1 to have a migratedTo FIELD of 3 in the application table`;

  const query = `
    UPDATE Application SET migratedTo=3 WHERE migratedV2toV3=1
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

/**
 * updateApplicationMigratedFields
 * - Update IN_PROGRESS applications migratedTo fields to have a value of 4
 * - Update applications with a migratedV2toV3 value of 1, to have a migratedTo value of 3.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updateApplicationMigratedFields = async (connection: Connection) => {
  const loggingMessage = 'Updating application migrated fields';

  console.info('✅ %s', loggingMessage);

  try {
    const promises = await Promise.all([
      await updateInProgressApplicationsMigratedTo(connection),
      await updatedMigratedV2toV3ApplicationsMigratedTo(connection),
    ]);

    return promises;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateApplicationMigratedFields;
