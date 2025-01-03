import { Connection } from 'mysql2/promise';
import getAllDeclarations from '../../../helpers/get-all-declarations';
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
  const decalarations = await getAllDeclarations(connection);
  const decalarationModernSlaveries = await getAllDeclarationModernSlaveries(connection);

  const promises = decalarations.map(async (declaration: ApplicationDeclaration, index: number) => {
    const modernSlavery = decalarationModernSlaveries[index];

    const query = `
        UPDATE Declaration SET modernSlavery='${modernSlavery.id}' WHERE id='${declaration.id}'
      `;

    const updated = await executeSqlQuery({
      connection,
      query,
      loggingMessage: `Updating modernSlavery column in declaration table for declaration ${declaration.id}`,
    });

    return updated;
  });

  return Promise.all(promises);
};

export default addDeclarationModernSlaveryColumnValues;
