import mysql, { Connection } from 'mysql2/promise';

const connectToDatabase = async () => {
  console.info('✅ Connecting to database');

  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      database: 'exip-migration',
      port: 3306,
    }) as Connection;

    return connection;
  } catch (err) {
    console.info('🚨 error connecting to database %O', err);

    throw new Error(`🚨 error connecting to database ${err}`);
  }
};

export default connectToDatabase;
