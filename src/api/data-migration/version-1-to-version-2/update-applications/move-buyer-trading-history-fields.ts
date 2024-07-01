import crypto from 'crypto';
import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';
import { ApplicationBuyerMvp } from '../../../types';

/**
 * moveBuyerTradingHistoryFields
 * Move MVP "buyer trading history" fields into the new "No PDF" data model/structure.
 * NOTE: The buyer data we receive is raw database data.
 * In the database, boolean fields are TINYINT/integer values.
 * The KeystoneJS context/GraphQL API expects these fields to be booleans.
 * Therefore, since the TINYINT values will be 0 or 1,
 * we can safely transform any TINYINT fields to have a boolean value.
 * KeystoneJS will then automatically handle saving in the database as a TINYINT
 * @param {Array<ApplicationBuyerMvp>} buyers: Buyers
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<ApplicationBuyer>>} Updated buyers
 */
const moveBuyerTradingHistoryFields = async (buyers: Array<ApplicationBuyerMvp>, connection: Connection): Promise<Array<object>> => {
  console.info('✅ Moving buyer trading history relationships for all buyers');

  const buyerTradingHistoryValues = buyers.map((buyer: ApplicationBuyerMvp) => {
    const { application, exporterHasTradedWithBuyer } = buyer;

    return `('${crypto.randomUUID()}', '${application}', ${exporterHasTradedWithBuyer})`;
  });

  const loggingMessage = 'Creating new buyer trading history relationships for all buyers';

  const query = `
      INSERT INTO BuyerTradingHistory (id, application, exporterHasTradedWithBuyer) VALUES ${buyerTradingHistoryValues};
    `;

  const updated = await executeSqlQuery({ connection, query, loggingMessage });

  return updated;
};

export default moveBuyerTradingHistoryFields;
