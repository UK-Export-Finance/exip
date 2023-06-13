import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../keystone';
import { Context } from '.keystone/types'; // eslint-disable-line import/no-extraneous-dependencies

dotenv.config();

const DB_URL = String(process.env.DATABASE_URL);

/**
 * getKeystoneContext test helper
 * Get KeystoneJS context API
 * @param {Object} KeystoneJS context API
 * @returns {Object} KeystoneJS context API
 */
const getKeystoneContext = () => {
  const config = { ...baseConfig, db: { ...baseConfig.db, url: DB_URL } };

  const context = getContext(config, PrismaModule) as Context;

  return context;
};

export default getKeystoneContext;
