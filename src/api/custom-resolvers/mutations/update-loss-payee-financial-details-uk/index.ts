import { Context } from '.keystone/types'; // eslint-disable-line
import encrypt from '../../../helpers/encrypt';
import { ApplicationLossPayeeFinancialUk, SuccessResponse } from '../../../types';

/**
 * updateLossPayeeFinancialDetailsUk
 * encrypts sortCode and accountNumber
 * saves sortCode, sortCodeVector, accountNumber, accountNumberVector, bankAddress to db
 * @param {Object} GraphQL root variables
 * @param {ApplicationLossPayeeFinancialUk} GraphQL variables for the ApplicationLossPayeeFinancialUk mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const updateLossPayeeFinancialDetailsUk = async (root: any, variables: ApplicationLossPayeeFinancialUk, context: Context): Promise<SuccessResponse> => {
  try {
    console.info('Updating loss payee financial details UK %s', variables.id);

    const { id, accountNumber, sortCode, bankAddress } = variables;

    /**
     * object with encrypted data and initialisation vectors
     * encrypts accountNumber and sortCode
     * adds the initialisation vectors
     */
    const updateData = {
      accountNumber: encrypt(accountNumber).value,
      accountNumberVector: encrypt(accountNumber).iv,
      sortCode: encrypt(sortCode).value,
      sortCodeVector: encrypt(sortCode).iv,
      bankAddress,
    };

    const response = await context.db.LossPayeeFinancialUk.updateOne({
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
    console.error('Error updating loss payee financial details UK %O', err);
    throw new Error(`Updating loss payee financial details UK ${err}`);
  }
};

export default updateLossPayeeFinancialDetailsUk;
