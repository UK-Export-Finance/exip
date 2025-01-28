import { Connection } from 'mysql2/promise';
import createCuid from '../../../helpers/create-cuid';
import executeSqlQuery from '../../../execute-sql-query';
import { Application } from '../../../../types';

/**
 * createAgentServiceCharges
 * Create new "export contract agent service charges" entries
 * 1) Map over each application.
 * 2) Generate "agent service charge" values (CUID)
 * 3) Insert the values into the ExportContractAgentServiceCharge table.
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const createAgentServiceCharges = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating exportContract agent service charges';

  console.info('✅ %s', loggingMessage);

  try {
    const servicesPromises = applications.map(async (application: Application) => {
      const theValues = `('${createCuid()}')`;

      const query = `
        INSERT INTO ExportContractAgentServiceCharge (id) VALUES ${theValues};
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating ExportContractAgentServiceCharge entry for application ${application.id}`,
      });

      return updated;
    });

    return Promise.all(servicesPromises);
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default createAgentServiceCharges;
