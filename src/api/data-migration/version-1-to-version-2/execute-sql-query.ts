import { Connection } from 'mysql2/promise';

interface ExecuteSqlQueryParams {
  connection: Connection;
  query: string;
  loggingMessage: string;
}

/**
 * Execute a SQL query.
 * @param {Connection} connection: SQL database connection
 * @param {String} query: SQL query
 * @param {String} loggingMessage: Logging message
 * @returns {Array} The result of connection.query()
 */
const executeSqlQuery = async ({ connection, query, loggingMessage }: ExecuteSqlQueryParams) => {
  try {
    console.info(`✅ ${loggingMessage}`);

    /**
     * Check that the connection is a valid database connection.
     * If not, this is very useful for debugging.
     * Otherwise, a generic "cannot query" style error is logged.
     */
    if (!connection.query || typeof connection.query !== 'function') {
      console.error(`🚨 Invalid connection passed to executeSqlQuery (${loggingMessage})`);

      throw new Error(`🚨 Invalid connection passed to executeSqlQuery (${loggingMessage})`);
    }

    const response = await connection.query(query);

    return response;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default executeSqlQuery;
