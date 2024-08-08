import { Context } from '.keystone/types'; // eslint-disable-line
import decryptNominatedLossPayee from '../../decrypt-nominated-loss-payee';
import { ApplicationNominatedLossPayee } from '../../../types';

/**
 * getNominatedLossPayee
 * Get an application's nominated loss payee by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} lossPayeeId: Loss payee ID
 * @param {Boolean} decryptFinancialUk: should financialUk data be decrypted
 * @param {Boolean} decryptFinancialInternational: should financialInternational data be decrypted
 * @returns {ApplicationPolicy} mapped policy
 */
const getNominatedLossPayee = async (context: Context, lossPayeeId: string, decryptFinancialUk?: boolean, decryptFinancialInternational?: boolean) => {
  try {
    console.info('Getting nominated loss payee %s', lossPayeeId);

    const nominatedLossPayee = (await context.query.NominatedLossPayee.findOne({
      where: { id: lossPayeeId },
      query:
        'id isAppointed isLocatedInUk isLocatedInternationally name financialUk { id accountNumber sortCode bankAddress vector { accountNumberVector sortCodeVector } } financialInternational { id iban bicSwiftCode bankAddress vector { bicSwiftCodeVector ibanVector } }',
    })) as ApplicationNominatedLossPayee;

    if (decryptFinancialUk || decryptFinancialInternational) {
      const decryptedNominatedLossPayee = decryptNominatedLossPayee(nominatedLossPayee, decryptFinancialUk, decryptFinancialInternational);

      return decryptedNominatedLossPayee;
    }

    return nominatedLossPayee;
  } catch (error) {
    console.error('Error getting nominated loss payee (getNominatedLossPayee helper) %O', error);

    throw new Error(`Error getting nominated loss payee (getNominatedLossPayee helper) ${error}`);
  }
};

export default getNominatedLossPayee;
