import { Context } from '.keystone/types'; // eslint-disable-line
import { GetApplicationByReferenceNumberResponse, GetApplicationByReferenceNumberVariables } from '../../../types';
import getIdsByReferenceNumber from '../../../helpers/get-ids-by-reference-number';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import decryptNominatedLossPayee from '../../../helpers/decrypt-nominated-loss-payee';

/**
 * getApplicationByReferenceNumber
 * Gets an application by reference number
 * Based on decrypt variables, decrypts part of application
 * returns full application
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the getApplicationByReferenceNumberVariables mutation
 * @param {Object} KeystoneJS context API
 * @returns {Promise<GetApplicationByReferenceNumberResponse>} Application with success flag
 */
const getApplicationByReferenceNumber = async (
  root: any,
  variables: GetApplicationByReferenceNumberVariables,
  context: Context,
): Promise<GetApplicationByReferenceNumberResponse> => {
  try {
    console.info('Getting application by reference number');

    const { referenceNumber, decryptFinancialUk } = variables;

    // array of ids in application from provided application reference number
    const ids = await getIdsByReferenceNumber(referenceNumber, context);

    if (ids) {
      // populates application based on applicationIds
      let populatedApplication = await getPopulatedApplication(context, ids);

      /**
       * if decrypt variables are set to true
       * decrypts relevant nominatedLossPayee fields
       * returns decrypted application
       */
      if (decryptFinancialUk) {
        const { nominatedLossPayee } = populatedApplication;
        const decryptedNominatedLossPayee = decryptNominatedLossPayee(nominatedLossPayee, decryptFinancialUk);

        populatedApplication = {
          ...populatedApplication,
          nominatedLossPayee: decryptedNominatedLossPayee,
        };
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

export default getApplicationByReferenceNumber;
