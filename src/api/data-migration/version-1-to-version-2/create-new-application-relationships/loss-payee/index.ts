import { Connection } from 'mysql2/promise';
import createInitialLossPayees from './create-initial-loss-payees';
import lossPayeeFinancialInternational from './create-loss-payee-financial-international';
import lossPayeeFinancialInternationalVector from './create-loss-payee-financial-international-vector';
import lossPayeeFinancialUk from './create-loss-payee-financial-uk';
import lossPayeeFinancialUkVector from './create-loss-payee-financial-uk-vector';
import updateLossPayeeFinancialUkVector from './update-loss-payee-financial-uk-vector';
import updateLossPayeeFinancialInternationalVector from './update-loss-payee-financial-international-vector';
import createApplicationLossPayeeRelationship from './create-application-loss-payee-relationship';
import { Application } from '../../../../types';

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
 * @param {Connection} connection: SQL database connection
 * @param {Array<object>} applicationIdsConnectArray: Array of application IDs "connect" objects
 * @returns {Promise<Array<ApplicationNominatedLossPayee>>} Loss payee entries
 */
const createLossPayee = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating nominatedLossPayees with application relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const promises = await Promise.all([
      createInitialLossPayees(connection, applications),
      lossPayeeFinancialInternational(connection),
      lossPayeeFinancialInternationalVector(connection, applications),
      lossPayeeFinancialUk(connection),
      lossPayeeFinancialUkVector(connection, applications),
      updateLossPayeeFinancialUkVector(connection),
      updateLossPayeeFinancialInternationalVector(connection),
      createApplicationLossPayeeRelationship(connection),
    ]);

    return promises;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createLossPayee;
