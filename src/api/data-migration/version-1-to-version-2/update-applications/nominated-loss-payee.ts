import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * addNominatedLossPayeeField
 * Add a nominatedLossPayee field to the application table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
export const addNominatedLossPayeeField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD nominatedLossPayee to application table';

  const query = `
    ALTER TABLE Application ADD nominatedLossPayee varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

/**
 * addNominatedLossPayeeConstraint
 * Add a nominatedLossPayee constraint to the application table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
export const addNominatedLossPayeeConstraint = (connection: Connection) => {
  const loggingMessage = 'Adding CONSTRAINT nominatedLossPayee to application table';

  const query = `
    ALTER TABLE Application ADD CONSTRAINT Application_nominatedLossPayee_fkey FOREIGN KEY (nominatedLossPayee) REFERENCES NominatedLossPayee (id) ON DELETE SET NULL ON UPDATE CASCADE
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};
