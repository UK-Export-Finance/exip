import { Context } from '.keystone/types'; // eslint-disable-line
import { GetApplicationByReferenceNumberResponse, GetApplicationByReferenceNumberVariables } from '../../../types';
import getApplicationByReferenceNumber from '../../../helpers/get-application-by-reference-number';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import decryptNominatedLossPayee from '../../../helpers/decrypt-nominated-loss-payee';

/**
 * getApplicationByReferenceNumberQuery
 * Gets an application by reference number
 * Based on decrypt variables, decrypts part of application
 * returns full application
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the getApplicationByReferenceNumberVariables query
 * @param {Object} KeystoneJS context API
 * @returns {Promise<GetApplicationByReferenceNumberResponse>} Application with success flag
 */
const getApplicationByReferenceNumberQuery = async (
  root: any,
  variables: GetApplicationByReferenceNumberVariables,
  context: Context,
): Promise<GetApplicationByReferenceNumberResponse> => {
  try {
    console.info('Getting application by reference number %s', variables.referenceNumber);

    const { referenceNumber, decryptFinancialUk } = variables;

    // array of ids in application from provided application reference number
    const application = await getApplicationByReferenceNumber(referenceNumber, context);

    // if object is populated
    if (application) {
      // populates application based on applicationIds
      const populatedApplication = await getPopulatedApplication(context, application);

      /**
       * if decrypt variables are set to true
       * decrypts relevant nominatedLossPayee fields
       * returns decrypted application
       */
      if (decryptFinancialUk) {
        const { nominatedLossPayee } = populatedApplication;
        const decryptedNominatedLossPayee = decryptNominatedLossPayee(nominatedLossPayee, decryptFinancialUk);

        populatedApplication.nominatedLossPayee = decryptedNominatedLossPayee;
      }

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
