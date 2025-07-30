import { Context } from '.keystone/types'; // eslint-disable-line
import mapLossPayeeFinancialDetailsUk from '../../../helpers/map-loss-payee-financial-details-uk';
import updateLossPayeeFinancialUk from '../../../helpers/update-loss-payee-financial-uk';
import updateLossPayeeFinancialUkVector from '../../../helpers/update-loss-payee-financial-uk-vector';
import { ApplicationLossPayeeFinancialUk, SuccessResponse } from '../../../types';

/**
 * updateLossPayeeFinancialDetailsUk
 * encrypts sortCode and accountNumber
 * saves sortCode, sortCodeVector, accountNumber, accountNumberVector, bankAddress to db
 * @param {object} root: GraphQL root variables
 * @param {ApplicationLossPayeeFinancialUk} GraphQL variables for the ApplicationLossPayeeFinancialUk mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<object>} Object with success flag
 */
const updateLossPayeeFinancialDetailsUk = async (root: any, variables: ApplicationLossPayeeFinancialUk, context: Context): Promise<SuccessResponse> => {
  try {
    console.info('Updating loss payee financial UK %s', variables.id);

    const { id } = variables;

    /**
     * Map/generate an object with encrypted data.
     * Encrypts accountNumber and sortCode
     * adds the initialisation vectors
     */
    const mappedData = mapLossPayeeFinancialDetailsUk(variables);

    /**
     * Update the uk relationship.
     * Update the uk vector relationship.
     */
    const uk = await updateLossPayeeFinancialUk(context, id, mappedData.uk);
    const vector = await updateLossPayeeFinancialUkVector(context, String(uk.vectorId), mappedData.vectors);

    if (uk && vector) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error('Error updating loss payee financial UK %o', error);

    throw new Error(`Updating loss payee financial UK ${error}`);
  }
};

export default updateLossPayeeFinancialDetailsUk;
