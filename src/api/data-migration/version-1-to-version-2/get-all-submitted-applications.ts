import { Connection } from 'mysql2/promise';
import { APPLICATION } from '../../constants';
import executeSqlQuery from '../execute-sql-query';
import { Application } from '../../types';

const { STATUS } = APPLICATION;

/**
 * getAllSubmittedApplications
 * Get all entries in the "Application" table with a SUBMITTED status
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Application>} Submitted applications
 */
const getAllSubmittedApplications = async (connection: Connection) => {
  const loggingMessage = 'Getting all submitted applications';

  try {
    const query = `SELECT * FROM Application WHERE status='${STATUS.SUBMITTED}'`;

    const [applications] = await executeSqlQuery({ connection, query, loggingMessage });

    return applications as Array<Application>;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllSubmittedApplications;
