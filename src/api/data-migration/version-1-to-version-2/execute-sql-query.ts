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

    const response = await connection.query(query);

    return response;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default executeSqlQuery;
