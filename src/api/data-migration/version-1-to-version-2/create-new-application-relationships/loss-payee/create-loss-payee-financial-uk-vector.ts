import { Connection } from 'mysql2/promise';
import createCuid from '../../create-cuid';
import executeSqlQuery from '../../execute-sql-query';
import { Application } from '../../../../types';

/**
 * lossPayeeFinancialUkVector
 * Create new "nominated loss payee - financial UK vector" entries
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} Loss payee - nominated loss payee - financial UK vector entries
 */
const lossPayeeFinancialUkVector = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial UK vector';

  console.info(`✅ ${loggingMessage}`);

  try {
    const vectorPromises = applications.map(async (application: Application) => {
      const theValues = `('${createCuid()}')`;

      const query = `
        INSERT INTO LossPayeeFinancialUkVector (id) VALUES ${theValues};
      `;

      const created = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating LossPayeeFinancialUkVector entry for application ${application.id}`,
      });

      return created;
    });

    return Promise.all(vectorPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default lossPayeeFinancialUkVector;
