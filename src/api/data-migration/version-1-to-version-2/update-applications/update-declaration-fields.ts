import { Connection } from 'mysql2/promise';
import getAllNonSubmittedApplications from '../get-all-non-submitted-applications';
import executeSqlQuery from '../../execute-sql-query';
import { Application } from '../../../types';

/**
 * updateDeclarationFields
 * update fields in the declaration table.
 * This sets all existing declarations to NULL.
 * In V2, any existing declarations will become invalid due to new versions.
 * If we do not nullify a user's existing answers, they have technically agreed to something that is out of date.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updateDeclarationFields = async (connection: Connection) => {
  const loggingMessage = 'Updating all declarations FIELDS';

  console.info('✅ %s', loggingMessage);

  try {
    const nonSubmittedApplications = await getAllNonSubmittedApplications(connection);

    if (!nonSubmittedApplications.length) {
      console.info('ℹ️ No non-submitted applications available - no need to update declaration fields');

      return false;
    }

    const promises = nonSubmittedApplications.map(async (application: Application) => {
      const { declaration: declarationId } = application;

      const applicationPromises = Promise.all([
        executeSqlQuery({
          connection,
          query: `UPDATE Declaration SET agreeHowDataWillBeUsed=null WHERE id='${declarationId}'`,
          loggingMessage: `updating Declartion agreeHowDataWillBeUsed entry to null for application ${application.id}`,
        }),

        executeSqlQuery({
          connection,
          query: `UPDATE Declaration SET agreeToAntiBribery=null WHERE id='${declarationId}'`,
          loggingMessage: `updating Declartion agreeToAntiBribery entry to null for application ${application.id}`,
        }),

        executeSqlQuery({
          connection,
          query: `UPDATE Declaration SET agreeToConfidentiality=null WHERE id='${declarationId}'`,
          loggingMessage: `updating Declartion agreeToConfidentiality entry to null for application ${application.id}`,
        }),

        executeSqlQuery({
          connection,
          query: `UPDATE Declaration SET agreeToConfirmationAndAcknowledgements=null WHERE id='${declarationId}'`,
          loggingMessage: `updating Declartion agreeToConfirmationAndAcknowledgements entry to null for application ${application.id}`,
        }),

        executeSqlQuery({
          connection,
          query: `UPDATE Declaration SET hasAntiBriberyCodeOfConduct=null WHERE id='${declarationId}'`,
          loggingMessage: `updating Declartion hasAntiBriberyCodeOfConduct entry to null for application ${application.id}`,
        }),

        executeSqlQuery({
          connection,
          query: `UPDATE Declaration SET willExportWithAntiBriberyCodeOfConduct=null WHERE id='${declarationId}'`,
          loggingMessage: `updating Declartion willExportWithAntiBriberyCodeOfConduct entry to null for application ${application.id}`,
        }),
      ]);

      return applicationPromises;
    });

    return Promise.all(promises);
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default updateDeclarationFields;
