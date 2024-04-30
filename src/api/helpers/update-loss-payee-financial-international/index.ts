import { Context, LossPayeeFinancialInternationalUpdateInput } from '.keystone/types'; // eslint-disable-line
import { ApplicationLossPayeeFinancialInternational } from '../../types';

/**
 * updateLossPayeeFinancialInternational
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Loss payee financial international ID
 * @param {LossPayeeFinancialInternationalUpdateInput} data
 * @returns {Promise<ApplicationLossPayeeFinancialInternational>}
 */
const updateLossPayeeFinancialInternational = async (
  context: Context,
  id: string,
  data: LossPayeeFinancialInternationalUpdateInput,
): Promise<ApplicationLossPayeeFinancialInternational> => {
  try {
    console.info('Updating loss payee financial international (helper) %s', id);

    const updated = (await context.db.LossPayeeFinancialInternational.updateOne({
      where: {
        id,
      },
      data,
    })) as ApplicationLossPayeeFinancialInternational;

    return updated;
  } catch (err) {
    console.error('Error updating loss payee financial international (helper) %O', err);
    throw new Error(`Updating loss payee financial international (helper) ${err}`);
  }
};

export default updateLossPayeeFinancialInternational;
