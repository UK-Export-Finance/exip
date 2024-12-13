import { Connection } from 'mysql2/promise';
import createDeclarationModernSlaveryRows from './create-declaration-modern-slavery-rows';
import createDeclarationModernSlaveryVersionRows from './create-declaration-modern-slavery-version-rows';
import addDeclarationModernSlaveryField from './add-declaration-modern-slavery-field';
import addDeclarationModernSlaveryKeys from './add-declaration-modern-slavery-keys';
import addDeclarationModernSlaveryConstraints from './add-declaration-modern-slavery-constraints';
import addDeclarationModernSlaveryVersionKey from './add-declaration-modern-slavery-version-key';
import addDeclarationModernSlaveryVersionConstraint from './add-declaration-modern-slavery-version-constraint';

/**
 * updateDeclarations
 * Update declarations from the V3 data model/structure, to the V4 data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateDeclarations = async (connection: Connection) => {
  const loggingMessage = 'Updating declarations';

  console.info('✅ %s', loggingMessage);

  try {
    const promises = await Promise.all([
      await createDeclarationModernSlaveryRows(connection),

      await createDeclarationModernSlaveryVersionRows(connection),

      await addDeclarationModernSlaveryField(connection),

      await addDeclarationModernSlaveryKeys(connection),
      await addDeclarationModernSlaveryConstraints(connection),

      await addDeclarationModernSlaveryVersionKey(connection),
      await addDeclarationModernSlaveryVersionConstraint(connection),
    ]);

    return promises;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateDeclarations;
