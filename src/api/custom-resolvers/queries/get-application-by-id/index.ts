import { Application, Context } from '.keystone/types'; // eslint-disable-line
import { GetApplicationByIdResponse, GetApplicationByIdVariables } from '../../../types';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import decryptApplication from '../../../helpers/decrypt-application';

/**
 * getApplicationById
 * Gets an application by id
 * Based on decrypt variables, decrypts part of application
 * returns full application
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the GetApplicationByIdVariables mutation
 * @param {Object} KeystoneJS context API
 * @returns {Promise<GetApplicationByIdResponse>} Application with success flag
 */
const getApplicationById = async (root: any, variables: GetApplicationByIdVariables, context: Context): Promise<GetApplicationByIdResponse> => {
  try {
    console.info('Getting decrypted application by id');

    const { id, decryptFinancialUk } = variables;

    // finds applicationIds by id
    const applicationIds = (await context.db.Application.findOne({
      where: {
        id,
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

export default getApplicationById;
