import dotenv from 'dotenv';
import hasAccountUsedPasswordBefore from '.';
import createAuthenticationEntry from '../create-authentication-entry';
import accounts from '../../test-helpers/accounts';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { mockAccount } from '../../test-mocks';
import { Account, Context } from '../../types';

dotenv.config();

const { salt, hash } = mockAccount;

describe('helpers/account-has-used-password-before', () => {
  let context: Context;
  let account: Account;
  let mockEntry: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context });

    // wipe the Authentication table so we have a clean slate.
    const retries = await context.query.Authentication.findMany();

    await context.query.Authentication.deleteMany({
      where: retries,
    });

    mockEntry = {
      account: {
        connect: {
          id: account.id,
        },
      },
      salt,
      hash,
    };
  });

  afterAll(async () => {
    const retries = await context.query.Authentication.findMany();

    await context.query.Authentication.deleteMany({
      where: retries,
    });
  });

  describe('when a provided password has been used before', () => {
    it('should return true', async () => {
      const mockNewPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

      await context.db.Authentication.createOne({
        data: mockEntry,
      });

      const result = await hasAccountUsedPasswordBefore(context, account.id, mockNewPassword);

      expect(result).toEqual(true);
    });
  });

  describe('when a provided password has NOT been used before', () => {
    it('should return false', async () => {
      const mockNewPassword = `${process.env.MOCK_ACCOUNT_PASSWORD}-modified`;

      await createAuthenticationEntry(context, mockEntry);

      const result = await hasAccountUsedPasswordBefore(context, account.id, mockNewPassword);

      expect(result).toEqual(false);
    });
  });
});
