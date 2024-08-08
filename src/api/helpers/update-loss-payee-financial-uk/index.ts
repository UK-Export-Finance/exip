import { Context, LossPayeeFinancialUkUpdateInput } from '.keystone/types'; // eslint-disable-line
import { ApplicationLossPayeeFinancialUk } from '../../types';

/**
 * updateLossPayeeFinancialInternationalUk
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Loss payee financial international uk ID
 * @param {LossPayeeFinancialUkUpdateInput} data
 * @returns {Promise<ApplicationLossPayeeFinancialUk>}
 */
const updateLossPayeeFinancialInternationalUk = async (
  context: Context,
  id: string,
  data: LossPayeeFinancialUkUpdateInput,
): Promise<ApplicationLossPayeeFinancialUk> => {
  try {
    console.info('Updating loss payee financial uk (helper) %s', id);

    const updated = (await context.db.LossPayeeFinancialUk.updateOne({
      where: {
        id,
      },
      data,
    })) as ApplicationLossPayeeFinancialUk;

    return updated;
  } catch (error) {
    console.error('Error updating loss payee financial uk (helper) %O', error);

    throw new Error(`Updating loss payee financial uk (helper) ${error}`);
  }
};

export default updateLossPayeeFinancialInternationalUk;
