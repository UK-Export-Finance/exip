import { Context, LossPayeeFinancialUkVectorUpdateInput } from '.keystone/types'; // eslint-disable-line
import { ApplicationLossPayeeFinancialUkVector } from '../../types';

/**
 * updateLossPayeeFinancialUkVector
 * @param {Object} context: KeystoneJS context API
 * @param {Object} id: Loss payee financial uk vector ID
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
  } catch (err) {
    console.error('Error updating loss payee financial uk vector (helper) %O', err);
    throw new Error(`Updating loss payee financial uk vector (helper) ${err}`);
  }
};

export default updateLossPayeeFinancialUkVector;
