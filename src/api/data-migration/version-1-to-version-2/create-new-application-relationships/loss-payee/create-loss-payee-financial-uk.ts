import { Connection } from 'mysql2/promise';
import getAllLossPayees from '../../get-all-loss-payees';
import createCuid from '../../create-cuid';
import executeSqlQuery from '../../../execute-sql-query';

/**
 * lossPayeeFinancialUk
 * Create new "nominated loss payee - financial UK" entries
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} Loss payee - nominated loss payee - financial UK entries
 */
const lossPayeeFinancialUk = async (connection: Connection) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial UK';

  console.info('✅ %s', loggingMessage);

  try {
    const lossPayees = await getAllLossPayees(connection);

    const financialUkPromises = lossPayees.map(async (lossPayee: object) => {
      const theValues = `('${createCuid()}', '${lossPayee.id}')`;

      const query = `
        INSERT INTO LossPayeeFinancialUk (id, lossPayee) VALUES ${theValues};
      `;

      const created = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating LossPayeeFinancialUk entry for loss payee ${lossPayee.id}`,
      });

      return created;
    });

    return Promise.all(financialUkPromises);
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default lossPayeeFinancialUk;
