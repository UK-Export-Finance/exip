import { Connection } from 'mysql2/promise';
import createCuid from '../create-cuid';
import executeSqlQuery from '../execute-sql-query';
import { Application } from '../../../types';

/**
 * createPrivateMarket
 * Create new "private market" entries with "export contract" relationships.
 * 1) Map over each application
 * 2) Create new database values with a CUID
 * 3) Add entries to the PrivateMarket table
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<ApplicationPrivateMarket>>} Private market entries
 */
const createPrivateMarket = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating privateMarket entries with exportContract relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const privateMarketPromises = applications.map(async (application: Application) => {
      const theValues = `('${createCuid()}')`;

      const query = `
        INSERT INTO PrivateMarket (id) VALUES ${theValues};
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating PrivateMarket entry for application ${application.id}`,
      });

      return updated;
    });

    return Promise.all(privateMarketPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createPrivateMarket;
