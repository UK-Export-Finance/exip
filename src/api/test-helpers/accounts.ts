import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { Context } from '.keystone/types'; // eslint-disable-line
import baseConfig from '../keystone';

dotenv.config();

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

const context = getContext(config, PrismaModule) as Context;

/**
 * deleteAll test helper
 * Get all accounts and delete them.
 * @param {Array} Accounts that have been deleted
 */
const deleteAll = async () => {
  try {
    console.info('Getting and deleting accounts (test helpers)');

    const accounts = await context.query.Account.findMany();

    const response = await context.query.Account.deleteMany({
      where: accounts,
    });

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting accounts (test helpers) ${err}`);
  }
};

const accounts = {
  deleteAll,
};

export default accounts;
