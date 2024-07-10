import { Connection } from 'mysql2/promise';
import getAllLossPayees from '../../get-all-loss-payees';
import executeSqlQuery from '../../execute-sql-query';

/**
 * createApplicationLossPayeeRelationship
 * Update all applications to have a loss payee relationship/ID.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<Application>>} Updated applications
 */
const createApplicationLossPayeeRelationship = async (connection: Connection) => {
  const loggingMessage = 'Updating applications to have loss payee relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const lossPayees = await getAllLossPayees(connection);

    const promises = lossPayees.map(async (lossPayee: object) => {
      const query = `
        UPDATE Application SET nominatedLossPayee='${lossPayee.id}' WHERE id='${lossPayee.application}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating nominatedLossPayee column in application table for lossPayee ${lossPayee.id}`,
      });

      return updated;
    });

    return Promise.all(promises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createApplicationLossPayeeRelationship;
