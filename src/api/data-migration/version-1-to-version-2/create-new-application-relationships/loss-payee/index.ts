import { Context } from '.keystone/types'; // eslint-disable-line
import createInitialLossPayees from './create-initial-loss-payee';
import lossPayeeFinancialInternational from './create-loss-payee-financial-international';
import lossPayeeFinancialInternationalVector from './create-loss-payee-financial-international-vector';
import lossPayeeFinancialUk from './create-loss-payee-financial-uk';
import lossPayeeFinancialUkVector from './create-loss-payee-financial-uk-vector';
import createApplicationLossPayeeRelationship from './create-application-loss-payee-relationship';

/**
 * createLossPayee
 * Create new "loss payee" entries
 * 1) Create initial "loss payee" entries.
 * 2) Create an array of loss payee ID "connect" relationships.
 * 3) Create "loss payee - financial international" entries.
 * 4) Create an array of loss payee - financial international ID "connect" relationships.
 * 5) Create "loss payee - financial international vector" entries.
 * 6) Create "loss payee - financial UK" entries.
 * 7) Create an array of loss payee - financial UK ID "connect" relationships.
 * 8) Create "loss payee - financial UK vector" entries.
 * 9) Update applications to hav a loss payee relationship/ID.
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} applicationIdsConnectArray: Array of application IDs "connect" objects
 * @returns {Promise<Array<ApplicationNominatedLossPayee>>} Loss payee entries
 */
const createLossPayee = async (context: Context, applicationIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees with application relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const lossPayees = await createInitialLossPayees(context, applicationIdsConnectArray);

    // const lossPayeeIds = mapArrayOfConnectionObjects({
    //   idsArray: lossPayees,
    //   relationshipName: 'lossPayee',
    // });

    const financialInternationals = await lossPayeeFinancialInternational(context, lossPayeeIds);

    // const internationalIds = mapArrayOfConnectionObjects({
    //   idsArray: financialInternationals,
    //   relationshipName: 'financialInternational',
    // });

    await lossPayeeFinancialInternationalVector(context, internationalIds);

    const financialUks = await lossPayeeFinancialUk(context, lossPayeeIds);

    // const ukIds = mapArrayOfConnectionObjects({
    //   idsArray: financialUks,
    //   relationshipName: 'financialUk',
    // });

    await lossPayeeFinancialUkVector(context, ukIds);

    await createApplicationLossPayeeRelationship(context, lossPayees);

    return lossPayees;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createLossPayee;
