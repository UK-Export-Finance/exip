import { Connection } from 'mysql2/promise';
import addBrokerFields from './add-broker-fields';
import updateApplicationVersion from './update-application-version';
import updateInProgressApplicationsMigratedTo from './update-application-migrated-to-field';

/**
 * updateApplications
 * Update applications from the v4 data model/structure, to the V5 data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateApplications = async (connection: Connection) => {
  const loggingMessage = 'Updating applications';

  console.info('✅ %s', loggingMessage);

  try {
    const promises = await Promise.all([addBrokerFields(connection), updateApplicationVersion(connection), updateInProgressApplicationsMigratedTo(connection)]);

    return promises;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateApplications;
