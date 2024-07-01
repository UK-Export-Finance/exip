import { Connection } from 'mysql2/promise';
import getAllCompanies from '../get-all-companies';
import getAllCompanyDifferentTradingAddresses from '../get-all-company-different-trading-addresses';
import executeSqlQuery from '../execute-sql-query';

/**
 * updateCompanyDifferentTradingAddress
 * Update "different trading address" columns in "company" entries
 * 1) Map over each "company".
 * 2) Generate "company" values (different trading address ID relationship)
 * 3) Update the values in the Company table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateCompanyDifferentTradingAddress = async (connection: Connection) => {
  const loggingMessage = 'Updating company differentTradingAddress columns';

  console.info(`✅ ${loggingMessage}`);

  try {
    const companies = await getAllCompanies(connection);
    const differentTradingAddresses = await getAllCompanyDifferentTradingAddresses(connection);

    const accountPromises = companies.map(async (company: object, index: number) => {
      const differentTradingAddress = differentTradingAddresses[index];

      const query = `
        UPDATE Company SET differentTradingAddress='${differentTradingAddress.id}' WHERE id='${company.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating differentTradingAddress column in company table for company ${company.id}`,
      });

      return updated;
    });

    return Promise.all(accountPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateCompanyDifferentTradingAddress;
