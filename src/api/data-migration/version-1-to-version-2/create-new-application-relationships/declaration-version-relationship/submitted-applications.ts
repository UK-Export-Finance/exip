import { Connection } from 'mysql2/promise';
import { DECLARATIONS } from '../../../../constants';
import getAllSubmittedApplications from '../../get-all-submitted-applications';
import createCuid from '../../create-cuid';
import executeSqlQuery from '../../../execute-sql-query';
import { Application } from '../../../../types';

const {
  ANTI_BRIBERY,
  ANTI_BRIBERY_CODE_OF_CONDUCT,
  ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
  CONFIDENTIALITY,
  CONFIRMATION_AND_ACKNOWLEDGEMENTS,
  HOW_YOUR_DATA_WILL_BE_USED,
} = DECLARATIONS.V1_DECLARATIONS;

/**
 * createDeclarationVersionRelationshipSubmittedApplications
 * Create new "declaration version" entires with version numbers and "declaration" relationships,
 * for applications with a SUBMITTED status.
 * Applications that have already been submitted, prior to V2, should have V1 declaration versions.
 * 1) Map over each application
 * 2) Create new database values with a CUID and version numbers
 * 3) Add entries to the DeclarationVersion table
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<DeclarationVersion>>} Declaration version entries
 */
const createDeclarationVersionRelationshipSubmittedApplications = async (connection: Connection) => {
  const loggingMessage = 'Creating declarationVersion entries with declaration relationships for submitted applications';

  console.info('✅ %s', loggingMessage);

  const submittedApplications = await getAllSubmittedApplications(connection);

  if (!submittedApplications.length) {
    console.info('ℹ️ No submitted applications available - no need to create declarationVersion entries');

    return false;
  }

  try {
    const declarationPromises = submittedApplications.map(async (application: Application) => {
      const { declaration: declarationId } = application;

      const idValues = `'${createCuid()}', '${declarationId}',`;

      const versionValues = `'${HOW_YOUR_DATA_WILL_BE_USED}', '${ANTI_BRIBERY}', '${CONFIDENTIALITY}', '${CONFIRMATION_AND_ACKNOWLEDGEMENTS}', '${ANTI_BRIBERY_CODE_OF_CONDUCT}', '${ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT}'`;

      const theValues = `(${idValues} ${versionValues})`;

      const query = await executeSqlQuery({
        connection,
        query: `INSERT INTO DeclarationVersion (id, declaration, agreeHowDataWillBeUsed, agreeToAntiBribery, agreeToConfidentiality, agreeToConfirmationAndAcknowledgements, hasAntiBriberyCodeOfConduct, willExportWithAntiBriberyCodeOfConduct) VALUES ${theValues}`,
        loggingMessage: `Creating DeclarationVersion entry for application ${application.id}`,
      });

      return query;
    });

    return Promise.all(declarationPromises);
  } catch (error) {
    console.error('🚨 error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default createDeclarationVersionRelationshipSubmittedApplications;
