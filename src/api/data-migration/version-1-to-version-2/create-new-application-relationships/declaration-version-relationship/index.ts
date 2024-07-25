import { Connection } from 'mysql2/promise';
import submittedApplications from './submitted-applications';
import nonSubmittedApplications from './non-submitted-applications';
import { Application } from '../../../../types';

/**
 * createDeclarationVersionRelationship
 * Create new "declaration version" entires with version numbers and "declaration" relationships.
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<DeclarationVersion>>} Declaration version entries
 */
const createDeclarationVersionRelationship = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating declarationVersion entries with declaration relationships for non-submitted applications';

  console.info(`✅ ${loggingMessage}`);

  try {
    const declarationPromises = [
      submittedApplications(connection),
      nonSubmittedApplications(connection),
    ];

    return Promise.all(declarationPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createDeclarationVersionRelationship;
