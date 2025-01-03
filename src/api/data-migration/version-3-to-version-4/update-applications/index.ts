import { Connection } from 'mysql2/promise';
import removeMigratedV2toV3Field from './remove-application-migrated-v2-to-v3-field';
import addMigratedV3toV4Field from './add-application-migrated-v3-to-v4-field';
import createDeclarationModernSlaveryTable from './create-declaration-modern-slavery-table';
import createDeclarationModernSlaveryVersionTable from './create-declaration-modern-slavery-version-table';
import updateDeclarations from './update-declarations';
import updateDeclarationModernSlaveries from './update-declaration-modern-slaveries';
import updateApplicationVersion from './update-application-version';
import updateApplicationMigrated from './update-application-migrated';

/**
 * updateApplications
 * Update applications from the V3 data model/structure, to the V4 data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateApplications = async (connection: Connection) => {
  const loggingMessage = 'Updating applications';

  console.info('✅ %s', loggingMessage);

  try {
    const promises = await Promise.all([
      removeMigratedV2toV3Field(connection),
      addMigratedV3toV4Field(connection),

      createDeclarationModernSlaveryTable(connection),
      createDeclarationModernSlaveryVersionTable(connection),

      updateDeclarations(connection),
      updateDeclarationModernSlaveries(connection),

      updateApplicationVersion(connection),
      updateApplicationMigrated(connection),
    ]);

    return promises;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateApplications;
