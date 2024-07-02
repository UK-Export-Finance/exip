import { Connection } from 'mysql2/promise';
import createCuid from '../create-cuid';
import executeSqlQuery from '../execute-sql-query';
import { ApplicationBuyerMvp } from '../../../types';

/**
 * moveBuyerRelationshipFields
 * Move MVP "buyer relationships" fields into the new "No PDF" data model/structure.
 * @param {Array<ApplicationBuyerMvp>} buyers: Buyers
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<ApplicationBuyer>>} Updated buyers
 */
const moveBuyerRelationshipFields = async (buyers: Array<ApplicationBuyerMvp>, connection: Connection): Promise<Array<object>> => {
  console.info('✅ Moving buyer relationship for all buyers');

  const buyerRelationshipValues = buyers.map((buyer: ApplicationBuyerMvp) => {
    const { application, exporterIsConnectedWithBuyer } = buyer;

    return `('${createCuid()}', '${application}', ${exporterIsConnectedWithBuyer})`;
  });

  const loggingMessage = 'Creating new buyer relationship for all buyers';

  const query = `
    INSERT INTO BuyerRelationship (id, application, exporterIsConnectedWithBuyer) VALUES ${buyerRelationshipValues};
  `;

  const updated = await executeSqlQuery({ connection, query, loggingMessage });

  return updated;
};

export default moveBuyerRelationshipFields;
