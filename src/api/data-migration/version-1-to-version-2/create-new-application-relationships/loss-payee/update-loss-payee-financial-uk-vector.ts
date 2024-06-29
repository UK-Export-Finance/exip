import { Connection } from 'mysql2/promise';
import getAllLossPayeeFinancialUk from '../../get-all-loss-payee-financial-uks';
import getAllLossPayeeFinancialUkVectors from '../../get-all-loss-payee-financial-uk-vectors';
import executeSqlQuery from '../../execute-sql-query';

/**
 * updateLossPayeeFinancialUkVector
 * Update "vector" columns in "loss payee - financial UK" entries
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} Loss payee - nominated loss payee - financial UK entries
 */
const updateLossPayeeFinancialUkVector = async (connection: Connection) => {
  const loggingMessage = 'Updating vector columns in LossPayeeFinancialUk entries';

  console.info(`✅ ${loggingMessage}`);

  try {
    const financialUks = await getAllLossPayeeFinancialUk(connection);
    const vectors = await getAllLossPayeeFinancialUkVectors(connection);

    const promises = financialUks.map(async (financialUk: object, index: number) => {
      const vector = vectors[index];

      const query = `
        UPDATE LossPayeeFinancialUk SET vector='${vector.id}' WHERE id='${vector.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating vector column in lossPayeeFinancialUk table for financialUk ${financialUk.id}`,
      });

      return updated;
    });

    return Promise.all(promises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateLossPayeeFinancialUkVector;
