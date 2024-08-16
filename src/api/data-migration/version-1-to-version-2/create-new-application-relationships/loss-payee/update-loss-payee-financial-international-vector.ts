import { Connection } from 'mysql2/promise';
import getAllLossPayeeFinancialInternational from '../../get-all-loss-payee-financial-internationals';
import getAllLossPayeeFinancialInternationalVectors from '../../get-all-loss-payee-financial-international-vectors';
import executeSqlQuery from '../../execute-sql-query';

/**
 * updateLossPayeeFinancialInternationalVector
 * Update "vector" columns in "loss payee - financial International" entries
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} Loss payee - nominated loss payee - financial International entries
 */
const updateLossPayeeFinancialInternationalVector = async (connection: Connection) => {
  const loggingMessage = 'Updating vector columns in LossPayeeFinancialInternational entries';

  console.info('✅ %s', loggingMessage);

  try {
    const financialInternationals = await getAllLossPayeeFinancialInternational(connection);
    const vectors = await getAllLossPayeeFinancialInternationalVectors(connection);

    if (!financialInternationals.length) {
      console.info('🚨 No financial internationals available - unable to update vector columns');

      throw new Error('🚨 No financial internationals available - unable to update vector columns');
    }

    if (!vectors.length) {
      console.info('🚨 No financial international vectors available - unable to update vector columns');

      throw new Error('🚨 No financial international vectors available - unable to update vector columns');
    }

    const promises = financialInternationals.map(async (financialInternational: object, index: number) => {
      const vector = vectors[index];

      const query = `
        UPDATE LossPayeeFinancialInternational SET vector='${vector.id}' WHERE id='${financialInternational.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating vector column in lossPayeeFinancialInternational table for financialInternational ${financialInternational.id}`,
      });

      return updated;
    });

    return Promise.all(promises);
  } catch (error) {
    console.error('🚨 error %s %O', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateLossPayeeFinancialInternationalVector;
