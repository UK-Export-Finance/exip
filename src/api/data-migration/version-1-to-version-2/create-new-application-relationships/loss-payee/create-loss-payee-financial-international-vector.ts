import { Connection } from 'mysql2/promise';
import createCuid from '../../create-cuid';
import executeSqlQuery from '../../execute-sql-query';
import { Application } from '../../../../types';

/**
 * lossPayeeFinancialInternationalVector
 * Create new "nominated loss payee - financial international vector" entries
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} Loss payee - nominated loss payee - financial international vector entries
 */
const lossPayeeFinancialInternationalVector = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial international vector';

  console.info(`✅ ${loggingMessage}`);

  try {
    const vectorPromises = applications.map(async (application: Application) => {
      const theValues = `('${createCuid()}')`;

      const query = `
        INSERT INTO LossPayeeFinancialInternationalVector (id) VALUES ${theValues};
      `;

      const created = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating LossPayeeFinancialInternationalVector entry for application ${application.id}`,
      });

      return created;
    });

    return Promise.all(vectorPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default lossPayeeFinancialInternationalVector;
