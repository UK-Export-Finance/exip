import { Connection } from 'mysql2/promise';
import createCuid from '../../create-cuid';
import executeSqlQuery from '../../execute-sql-query';
import { Application } from '../../../../types';

/**
 * createAgentServices
 * Create new "export contract agent services" entries
 * TODO: update documentation
 * TODO: update documentation
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<ApplicationExportContractAgent>>} Export contract agent entries
 */
const createAgentServices = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating exportContract agent services';

  console.info(`✅ ${loggingMessage}`);

  try {
    const servicesPromises = applications.map(async (application: Application) => {
      const theValues = `('${createCuid()}')`;

      const query = `
        INSERT INTO ExportContractAgentService (id) VALUES ${theValues};
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating ExportContractAgentService entry for application ${application.id}`,
      });

      return updated;
    });

    return Promise.all(servicesPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createAgentServices;
