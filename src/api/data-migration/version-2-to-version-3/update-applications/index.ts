import { Connection } from 'mysql2/promise';
import addApplicationMigratedField from './add-application-migrated-field';
import updateApplicationVersion from './update-application-version';
import addPolicyRequestedCreditLimitField from './add-policy-requested-credit-limit-field';
import updateApplicationMigrated from './update-application-migrated';

/**
 * updateApplications
 * Update applications from the "No PDF" data model/structure, to the new "No PDF iterations" data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateApplications = async (connection: Connection) => {
  const loggingMessage = 'Updating applications';

  console.info('✅ %s', loggingMessage);

  try {
    const tables = await Promise.all([
      // TODO - TBC : remove migratedV1toV2 field.

      addApplicationMigratedField(connection),
      addPolicyRequestedCreditLimitField(connection),

      updateApplicationVersion(connection),
      updateApplicationMigrated(connection),
    ]);

    return tables;
  } catch (error) {
    console.error('🚨 error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateApplications;
