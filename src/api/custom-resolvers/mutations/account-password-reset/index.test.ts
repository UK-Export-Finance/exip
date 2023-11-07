import accountPasswordReset from '.';
import createAuthenticationEntry from '../../../helpers/create-authentication-entry';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import { ACCOUNT, DATE_ONE_MINUTE_IN_THE_PAST } from '../../../constants';
import accounts from '../../../test-helpers/accounts';
import { mockAccount } from '../../../test-mocks';
import { Account, AccountPasswordResetVariables, Context, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import authRetries from '../../../test-helpers/auth-retries';

const { ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('custom-resolvers/account-password-reset', () => {
  let context: Context;
  let account: Account;
  let result: SuccessResponse;
  let variables: AccountPasswordResetVariables;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    // wipe the Authentication table so we have a clean slate.
    const authEntries = await context.query.Authentication.findMany();

    await context.query.Authentication.deleteMany({
      where: authEntries,
    });

    account = await accounts.create({ context });

    // create an AuthenticationRetry so we can assert it becomes wiped.
    await createAuthenticationRetryEntry(context, account.id);

    // get the latest AuthenticationRetry entries
    const retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(1);

    variables = {
      token: String(mockAccount.passwordResetHash),
      password: `${process.env.MOCK_ACCOUNT_PASSWORD}-modified`,
    };

    result = await accountPasswordReset({}, variables, context);

    account = await accounts.get(context, account.id);
  });

  afterAll(async () => {
    jest.resetAllMocks();

    await authRetries.deleteAll(context);
  });

  test('it should return success=true', () => {
    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  test(`it should wipe the account's retry entires`, async () => {
    // get the latest retries
    const retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(0);
  });

  test('it should add an authentication entry', async () => {
    const entries = await context.query.Authentication.findMany();

    expect(entries.length).toEqual(1);
  });

  test("it should update the account's salt and hash", async () => {
    // get the latest account
    account = await accounts.get(context, account.id);

    expect(account.salt).toBeDefined();
    expect(account.salt.length).toEqual(RANDOM_BYTES_SIZE * 2);
    expect(account.salt).not.toEqual(mockAccount.salt);

    expect(account.hash).toBeDefined();
    expect(account.hash.length).toEqual(KEY_LENGTH * 2);
    expect(account.hash).not.toEqual(mockAccount.hash);
  });

  test("it should nullify the account's password reset hash and expiry", async () => {
    expect(account.passwordResetHash).toEqual('');
    expect(account.passwordResetExpiry).toEqual(null);
  });

  describe('when the account is blocked', () => {
    test('it should return success=false', async () => {
      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          isBlocked: true,
        },
        query: 'id isBlocked',
      })) as Account;

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the account does not have a password reset expiry', () => {
    test('it should return success=false', async () => {
      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          isBlocked: false,
          passwordResetHash: mockAccount.passwordResetHash,
          passwordResetExpiry: null,
        },
      })) as Account;

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the account does not have a password reset hash', () => {
    test('it should return success=false', async () => {
      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          passwordResetHash: '',
        },
      })) as Account;

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe("when the account's password reset expiry is in the past", () => {
    beforeEach(async () => {
      const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          passwordResetHash: mockAccount.passwordResetHash,
          passwordResetExpiry: oneMinuteInThePast,
        },
      })) as Account;
    });

    test('it should return success=false with expired=true', async () => {
      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
        expired: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided password matches the existing account password', () => {
    test('it should return success=false and hasBeenUsedBefore=true', async () => {
      // update the account to have default test password (MOCK_ACCOUNT_PASSWORD)
      await context.query.Account.updateOne({
        where: { id: account.id },
        data: mockAccount,
      });

      // change the variables to have the same password
      variables.password = String(process.env.MOCK_ACCOUNT_PASSWORD);

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
        hasBeenUsedBefore: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided password has been used before', () => {
    test('it should return success=false and hasBeenUsedBefore=true', async () => {
      // create an account
      account = await accounts.create({ context });

      const authEntry = {
        account: {
          connect: {
            id: account.id,
          },
        },
        salt: mockAccount.salt,
        hash: mockAccount.hash,
      };

      await createAuthenticationEntry(context, authEntry);

      // change the variables to have the same password
      variables.password = String(process.env.MOCK_ACCOUNT_PASSWORD);

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
        hasBeenUsedBefore: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await accountPasswordReset({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
