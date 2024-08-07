import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addEligibilityFields
 * Add new fields to the eligibility table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addEligibilityFields = async (connection: Connection) => {
  const promises = await Promise.all([
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Eligibility ADD hasEndBuyer tinyint(1) NOT NULL DEFAULT '0'`,
      loggingMessage: 'Adding FIELD hasEndBuyer to eligibility table',
    }),

    executeSqlQuery({
      connection,
      query: `ALTER TABLE Eligibility ADD isMemberOfAGroup tinyint(1) NOT NULL DEFAULT '0'`,
      loggingMessage: 'Adding FIELD isMemberOfAGroup to eligibility table',
    }),

    executeSqlQuery({
      connection,
      query: `ALTER TABLE Eligibility ADD isPartyToConsortium tinyint(1) NOT NULL DEFAULT '0'`,
      loggingMessage: 'Adding FIELD isPartyToConsortium to eligibility table',
    }),
  ]);

  return promises;
};

export default addEligibilityFields;
