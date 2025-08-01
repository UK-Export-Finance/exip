import { Connection } from 'mysql2/promise';
import createCuid from '../../helpers/create-cuid';
import executeSqlQuery from '../../execute-sql-query';
import { ApplicationBuyerMvp } from '../../../types';

/**
 * moveBuyerContactFields
 * Move MVP "buyers" fields into the new "No PDF" data model/structure.
 * @param {Array<ApplicationBuyerMvp>} buyers: Buyers
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<boolean>}
 */
const moveBuyerContactFields = async (buyers: Array<ApplicationBuyerMvp>, connection: Connection): Promise<Array<object>> => {
  console.info('✅ Moving buyer contact relationships for all buyers');

  const buyerContactValues = buyers.map((buyer: ApplicationBuyerMvp) => {
    const { application, canContactBuyer, contactEmail, contactFirstName, contactLastName, contactPosition } = buyer;

    return `('${createCuid()}', '${application}', ${canContactBuyer}, '${contactEmail}', '${contactFirstName}', '${contactLastName}', '${contactPosition}')`;
  });

  const loggingMessage = 'Creating new buyer contact relationships for all buyers';

  const query = `
    INSERT INTO BuyerContact (id, application, canContactBuyer, contactEmail, contactFirstName, contactLastName, contactPosition) VALUES ${buyerContactValues};
  `;

  const updated = executeSqlQuery({ connection, query, loggingMessage });

  return updated;
};

export default moveBuyerContactFields;
