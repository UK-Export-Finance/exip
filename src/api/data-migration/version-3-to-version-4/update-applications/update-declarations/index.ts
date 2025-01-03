import { Connection } from 'mysql2/promise';
import addDeclarationFieldModernSlavery from './add-declaration-field-modern-slavery';
import addDeclarationUniqueKeyModernSlavery from './add-declaration-unique-key-modern-slavery';
import addDeclarationConstraintModernSlavery from './add-declaration-constraint-modern-slavery';

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
      await addDeclarationFieldModernSlavery(connection),
      await addDeclarationUniqueKeyModernSlavery(connection),
      await addDeclarationConstraintModernSlavery(connection),
    ]);

    return promises;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateDeclarations;
