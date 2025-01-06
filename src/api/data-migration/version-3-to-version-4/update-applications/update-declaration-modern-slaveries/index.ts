import { Connection } from 'mysql2/promise';
import createDeclarationModernSlaveryRows from './create-declaration-modern-slavery-rows';
import createDeclarationModernSlaveryVersionRows from './create-declaration-modern-slavery-version-rows';
import addDeclarationModernSlaveryKey from './add-declaration-modern-slavery-key';
import addDeclarationModernSlaveryConstraint from './add-declaration-modern-slavery-constraint';
import addDeclarationModernSlaveryVersionKey from './add-declaration-modern-slavery-version-key';
import addDeclarationModernSlaveryVersionConstraint from './add-declaration-modern-slavery-version-constraint';
import addDeclarationModernSlaveryColumnValues from './add-declaration-modern-slavery-column-values';

/**
 * updateDeclarationModernSlaveries
 * Update declaration modern slaveries, for the V4 data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateDeclarationModernSlaveries = async (connection: Connection) => {
  const loggingMessage = 'Updating declaration modern slaveries';

  console.info('✅ %s', loggingMessage);

  try {
    const promises = await Promise.all([
      await createDeclarationModernSlaveryRows(connection),
      await createDeclarationModernSlaveryVersionRows(connection),

      await addDeclarationModernSlaveryKey(connection),
      await addDeclarationModernSlaveryConstraint(connection),

      await addDeclarationModernSlaveryVersionKey(connection),
      await addDeclarationModernSlaveryVersionConstraint(connection),

      await addDeclarationModernSlaveryColumnValues(connection),
    ]);

    return promises;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateDeclarationModernSlaveries;
