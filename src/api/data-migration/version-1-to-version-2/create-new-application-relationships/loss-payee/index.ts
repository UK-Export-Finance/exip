import { Connection } from 'mysql2/promise';
import createInitialLossPayees from './create-initial-loss-payees';
import lossPayeeFinancialInternational from './create-loss-payee-financial-international';
import lossPayeeFinancialInternationalVector from './create-loss-payee-financial-international-vector';
import lossPayeeFinancialUk from './create-loss-payee-financial-uk';
import lossPayeeFinancialUkVector from './create-loss-payee-financial-uk-vector';
import createApplicationLossPayeeRelationship from './create-application-loss-payee-relationship';
import { Application } from '../../../../types';

/**
 * createLossPayee
 * Create new "loss payee" entries
 * 1) Create initial "loss payee" entries.
 * 2) Create "loss payee - financial international" entries.
 * 3) Create "loss payee - financial international vector" entries.
 * 4) Create "loss payee - financial UK" entries.
 * 5) Create "loss payee - financial UK vector" entries.
 * 6) Update applications to have a loss payee relationship/ID.
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} Applications: Applications
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
      createApplicationLossPayeeRelationship(connection),
    ]);

    return promises;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createLossPayee;
