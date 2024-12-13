import { Connection } from 'mysql2/promise';
import { DECLARATIONS } from '../../../../constants';
import getAllDeclarationModernSlaveries from '../../../helpers/get-all-declaration-modern-slaveries';
import createCuid from '../../../helpers/create-cuid';
import executeSqlQuery from '../../../execute-sql-query';
import { ApplicationDeclarationModernSlavery } from '../../../../types';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY } =
  DECLARATIONS.LATEST_MODERN_SLAVERY_DECLARATIONS;

/**
 * createDeclarationModernSlaveryVersionRows
 * For each modern slavery, create a new row in the DeclarationModernSlaveryVersion table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createDeclarationModernSlaveryVersionRows = async (connection: Connection) => {
  const loggingMessage = 'Creating modern slavery version entries with modern slavery relationships';

  console.info('✅ %s', loggingMessage);

  try {
    const modernSlaveries = await getAllDeclarationModernSlaveries(connection);

    if (!modernSlaveries.length) {
      console.info('ℹ️ No modern slavery entries available - no need to create declarationModernSlaveryVersion entries');

      return false;
    }

    const versionPromises = modernSlaveries.map(async (modernSlavery: ApplicationDeclarationModernSlavery) => {
      const { id: modernSlaveryId } = modernSlavery;

      const idValues = `'${createCuid()}', '${modernSlaveryId}',`;

      const versionValues = `'${WILL_ADHERE_TO_ALL_REQUIREMENTS}', '${HAS_NO_OFFENSES_OR_INVESTIGATIONS}', '${IS_NOT_AWARE_OF_EXISTING_SLAVERY}'`;

      const theValues = `(${idValues} ${versionValues})`;

      const query = await executeSqlQuery({
        connection,
        query: `INSERT INTO DeclarationModernSlaveryVersion (id, declarationModernSlavery, hasNoOffensesOrInvestigations, isNotAwareOfExistingSlavery, willAdhereToAllRequirements) VALUES ${theValues}`,
        loggingMessage: `Creating DeclarationModernSlaveryVersion entry for modernSlavery ${modernSlaveryId}`,
      });

      return query;
    });

    return Promise.all(versionPromises);
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default createDeclarationModernSlaveryVersionRows;
