import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * removeBuyerFields
 * Remove old buyer fields from the buyer table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const removeBuyerFields = async (connection: Connection) => {
  const queries = await Promise.all([
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN canContactBuyer',
      loggingMessage: 'Removing FIELD canContactBuyer from buyer table',
    }),

    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN contactEmail',
      loggingMessage: 'Removing FIELD contactEmail from buyer table',
    }),

    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN contactFirstName',
      loggingMessage: 'Removing FIELD contactFirstName from buyer table',
    }),

    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN contactLastName',
      loggingMessage: 'Removing FIELD contactLastName from buyer table',
    }),

    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN contactPosition',
      loggingMessage: 'Removing FIELD contactPosition from buyer table',
    }),

    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN exporterIsConnectedWithBuyer',
      loggingMessage: 'Removing FIELD exporterIsConnectedWithBuyer from buyer table',
    }),

    executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer DROP COLUMN exporterHasTradedWithBuyer',
      loggingMessage: 'Removing FIELD exporterHasTradedWithBuyer from buyer table',
    }),
  ]);

  return queries;
};

export default removeBuyerFields;
