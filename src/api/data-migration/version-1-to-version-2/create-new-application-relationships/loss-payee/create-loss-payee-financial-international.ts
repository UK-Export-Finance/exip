import { Connection } from 'mysql2/promise';
import getAllLossPayees from '../../get-all-loss-payees';
import createCuid from '../../create-cuid';
import executeSqlQuery from '../../execute-sql-query';

/**
 * lossPayeeFinancialInternational
 * Create new "nominated loss payee - financial international" entries
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} Loss payee - nominated loss payee - financial international entries
 */
const lossPayeeFinancialInternational = async (connection: Connection) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial international';

  console.info(`✅ ${loggingMessage}`);

  try {
    const lossPayees = await getAllLossPayees(connection);

    const financialInternationalPromises = lossPayees.map(async (lossPayee: object) => {
      const theValues = `('${createCuid()}', '${lossPayee.id}')`;

      const query = `
        INSERT INTO LossPayeeFinancialInternational (id, lossPayee) VALUES ${theValues};
      `;

      const created = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating LossPayeeFinancialInternational entry for loss payee ${lossPayee.id}`,
      });

      return created;
    });

    return Promise.all(financialInternationalPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default lossPayeeFinancialInternational;
