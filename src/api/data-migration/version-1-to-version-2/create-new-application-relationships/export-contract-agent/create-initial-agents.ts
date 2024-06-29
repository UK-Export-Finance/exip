import { Connection } from 'mysql2/promise';
import createCuid from '../../create-cuid';
import executeSqlQuery from '../../execute-sql-query';
import { Application } from '../../../../types';

/**
 * createInitialAgents
 * Create new "export contract agent" entries
 * TODO: update documentation
 * TODO: update documentation
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<ApplicationExportContractAgent>>} Export contract agent entries
 */
const createInitialAgents = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating initial exportContractAgents';

  console.info(`✅ ${loggingMessage}`);

  try {
    const initialAgentsPromises = applications.map(async (application: Application) => {
      const theValues = `('${createCuid()}')`;

      const query = `
        INSERT INTO ExportContractAgent (id) VALUES ${theValues};
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating ExportContractAgent entry for application ${application.id}`,
      });

      return updated;
    });

    return Promise.all(initialAgentsPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createInitialAgents;
