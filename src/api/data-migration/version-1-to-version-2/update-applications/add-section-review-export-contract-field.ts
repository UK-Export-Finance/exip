import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addSectionReviewExportContractField
 * Add a exportContract field to the sectionReview table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addSectionReviewExportContractField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD exportContract to sectionReview table';

  const query = `
    ALTER TABLE SectionReview ADD exportContract tinyint(1) DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addSectionReviewExportContractField;
