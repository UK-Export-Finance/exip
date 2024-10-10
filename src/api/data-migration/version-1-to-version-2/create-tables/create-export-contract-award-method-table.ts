import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createExportContractAwardMethodTable
 * Create new "export contract - award method" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createExportContractAwardMethodTable = async (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - export contract award method';

  console.info('✅ %s', loggingMessage);

  try {
    const query = `
      CREATE TABLE ExportContractAwardMethod (
        id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
        value varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
        PRIMARY KEY (id)
      ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
    `;

    await executeSqlQuery({ connection, query, loggingMessage });

    const awardMethodPromises = [
      executeSqlQuery({
        connection,
        query: `INSERT INTO ExportContractAwardMethod (id, value) VALUES ('eg9qxlqw4edxa8b5mwbybsrfp', 'Open tender')`,
        loggingMessage,
      }),

      executeSqlQuery({
        connection,
        query: `INSERT INTO ExportContractAwardMethod (id, value) VALUES ('mzwp337piamg1mei7fqh1o73s', 'Negotiated contract')`,
        loggingMessage,
      }),

      executeSqlQuery({
        connection,
        query: `INSERT INTO ExportContractAwardMethod (id, value) VALUES ('qnqrle4xwsj5go8pchj31sat4', 'Direct award')`,
        loggingMessage,
      }),

      executeSqlQuery({
        connection,
        query: `INSERT INTO ExportContractAwardMethod (id, value) VALUES ('qw2hp8khykctdic2z58z70ru8', 'Competitive bidding')`,
        loggingMessage,
      }),

      executeSqlQuery({
        connection,
        query: `INSERT INTO ExportContractAwardMethod (id, value) VALUES ('tn8k8lot1bvirmztmmgq2u8hn', 'Other')`,
        loggingMessage,
      }),
    ];

    return Promise.all(awardMethodPromises);
  } catch (error) {
    console.error('🚨 error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default createExportContractAwardMethodTable;
