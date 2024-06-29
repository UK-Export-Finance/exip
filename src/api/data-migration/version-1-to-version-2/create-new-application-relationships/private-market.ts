import crypto from 'crypto';
import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';
import { Application } from '../../../types';

/**
 * createPrivateMarket
 * Create new "private market" entries with "export contract" relationships.
 * TODO update documentation
 * TODO update documentation
 * 1) Create an array of export contract ID "connect" relationships.
 * 2) Create "private market" entries.
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<ApplicationPrivateMarket>>} Private market entries
 */
const createPrivateMarket = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating privateMarket entries with exportContract relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const privateMarketPromises = applications.map(async (application: Application) => {
      const loggingMessage = `Creating PrivateMarket entry for application ${application.id}`;

      const theValues = `('${crypto.randomUUID()}')`;

      const query = `
        INSERT INTO PrivateMarket (id) VALUES ${theValues};
      `;

      const updated = await executeSqlQuery({ connection, query, loggingMessage });

      return updated;
    });

    return Promise.all(privateMarketPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createPrivateMarket;
