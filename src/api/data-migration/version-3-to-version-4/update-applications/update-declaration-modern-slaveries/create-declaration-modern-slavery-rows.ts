import { Connection } from 'mysql2/promise';
import getAllDeclarationsNonSubmittedApplications from '../../../helpers/get-all-declarations-non-submitted-applications';
import createCuid from '../../../helpers/create-cuid';
import executeSqlQuery from '../../../execute-sql-query';
import { ApplicationDeclaration } from '../../../../types';

/**
 * createDeclarationModernSlaveryRows
 * For each declaration, create a new row in the DeclarationModernSlavery table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createDeclarationModernSlaveryRows = async (connection: Connection) => {
  const loggingMessage = 'Creating modern slavery entries in the DeclarationModernSlavery table';

  console.info('✅ %s', loggingMessage);

  try {
    const declarations = await getAllDeclarationsNonSubmittedApplications(connection);

    if (!declarations || !declarations.length) {
      console.info('ℹ️ No non-submitted application declarations available - no need to create declaration modern slavery entries');

      return false;
    }

    const promises = declarations.map(async (declaration: ApplicationDeclaration) => {
      const { id: declarationId } = declaration;

      const theValues = `('${createCuid()}')`;

      const query = `
        INSERT INTO DeclarationModernSlavery (id) VALUES ${theValues};
      `;

      const created = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating DeclarationModernSlavery entry for declaration ${declarationId}`,
      });

      return created;
    });

    return Promise.all(promises);
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default createDeclarationModernSlaveryRows;
