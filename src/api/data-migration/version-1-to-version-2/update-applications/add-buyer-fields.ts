import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * buyerFields
 * Add new fields to the buyer table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const buyerFields = async (connection: Connection) => {
  const queries = await Promise.all([
    await executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer ADD buyerTradingHistory varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL',
      loggingMessage: 'Adding FIELD buyerTradingHistory to buyer table',
    }),
    await executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer ADD contact varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL',
      loggingMessage: 'Adding FIELD contact to buyer table',
    }),
    await executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer ADD relationship varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL',
      loggingMessage: 'Adding FIELD relationship to buyer table',
    }),
  ]);

  return queries;
};

/**
 * buyerConstraints
 * Add new unique keys to the buyer table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const buyerUniqueKeys = async (connection: Connection) => {
  const queries = await Promise.all([
    await executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer ADD UNIQUE KEY Buyer_buyerTradingHistory_key (buyerTradingHistory)',
      loggingMessage: 'Adding UNIQUE KEY buyerTradingHistory to buyer table',
    }),
    await executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer ADD UNIQUE KEY Buyer_contact_key (contact)',
      loggingMessage: 'Adding UNIQUE KEY contact to buyer table',
    }),
    await executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer ADD UNIQUE KEY Buyer_relationship_key (relationship)',
      loggingMessage: 'Adding UNIQUE KEY relationship to buyer table',
    }),
  ]);

  return queries;
};

/**
 * buyerConstraints
 * Add new constraints to the buyer table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const buyerConstraints = async (connection: Connection) => {
  const queries = await Promise.all([
    await executeSqlQuery({
      connection,
      query: 'ALTER TABLE Buyer ADD CONSTRAINT Buyer_contact_fkey FOREIGN KEY (contact) REFERENCES BuyerContact (id) ON DELETE SET NULL ON UPDATE CASCADE',
      loggingMessage: 'Adding CONSTRAINT contact to buyer table',
    }),
    await executeSqlQuery({
      connection,
      query:
        'ALTER TABLE Buyer ADD CONSTRAINT Buyer_relationship_fkey FOREIGN KEY (relationship) REFERENCES BuyerRelationship (id) ON DELETE SET NULL ON UPDATE CASCADE',
      loggingMessage: 'Adding CONSTRAINT relationship to buyer table',
    }),
    await executeSqlQuery({
      connection,
      query:
        'ALTER TABLE Buyer ADD CONSTRAINT Buyer_buyerTradingHistory_fkey FOREIGN KEY (buyerTradingHistory) REFERENCES BuyerTradingHistory (id) ON DELETE SET NULL ON UPDATE CASCADE',
      loggingMessage: 'Adding CONSTRAINT buyerTradingHistory to buyer table',
    }),
  ]);

  return queries;
};

/**
 * addBuyerFields
 * Add new buyer fields to the company table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addBuyerFields = async (connection: Connection) => {
  const queries = await Promise.all([await buyerFields(connection), await buyerUniqueKeys(connection), await buyerConstraints(connection)]);

  return queries;
};

export default addBuyerFields;
