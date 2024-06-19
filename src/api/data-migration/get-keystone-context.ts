import dotenv from 'dotenv';
import { getContext } from '@keystone-6/core/context';
import config from '../keystone';
import * as PrismaModule from '.prisma/client';

dotenv.config();

const DB_URL = String(process.env.DATABASE_URL);

const getKeystoneContext = async () => {
  console.info('✅ Getting keystone context');

  try {
    const context = await getContext({ ...config, db: { ...config.db, url: DB_URL } }, PrismaModule);

    return context;
  } catch (err) {
    console.info('error keystone context %O', err);

    throw new Error(`error keystone context ${err}`);
  }
};

export default getKeystoneContext;
