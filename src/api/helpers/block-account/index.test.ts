import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import blockAccount from '.';
import baseConfig from '../../keystone';
import accounts from '../../test-helpers/accounts';
import { mockAccount } from '../../test-mocks';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/block-account', () => {
  let account: Account;
  let result: boolean;

  beforeAll(async () => {
    const unblockedAccount = {
      ...mockAccount,
      isBlocked: false,
    };

    account = await accounts.create(context, unblockedAccount);

    result = await blockAccount(context, account.id);
  });

  test('it should update an account to be blocked', async () => {
    account = (await context.query.Account.findOne({
      where: {
        id: account.id,
      },
      query: 'id isBlocked',
    })) as Account;

    expect(account.isBlocked).toEqual(true);
  });

  test('it should return true', async () => {
    expect(result).toEqual(true);
  });

  describe('when an account is NOT updated - invalid ID', () => {
    test('it should throw an error', async () => {
      const invalidId = 'invalidId';

      try {
        await blockAccount(context, invalidId);
      } catch (err) {
        const expected = new Error('Blocking account Input error: Only a cuid can be passed to id filters');
        expect(err).toEqual(expected);
      }
    });
  });

  describe('when an account is NOT updated - account not found', () => {
    test('it should throw an error', async () => {
      await accounts.deleteAll(context);

      try {
        await blockAccount(context, account.id);
      } catch (err) {
        const expected = new Error('Blocking account Access denied: You cannot update that Account - it may not exist');
        expect(err).toEqual(expected);
      }
    });
  });
});
