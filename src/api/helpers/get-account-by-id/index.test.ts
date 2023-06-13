import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import getAccountById from '.';
import baseConfig from '../../keystone';
import accounts from '../../test-helpers/accounts';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/get-account-by-id', () => {
  let account: Account;

  beforeEach(async () => {
    account = await accounts.create(context);
  });

  it('should return an account/account by ID', async () => {
    const result = await getAccountById(context, account.id);

    expect(result.id).toEqual(account.id);
    expect(result.firstName).toEqual(account.firstName);
    expect(result.lastName).toEqual(account.lastName);
  });

  describe('when an account is not found', () => {
    beforeEach(async () => {
      // delete the account so it will not be found
      await context.query.Account.deleteOne({
        where: { id: account.id },
      });
    });

    it('should throw an error', async () => {
      try {
        await getAccountById(context, account.id);
      } catch (err) {
        const expected = new Error('Getting account by ID');
        expect(err).toEqual(expected);
      }
    });
  });
});
