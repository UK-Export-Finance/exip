import { Context } from '.keystone/types'; // eslint-disable-line
import mapLossPayeeFinancialDetailsInternational from '../../../helpers/map-loss-payee-financial-details-international';
import { ApplicationLossPayeeFinancialInternational, SuccessResponse } from '../../../types';

/**
 * updateLossPayeeFinancialDetailsInternational
 * encrypts iban and bicSwiftCode
 * saves iban, ibanVector, bicSwiftCode, bicSwiftCodeVector, bankAddress to db
 * @param {Object} GraphQL root variables
 * @param {ApplicationLossPayeeFinancialInternational} GraphQL variables for the ApplicationLossPayeeFinancialInternational mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const updateLossPayeeFinancialDetailsInternational = async (
  root: any,
  variables: ApplicationLossPayeeFinancialInternational,
  context: Context,
): Promise<SuccessResponse> => {
  try {
    console.info('Updating loss payee financial details international %s', variables.id);

    const { id } = variables;

    /**
     * object with encrypted data and initialisation vectors
     * encrypts iban and bicSwiftCode
     * adds the initialisation vectors
     */
    const updateData = mapLossPayeeFinancialDetailsInternational(variables);

    const response = await context.db.LossPayeeFinancialInternational.updateOne({
      where: {
        id,
      },
      data: updateData,
    });

    if (response) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error('Error updating loss payee financial details international %O', err);
    throw new Error(`Updating loss payee financial details international ${err}`);
  }
};

export default updateLossPayeeFinancialDetailsInternational;
