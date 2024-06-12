import { Context } from '.keystone/types'; // eslint-disable-line
import getApplicationByReferenceNumber from '../../../helpers/get-application-by-reference-number';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import { GetApplicationByReferenceNumberResponse, GetApplicationByReferenceNumberVariables } from '../../../types';

/**
 * getApplicationByReferenceNumberQuery
 * Get an application by reference number,
 * call getPopulatedApplication
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the getApplicationByReferenceNumberVariables query
 * @param {Context} KeystoneJS context API
 * @returns {Promise<GetApplicationByReferenceNumberResponse>} Application with success flag
 */
const getApplicationByReferenceNumberQuery = async (
  root: any,
  variables: GetApplicationByReferenceNumberVariables,
  context: Context,
): Promise<GetApplicationByReferenceNumberResponse> => {
  try {
    console.info('Getting application by reference number %s', variables.referenceNumber);

    const { referenceNumber, decryptFinancialUk, decryptFinancialInternational } = variables;

    /**
     * Get the application,
     * from the provided reference number
     */
    const application = await getApplicationByReferenceNumber(referenceNumber, context);

    if (application) {
      /**
       * Populate the application,
       * with all relationships.
       * This function also handles decrypting financial details.
       */
      const populatedApplication = await getPopulatedApplication.get({
        context,
        application,
        decryptFinancialUk,
        decryptFinancialInternational,
      });

      return {
        success: true,
        application: populatedApplication,
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error('Error getting application by reference number (GetApplicationByReferenceNumber mutation) %O', err);
    throw new Error(`Get application by reference number (GetApplicationByReferenceNumber mutation) ${err}`);
  }
};

export default getApplicationByReferenceNumberQuery;
