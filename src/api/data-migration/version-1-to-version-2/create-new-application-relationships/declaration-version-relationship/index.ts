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

  console.info(`✅ ${loggingMessage}`);

  try {
    const promises = Promise.all([await submittedApplications(connection), await nonSubmittedApplications(connection)]);

    return promises;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createDeclarationVersionRelationship;
