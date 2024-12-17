import { Connection } from 'mysql2/promise';
import getAllDeclarations from '../../../helpers/get-all-declarations';
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
  const declarations = await getAllDeclarations(connection);

  const declarationModernSlaveryPromises = declarations.map(async (declaration: ApplicationDeclaration) => {
    const { id: declarationId } = declaration;

    const theValues = `('${createCuid()}', '${declarationId}')`;

    const query = await executeSqlQuery({
      connection,
      query: `INSERT INTO DeclarationModernSlavery (id, declaration) VALUES ${theValues}`,
      loggingMessage: `Creating DeclarationModernSlavery entry for declaration ${declarationId}`,
    });

    return query;
  });

  return Promise.all(declarationModernSlaveryPromises);
};

export default createDeclarationModernSlaveryRows;
