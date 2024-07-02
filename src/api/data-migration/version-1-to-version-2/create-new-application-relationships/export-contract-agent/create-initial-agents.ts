import { Connection } from 'mysql2/promise';
import createCuid from '../../create-cuid';
import executeSqlQuery from '../../execute-sql-query';
import { Application } from '../../../../types';

/**
 * createInitialAgents
 * Create new "export contract agent" entries
 * 1) Map over each application.
 * 2) Generate "agent" values (CUID)
 * 3) Insert the values into the ExportContractAgent table.
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<object>>} executeSqlQuery responses
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

      const created = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating ExportContractAgent entry for application ${application.id}`,
      });

      return created;
    });

    return Promise.all(initialAgentsPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createInitialAgents;
