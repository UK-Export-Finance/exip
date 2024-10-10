import { Connection } from 'mysql2/promise';
import submittedApplications from './submitted-applications';
import nonSubmittedApplications from './non-submitted-applications';

/**
 * createDeclarationVersionRelationship
 * Create new "declaration version" entires with version numbers and "declaration" relationships.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<DeclarationVersion>>} Declaration version entries
 */
const createDeclarationVersionRelationship = async (connection: Connection) => {
  const loggingMessage = 'Creating declarationVersion entries with declaration relationships for non-submitted applications';

  console.info('✅ %s', loggingMessage);

  try {
    const promises = await Promise.all([submittedApplications(connection), nonSubmittedApplications(connection)]);

    return promises;
  } catch (error) {
    console.error('🚨 error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default createDeclarationVersionRelationship;
