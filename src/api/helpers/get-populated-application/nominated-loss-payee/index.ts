import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getNominatedLossPayee
 * Get an application's nominated loss payee by ID
 * @param {Context} KeystoneJS context API
 * @param {String} lossPayeeId: Loss payee ID
 * @returns {ApplicationPolicy} mapped policy
 */
const getNominatedLossPayee = async (context: Context, lossPayeeId: string) => {
  try {
    console.info(`Getting nominated loss payee ${lossPayeeId}`);

    const nominatedLossPayee = await context.query.NominatedLossPayee.findOne({
      where: { id: lossPayeeId },
      query:
        'id isAppointed isLocatedInUk isLocatedInternationally name financialUk { id accountNumber sortCode bankAddress vector { accountNumberVector sortCodeVector } } financialInternational { id iban bicSwiftCode bankAddress vector { bicSwiftCodeVector ibanVector } }',
    });

    return nominatedLossPayee;
  } catch (err) {
    console.error('Error getting nominated loss payee (getNominatedLossPayee helper) %O', err);

    throw new Error(`Error getting nominated loss payee (getNominatedLossPayee helper) ${err}`);
  }
};

export default getNominatedLossPayee;
