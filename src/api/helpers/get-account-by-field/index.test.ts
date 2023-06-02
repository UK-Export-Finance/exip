import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import getAccountByField from '.';
import baseConfig from '../../keystone';
import { mockAccount } from '../../test-mocks';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/get-account-by-field', () => {
  let account: Account;

  const field = 'firstName';
  const value = mockAccount.firstName;

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // create a new account
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id firstName lastName',
    })) as Account;
  });

  it('should return an account by ID', async () => {
    const result = (await getAccountByField(context, field, value)) as Account;

    expect(result.id).toEqual(account.id);
    expect(result.firstName).toEqual(account.firstName);
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
        await getAccountByField(context, field, value);
      } catch (err) {
        const errorMessage = 'Getting account by field/value';

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
