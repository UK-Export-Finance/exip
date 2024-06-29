import { Connection } from 'mysql2/promise';
import getAllLossPayeeFinancialInternational from '../../get-all-loss-payee-financial-internationals';
import getAllLossPayeeFinancialInternationalVectors from '../../get-all-loss-payee-financial-international-vectors';
import executeSqlQuery from '../../execute-sql-query';

/**
 * updateLossPayeeFinancialUkVector
 * Update "vector" columns in "loss payee - financial International" entries
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} Loss payee - nominated loss payee - financial International entries
 */
const updateLossPayeeFinancialUkVector = async (connection: Connection) => {
  const loggingMessage = 'Updating vector columns in LossPayeeFinancialInternational entries';

  console.info(`✅ ${loggingMessage}`);

  try {
    const financialInternationals = await getAllLossPayeeFinancialInternational(connection);
    const vectors = await getAllLossPayeeFinancialInternationalVectors(connection);

    const promises = financialInternationals.map(async (financialInternational: object, index: number) => {
      const vector = vectors[index];

      const query = `
        UPDATE LossPayeeFinancialInternational SET vector='${vector.id}' WHERE id='${vector.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating vector column in lossPayeeFinancialInternational table for financialInternational ${financialInternational.id}`,
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
