import crypto from 'crypto';
import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';
import { Application } from '../../../types';

/**
 * createCompanyDifferentTradingAddress
 * Create new "company different trading address" entries with company relationships.
 * TODO update documentation
 * TODO update documentation
 * 1) Create an array of "company different trading address" data - using the application's companyId.
 * 2) Create new "company different trading address" entries.
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<ApplicationCompanyDifferentTradingAddress>>} Company different trading address entries
 */
const createCompanyDifferentTradingAddress = async (
  connection: Connection,
  applications: Array<Application>,
) => {
  const loggingMessage = 'Creating companyDifferentTradingAddresses entries with company relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const jointlyInsuredPartyPromises = applications.map(async (application: Application) => {
      const loggingMessage = `Creating CompanyDifferentTradingAddress entry for application ${application.id}`;

      const theValues = `('${crypto.randomUUID()}', '${application.company}')`;

      const query = `
        INSERT INTO CompanyDifferentTradingAddress (id, company) VALUES ${theValues};
      `;

      const updated = await executeSqlQuery({ connection, query, loggingMessage });

      return updated;
    });

    return Promise.all(jointlyInsuredPartyPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createCompanyDifferentTradingAddress;
