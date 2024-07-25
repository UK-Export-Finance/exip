import { Connection } from 'mysql2/promise';
import { DECLARATIONS } from '../../../../constants';
import getAllNonSubmittedApplications from '../../get-all-non-submitted-applications';
import createCuid from '../../create-cuid';
import executeSqlQuery from '../../execute-sql-query';
import { Application } from '../../../../types';

const {
  ANTI_BRIBERY,
  ANTI_BRIBERY_CODE_OF_CONDUCT,
  ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
  CONFIDENTIALITY,
  CONFIRMATION_AND_ACKNOWLEDGEMENTS,
} = DECLARATIONS.LATEST_DECLARATIONS;

/**
 * createDeclarationVersionRelationship
 * Create new "declaration version" entires with version numbers and "declaration" relationships,
 * for applications that do NOT have a SUBMITTED status.
 * Applications that have NOT been submitted, prior to V2, should have the latest declaration versions.
 * 1) Map over each application
 * 2) Create new database values with a CUID and version numbers
 * 3) Add entries to the DeclarationVersion table
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<DeclarationVersion>>} Declaration version entries
 */
const createDeclarationVersionRelationshipNotSubmittedApplications = async (connection: Connection) => {
  const loggingMessage = 'Creating declarationVersion entries with declaration relationships for non-submitted applications';

  console.info(`✅ ${loggingMessage}`);

  const nonSubmittedApplications = await getAllNonSubmittedApplications(connection);

  if (!nonSubmittedApplications.length) {
    console.info('ℹ️ No non-submitted applications available - no need to create declarationVersion entries');

    return false;
  }

  try {
    const declarationPromises = nonSubmittedApplications.map(async (application: Application) => {
      const { declaration: declarationId } = application;

      const idValues = `'${createCuid()}', '${declarationId}',`;

      const versionValues = `'${ANTI_BRIBERY}', '${CONFIDENTIALITY}', '${CONFIRMATION_AND_ACKNOWLEDGEMENTS}', '${ANTI_BRIBERY_CODE_OF_CONDUCT}', '${ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT}'`;

      const theValues = `(${idValues} ${versionValues})`;

      const query = await executeSqlQuery({
        connection,
        query: `INSERT INTO DeclarationVersion (id, declaration, agreeToAntiBribery, agreeToConfidentiality, agreeToConfirmationAndAcknowledgements, hasAntiBriberyCodeOfConduct, willExportWithAntiBriberyCodeOfConduct) VALUES ${theValues}`,
        loggingMessage: `Creating DeclarationVersion entry for application ${application.id}`,
      });

      return query;
    });

    return Promise.all(declarationPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createDeclarationVersionRelationshipNotSubmittedApplications;
