import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';
import { ApplicationDeclarationModernSlavery } from '../../types';

/**
 * getAllDeclarationModernSlaveries
 * Get all entries in the "DeclarationModernSlavery" table
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<ApplicationDeclarationModernSlavery>>}
 */
const getAllDeclarationModernSlaveries = async (connection: Connection) => {
  const loggingMessage = 'Getting all declaration modern slaveries';

  try {
    const query = 'SELECT * FROM DeclarationModernSlavery';

    const [declarations] = await executeSqlQuery({ connection, query, loggingMessage });

    return declarations as Array<ApplicationDeclarationModernSlavery>;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllDeclarationModernSlaveries;
