import { Application, Context } from '.keystone/types'; // eslint-disable-line
import { GetApplicationByReferenceNumberVariables, GetApplicationByReferenceNumberResponse } from '../../../types';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import decryptApplication from '../../../helpers/decrypt-application';

/**
 * getApplicationByReferenceNumber
 * Gets an application by reference number
 * Based on decrypt variables, decrypts part of application
 * returns full application
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the GetApplicationByReferenceNumberVariables mutation
 * @param {Object} KeystoneJS context API
 * @returns {Promise<GetApplicationByReferenceNumberResponse>} Application with success flag
 */
const getApplicationByReferenceNumber = async (
  root: any,
  variables: GetApplicationByReferenceNumberVariables,
  context: Context,
): Promise<GetApplicationByReferenceNumberResponse> => {
  try {
    console.info('Getting decrypted application by reference number');

    const { referenceNumber, decryptFinancialUk } = variables;

    // finds applicationIds by reference number
    const applicationIds = (await context.db.Application.findOne({
      where: {
        id: referenceNumber,
      },
    })) as Application;

    if (applicationIds) {
      // populates application based on applicationIds
      let populatedApplication = await getPopulatedApplication(context, applicationIds);

      /**
       * if decrypt variables are set to true
       * decrypts relevant application sections
       * returns decrypted application
       */
      if (decryptFinancialUk) {
        populatedApplication = decryptApplication(populatedApplication, decryptFinancialUk);
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
