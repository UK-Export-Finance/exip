import { Connection } from 'mysql2/promise';
import getAllDeclarationsNonSubmittedApplications from '../../helpers/get-all-declarations-non-submitted-applications';
import getAllDeclarationVersions from '../get-all-declaration-versions';
import executeSqlQuery from '../../execute-sql-query';

/**
 * updateDeclarationVersionField
 * Update "version" columns in "declaration" entries
 * 1) Map over each "declaration".
 * 2) Generate "version" values (version ID relationship)
 * 3) Update the values in the Declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<ApplicationPrivateMarket>>} Updated declarations
 */
const updateDeclarationVersionField = async (connection: Connection) => {
  const loggingMessage = 'Creating declarationVersion entries with declaration relationships';

  console.info('✅ %s', loggingMessage);

  try {
    const declarations = await getAllDeclarationsNonSubmittedApplications(connection);

    if (!declarations || !declarations.length) {
      console.info('ℹ️ No non-submitted application declarations available - no need to create related declaration modern slavery version entries');

      return false;
    }

    const declarationVersions = await getAllDeclarationVersions(connection);

    const declarationPromises = declarations.map(async (declaration: object, index: number) => {
      const version = declarationVersions[index];

      const query = `
        UPDATE Declaration SET version='${version.id}' WHERE id='${declaration.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating version column in declaration table for declaration ${declaration.id}`,
      });

      return updated;
    });

    return Promise.all(declarationPromises);
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateDeclarationVersionField;
