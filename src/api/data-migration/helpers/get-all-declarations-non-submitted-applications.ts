import { Connection } from 'mysql2/promise';
import getAllNonSubmittedApplications from './get-all-non-submitted-applications';
import executeSqlQuery from '../execute-sql-query';
import { Application, ApplicationDeclaration } from '../../types';

/**
 * getAllDeclarationsNonSubmittedApplications
 * Get all entries in the "Declaration" table,
 * that belong to applications that have NOT been submitted.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<ApplicationDeclaration>>}
 */
const getAllDeclarationsNonSubmittedApplications = async (connection: Connection) => {
  const loggingMessage = 'Getting all declarations for non-submitted applications';

  try {
    const nonSubmittedApplications = await getAllNonSubmittedApplications(connection);

    if (!nonSubmittedApplications.length) {
      console.info('ℹ️ No non-submitted applications available - no need to create get all related declaration entries');

      return false;
    }

    const applicationIds: Array<string> = nonSubmittedApplications.map((application: Application) => application.id);

    const declarations = await Promise.all(
      applicationIds.map(async (applicationId: string) => {
        const query = `SELECT * FROM Declaration WHERE application='${applicationId}'`;

        const [declaration] = await executeSqlQuery({ connection, query, loggingMessage });

        return declaration;
      }),
    );

    const flattened = declarations.flat() as Array<ApplicationDeclaration>;

    return flattened;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllDeclarationsNonSubmittedApplications;
