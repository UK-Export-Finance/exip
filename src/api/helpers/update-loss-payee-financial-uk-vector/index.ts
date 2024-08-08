import { Context, LossPayeeFinancialUkVectorUpdateInput } from '.keystone/types'; // eslint-disable-line
import { ApplicationLossPayeeFinancialUkVector } from '../../types';

/**
 * updateLossPayeeFinancialUkVector
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Loss payee financial uk vector ID
 * @param {LossPayeeFinancialUkVectorUpdateInput} data
 * @returns {Promise<ApplicationLossPayeeFinancialUkVector>}
 */
const updateLossPayeeFinancialUkVector = async (
  context: Context,
  id: string,
  data: LossPayeeFinancialUkVectorUpdateInput,
): Promise<ApplicationLossPayeeFinancialUkVector> => {
  try {
    console.info('Updating loss payee financial uk vector (helper) %s', id);

    const updated = await context.db.LossPayeeFinancialUkVector.updateOne({
      where: {
        id,
      },
      data,
    });

    return updated;
  } catch (error) {
    console.error('Error updating loss payee financial uk vector (helper) %O', error);

    throw new Error(`Updating loss payee financial uk vector (helper) ${error}`);
  }
};

export default updateLossPayeeFinancialUkVector;
