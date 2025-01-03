import { Connection } from 'mysql2/promise';
import getAllDeclarationsNonSubmittedApplications from '../../../helpers/get-all-declarations-non-submitted-applications';
import getAllDeclarationModernSlaveries from '../../../helpers/get-all-declaration-modern-slaveries';
import executeSqlQuery from '../../../execute-sql-query';
import { ApplicationDeclaration } from '../../../../types';

/**
 * addDeclarationModernSlaveryColumnValues
 * For each declaration, add a new "modernSlavery" column value in the Declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationModernSlaveryColumnValues = async (connection: Connection) => {
  const loggingMessage = 'Adding modern slavery column values to the Declaration table';

  console.info('✅ %s', loggingMessage);

  try {
    const declarations = await getAllDeclarationsNonSubmittedApplications(connection);

    if (!declarations || !declarations.length) {
      console.info('ℹ️ No non-submitted application declarations available - no need to add modern slavery column values');

      return false;
    }

    const decalarationModernSlaveries = await getAllDeclarationModernSlaveries(connection);

    const promises = declarations.map(async (declaration: ApplicationDeclaration, index: number) => {
      const modernSlavery = decalarationModernSlaveries[index];

      const query = `UPDATE Declaration SET modernSlavery='${modernSlavery.id}' WHERE id='${declaration.id}'`;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating modernSlavery column in declaration table for declaration ${declaration.id}`,
      });

      return updated;
    });

    return Promise.all(promises);
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default addDeclarationModernSlaveryColumnValues;
