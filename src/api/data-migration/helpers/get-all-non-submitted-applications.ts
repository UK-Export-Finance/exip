import { Connection } from 'mysql2/promise';
import { APPLICATION } from '../../constants';
import executeSqlQuery from '../execute-sql-query';
import { Application } from '../../types';

const { STATUS } = APPLICATION;

/**
 * getAllNonSubmittedApplications
 * Get all entries in the "Application" table that do NOT have a SUBMITTED status
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<Application>>} Non-submitted applications
 */
const getAllNonSubmittedApplications = async (connection: Connection) => {
  const loggingMessage = 'Getting all non-submitted applications';

  try {
    const query = `SELECT * FROM Application WHERE status!='${STATUS.SUBMITTED}'`;

    const [applications] = await executeSqlQuery({ connection, query, loggingMessage });

    return applications as Array<Application>;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllNonSubmittedApplications;
