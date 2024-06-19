import { Context } from '.keystone/types'; // eslint-disable-line
import mapArrayOfConnectionObjects from '../map-array-of-connection-objects';

const createInitialLossPayees = async (context: Context, applicationIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating initial nominatedLossPayees with application relationships';

  console.info(`✅ ${loggingMessage}`);
  
  try {
    const created = await context.db.NominatedLossPayee.createMany({
      data: applicationIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.info(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

const lossPayeeFinancialInternational = async (context: Context, lossPayeeIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial international';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.LossPayeeFinancialInternational.createMany({
      data: lossPayeeIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.info(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

const lossPayeeFinancialInternationalVector = async (context: Context, lossPayeeIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial international vector';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.LossPayeeFinancialInternationalVector.createMany({
      data: lossPayeeIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.info(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

const lossPayeeFinancialUk = async (context: Context, lossPayeeIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial UK';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.LossPayeeFinancialUk.createMany({
      data: lossPayeeIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.info(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

const lossPayeeFinancialUkVector = async (context: Context, lossPayeeIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial UK vector';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.LossPayeeFinancialUkVector.createMany({
      data: lossPayeeIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.info(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

const createLossPayee = async (context: Context, applicationIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees with application relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const lossPayees = await createInitialLossPayees(context, applicationIdsConnectArray);

    const lossPayeeIds = mapArrayOfConnectionObjects({
      idsArray: lossPayees,
      relationshipName: 'lossPayee',
    });

    const financialInternationals = await lossPayeeFinancialInternational(context, lossPayeeIds);

    const internationalIds = mapArrayOfConnectionObjects({
      idsArray: financialInternationals,
      relationshipName: 'financialInternational',
    });

    await lossPayeeFinancialInternationalVector(context, internationalIds);

    const financialUks = await lossPayeeFinancialUk(context, lossPayeeIds);

    const ukIds = mapArrayOfConnectionObjects({
      idsArray: financialUks,
      relationshipName: 'financialUk',
    });

    await lossPayeeFinancialUkVector(context, ukIds);

  } catch (err) {
    console.info(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

const createNewApplicationRelationships = {
  lossPayee: (context: Context, applicationIdsConnectArray: Array<object>) => createLossPayee(context, applicationIdsConnectArray),
};

export default createNewApplicationRelationships;
