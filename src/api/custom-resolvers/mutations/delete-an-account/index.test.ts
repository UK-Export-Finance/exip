import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import deleteAnAccount from '.';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import baseConfig from '../../../keystone';
import accounts from '../../../test-helpers/accounts';
import { mockAccount } from '../../../test-mocks';
import { Account, SuccessResponse } from '../../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/delete-an-account', () => {
  let account: Account;
  let result: SuccessResponse;

  const variables = {
    email: mockAccount.email,
  };

  beforeAll(async () => {
    await accounts.deleteAll();

    // create an account
    account = (await context.query.Account.createOne({
      data: mockAccount,
    })) as Account;
  });

  test('it should return success=true', async () => {
    result = await deleteAnAccount({}, variables, context);

    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  describe('when an account has authentication retries', () => {
    let retries;

    beforeEach(async () => {
      // create an account
      account = (await context.query.Account.createOne({
        data: mockAccount,
      })) as Account;

      // wipe the table so we have a clean slate.
      retries = await context.query.AuthenticationRetry.findMany();

      await context.query.AuthenticationRetry.deleteMany({
        where: retries,
      });

      // create new retry entires
      await createAuthenticationRetryEntry(context, account.id);
      await createAuthenticationRetryEntry(context, account.id);

      // get the latest retries to make sure we only have 2 entries
      retries = await context.query.AuthenticationRetry.findMany();

      expect(retries.length).toEqual(2);
    });

    test('it should delete the retries', async () => {
      result = await deleteAnAccount({}, variables, context);

      retries = await context.query.AuthenticationRetry.findMany();

      expect(retries.length).toEqual(0);
    });
  });

  describe('when an account is not found', () => {
    it('should return success=false', async () => {
      const accountEmailDoesNotExist = String(process.env.GOV_NOTIFY_EMAIL_RECIPIENT_2);

      variables.email = accountEmailDoesNotExist;

      result = await deleteAnAccount({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });
});
