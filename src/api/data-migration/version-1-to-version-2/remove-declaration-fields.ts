import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * removeDeclarationKeys
 * Remove old declaration keys from the declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const removeDeclarationKeys = async (connection: Connection) => {
  const loggingMessage = 'Removing KEYS declarations';

  console.info('✅ %s', loggingMessage);

  try {
    const queries = await Promise.all([
      executeSqlQuery({
        connection,
        query: `ALTER TABLE Declaration DROP KEY Declaration_antiBribery_idx`,
        loggingMessage: 'Removing KEY Declaration_antiBribery_idx from declaration table',
      }),

      executeSqlQuery({
        connection,
        query: `ALTER TABLE Declaration DROP KEY Declaration_confirmationAndAcknowledgements_idx`,
        loggingMessage: 'Removing KEY Declaration_confirmationAndAcknowledgements_idx from declaration table',
      }),

      executeSqlQuery({
        connection,
        query: `ALTER TABLE Declaration DROP KEY Declaration_howDataWillBeUsed_idx`,
        loggingMessage: 'Removing KEY Declaration_howDataWillBeUsed_idx from declaration table',
      }),
    ]);

    return queries;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

/**
 * removeDeclarationConstraints
 * Remove old declaration constraints from the declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const removeDeclarationConstraints = async (connection: Connection) => {
  const loggingMessage = 'Removing CONSTRAINTS declarations';

  console.info('✅ %s', loggingMessage);

  try {
    const queries = await Promise.all([
      executeSqlQuery({
        connection,
        query: `ALTER TABLE Declaration DROP CONSTRAINT Declaration_antiBribery_fkey`,
        loggingMessage: 'Removing CONSTRAINT Declaration_antiBribery_fkey from declaration table',
      }),

      executeSqlQuery({
        connection,
        query: `ALTER TABLE Declaration DROP CONSTRAINT Declaration_confirmationAndAcknowledgements_fkey`,
        loggingMessage: 'Removing CONSTRAINT Declaration_confirmationAndAcknowledgements_fkey from declaration table',
      }),

      executeSqlQuery({
        connection,
        query: `ALTER TABLE Declaration DROP CONSTRAINT Declaration_howDataWillBeUsed_fkey`,
        loggingMessage: 'Removing CONSTRAINT Declaration_howDataWillBeUsed_fkey from declaration table',
      }),
    ]);

    return queries;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

/**
 * removeDeclarationFields
 * Remove old declaration fields from the declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const removeDeclarationFields = async (connection: Connection) => {
  const loggingMessage = 'Removing FIELDS declarations';

  console.info('✅ %s', loggingMessage);

  try {
    const queries = await Promise.all([
      removeDeclarationConstraints(connection),

      removeDeclarationKeys(connection),

      executeSqlQuery({
        connection,
        query: `ALTER TABLE Declaration DROP COLUMN antiBribery`,
        loggingMessage: 'Removing FIELD antiBribery from declaration table',
      }),

      executeSqlQuery({
        connection,
        query: `ALTER TABLE Declaration DROP COLUMN confirmationAndAcknowledgements`,
        loggingMessage: 'Removing FIELD confirmationAndAcknowledgements from declaration table',
      }),

      executeSqlQuery({
        connection,
        query: `ALTER TABLE Declaration DROP COLUMN howDataWillBeUsed`,
        loggingMessage: 'Removing FIELD howDataWillBeUsed from declaration table',
      }),
    ]);

    return queries;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default removeDeclarationFields;
