import { Connection } from 'mysql2/promise';
import addMigratedToField from './add-application-migrated-to-field';
import createDeclarationModernSlaveryTable from './create-declaration-modern-slavery-table';
import createDeclarationModernSlaveryVersionTable from './create-declaration-modern-slavery-version-table';
import updateDeclarations from './update-declarations';
import updateDeclarationModernSlaveries from './update-declaration-modern-slaveries';
import updateApplicationVersion from './update-application-version';
import updateApplicationMigratedFields from './update-application-migrated-fields';
import removeMigratedV2toV3Field from './remove-application-migrated-v2-to-v3-field';

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
      await createDeclarationModernSlaveryTable(connection),
      await createDeclarationModernSlaveryVersionTable(connection),

      await updateDeclarations(connection),
      await updateDeclarationModernSlaveries(connection),

      await addMigratedToField(connection),
      await updateApplicationMigratedFields(connection),
      await updateApplicationVersion(connection),
      await removeMigratedV2toV3Field(connection),
    ]);

    return promises;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateApplications;
