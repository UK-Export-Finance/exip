import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * addBrokerFields
 * Update the broker table to include 2x new fields:
 * 1) buildingNumberOrName
 * 2) isBasedInUk
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addBrokerFields = async (connection: Connection) => {
  const loggingMessage = 'Adding buildingNumberOrName and isBasedInUk fields to the Broker table';

  console.info('✅ %s', loggingMessage);

  try {
    const promises = await Promise.all([
      executeSqlQuery({
        connection,
        query: `ALTER TABLE Broker ADD buildingNumberOrName varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''`,
        loggingMessage: 'Adding FIELD buildingNumberOrName to Broker table',
      }),
      executeSqlQuery({
        connection,
        query: `ALTER TABLE Broker ADD isBasedInUk tinyint(1) DEFAULT NULL`,
        loggingMessage: 'Adding FIELD isBasedInUk to Broker table',
      }),
    ]);

    return promises;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default addBrokerFields;
