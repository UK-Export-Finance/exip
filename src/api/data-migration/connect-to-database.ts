import dotenv from 'dotenv';
import mysql, { Connection } from 'mysql2/promise';

dotenv.config();

/**
 * connectToDatabase
 * Connect to the SQL database
 * @returns {Connection} SQL database connection
 */
const connectToDatabase = async () => {
  console.info('✅ Connecting to database');

  try {
    const connection = (await mysql.createConnection({
      host: '127.0.0.1',
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'exip',
      port: Number(process.env.DATABASE_PORT),
    })) as Connection;

    return connection;
  } catch (error) {
    console.info('🚨 error connecting to database %o', error);

    throw new Error(`🚨 error connecting to database ${error}`);
  }
};

export default connectToDatabase;
