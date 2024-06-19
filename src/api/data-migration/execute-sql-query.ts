import { Connection } from 'mysql2/promise';

interface ExecuteSqlQueryParams {
  connection: Connection;
  query: string;
  loggingMessage: string
}

const executeSqlQuery = async ({ connection, query, loggingMessage }: ExecuteSqlQueryParams ) => {
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
