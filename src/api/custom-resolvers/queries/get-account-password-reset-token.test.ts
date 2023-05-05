import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../../keystone';
import getAccountPasswordResetToken from './get-account-password-reset-token';
import { FIELD_IDS } from '../../constants';
import { mockAccount } from '../../test-mocks';
import { Account, AddAndGetOtpResponse } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

dotenv.config();

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

const context = getContext(config, PrismaModule) as Context;

const {
  ACCOUNT: { PASSWORD_RESET_HASH },
} = FIELD_IDS.INSURANCE;

describe('custom-resolvers/get-account-password-reset-token', () => {
  let account: Account;

  const variables = {
    email: mockAccount.email,
  };

  let result: AddAndGetOtpResponse;

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // create a new account
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id email',
    })) as Account;

    result = await getAccountPasswordResetToken({}, variables, context);
  });

  it('should return success=true with token', () => {
    const expected = {
      success: true,
      token: mockAccount[PASSWORD_RESET_HASH],
    };

    expect(result).toEqual(expected);
  });

  describe(`when the account does not have ${PASSWORD_RESET_HASH}`, () => {
    test('it should return success=false', async () => {
      // update the account so it does not have a PASSWORD_RESET_HASH
      await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          [PASSWORD_RESET_HASH]: '',
        },
      });

      result = await getAccountPasswordResetToken({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const accounts = await context.query.Account.findMany();

      await context.query.Account.deleteMany({
        where: accounts,
      });

      result = await getAccountPasswordResetToken({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
