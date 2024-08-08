import { Context, LossPayeeFinancialInternationalVectorUpdateInput } from '.keystone/types'; // eslint-disable-line
import { ApplicationLossPayeeFinancialInternationalVector } from '../../types';

/**
 * updateLossPayeeFinancialInternationalVector
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Loss payee financial international vector ID
 * @param {LossPayeeFinancialInternationalVectorUpdateInput} data
 * @returns {Promise<ApplicationLossPayeeFinancialInternationalVector>}
 */
const updateLossPayeeFinancialInternationalVector = async (
  context: Context,
  id: string,
  data: LossPayeeFinancialInternationalVectorUpdateInput,
): Promise<ApplicationLossPayeeFinancialInternationalVector> => {
  try {
    console.info('Updating loss payee financial international vector (helper) %s', id);

    const updated = await context.db.LossPayeeFinancialInternationalVector.updateOne({
      where: {
        id,
      },
      data,
    });

    return updated;
  } catch (error) {
    console.error('Error updating loss payee financial international vector (helper) %O', error);

    throw new Error(`Updating loss payee financial international vector (helper) ${error}`);
  }
};

export default updateLossPayeeFinancialInternationalVector;
