import { Connection } from 'mysql2/promise';
import createCuid from '../create-cuid';
import executeSqlQuery from '../execute-sql-query';
import { Application } from '../../../types';

/**
 * createCompanyDifferentTradingAddress
 * Create new "company different trading address" entries with company relationships.
 * 1) Map over each application.
 * 2) Generate "different trading address" values.
 * 3) Insert the values into the CompanyDifferentTradingAddress table.
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const createCompanyDifferentTradingAddress = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating companyDifferentTradingAddresses entries with company relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const jointlyInsuredPartyPromises = applications.map(async (application: Application) => {
      const theValues = `('${createCuid()}', '${application.company}')`;

      const query = `
        INSERT INTO CompanyDifferentTradingAddress (id, company) VALUES ${theValues};
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Creating CompanyDifferentTradingAddress entry for application ${application.id}`,
      });

      return updated;
    });

    return Promise.all(jointlyInsuredPartyPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createCompanyDifferentTradingAddress;
