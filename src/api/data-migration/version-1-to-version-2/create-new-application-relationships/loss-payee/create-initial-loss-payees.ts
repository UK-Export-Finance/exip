import { Connection } from 'mysql2/promise';
import createCuid from '../../../helpers/create-cuid';
import executeSqlQuery from '../../../execute-sql-query';
import { Application } from '../../../../types';

/**
 * createInitialLossPayees
 * Create new "nominated loss payee" entries
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<ApplicationExportContractAgent>>} Loss payee entries
 */
const createInitialLossPayees = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating initial lossPayees';

  console.info('✅ %s', loggingMessage);

  try {
    const initialAgentsPromises = applications.map(async (application: Application) => {
      const theValues = `('${createCuid()}', '${application.id}')`;

      const query = `
        INSERT INTO NominatedLossPayee (id, application) VALUES ${theValues};
      `;

      const created = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating LossPayee entry for application ${application.id}`,
      });

      return created;
    });

    return Promise.all(initialAgentsPromises);
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default createInitialLossPayees;
