import { Context } from '.keystone/types'; // eslint-disable-line
import mapLossPayeeFinancialDetailsInternational from '../../../helpers/map-loss-payee-financial-details-international';
import updateLossPayeeFinancialInternational from '../../../helpers/update-loss-payee-financial-international';
import updateLossPayeeFinancialInternationalVector from '../../../helpers/update-loss-payee-financial-international-vector';
import { ApplicationLossPayeeFinancialInternational, SuccessResponse } from '../../../types';

/**
 * updateLossPayeeFinancialDetailsInternational
 * encrypts iban and bicSwiftCode
 * saves iban, ibanVector, bicSwiftCode, bicSwiftCodeVector, bankAddress to db
 * @param {Object} root: GraphQL root variables
 * @param {ApplicationLossPayeeFinancialInternational} GraphQL variables for the ApplicationLossPayeeFinancialInternational mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const updateLossPayeeFinancialDetailsInternational = async (
  root: any,
  variables: ApplicationLossPayeeFinancialInternational,
  context: Context,
): Promise<SuccessResponse> => {
  try {
    console.info('Updating loss payee financial international %s', variables.id);

    const { id } = variables;

    /**
     * Map/generate an object with encrypted data.
     * Encrypts iban and bicSwiftCode,
     * adds the initialisation vectors
     */
    const mappedData = mapLossPayeeFinancialDetailsInternational(variables);

    /**
     * Update the international relationship.
     * Update the international vector relationship.
     */
    const international = await updateLossPayeeFinancialInternational(context, id, mappedData.international);

    const vector = await updateLossPayeeFinancialInternationalVector(context, String(international.vectorId), mappedData.vectors);

    if (international && vector) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error('Error updating loss payee financial international %o', error);

    throw new Error(`Updating loss payee financial international ${error}`);
  }
};

export default updateLossPayeeFinancialDetailsInternational;
