import { ACCOUNT, FIELD_IDS } from '../../../constants';
import accountSignIn from '.';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import generate from '../../../helpers/generate-otp';
import sendEmail from '../../../emails';
import accountChecks from './account-checks';
import accounts from '../../../test-helpers/accounts';
import { mockAccount, mockOTP, mockSendEmailResponse, mockUrlOrigin } from '../../../test-mocks';
import { Account, AccountSignInResponse, ApplicationRelationship } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const context = getKeystoneContext();

const { PASSWORD } = FIELD_IDS.INSURANCE.ACCOUNT;

const { MAX_AUTH_RETRIES } = ACCOUNT;

describe('custom-resolvers/account-sign-in', () => {
  let account: Account;
  let retries: Array<ApplicationRelationship>;

  generate.otp = () => mockOTP;

  const securityCodeEmailSpy = jest.fn();

  const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

  const variables = {
    urlOrigin: mockUrlOrigin,
    email: mockAccount.email,
    password: mockPassword,
  };

  afterAll(() => {
    jest.resetAllMocks();
  });

  let result: AccountSignInResponse;

  beforeAll(async () => {
    await accounts.deleteAll(context);

    // wipe the AuthenticationRetry table so we have a clean slate.
    retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

    await context.query.AuthenticationRetry.deleteMany({
      where: retries,
    });
  });

  describe('when the provided password is valid and the account is found and verified', () => {
    beforeEach(async () => {
      await accounts.deleteAll(context);

      // wipe the AuthenticationRetry table so we have a clean slate.
      retries = await context.query.AuthenticationRetry.findMany();

      await context.query.AuthenticationRetry.deleteMany({
        where: retries,
      });

      account = await accounts.create({ context });

      result = await accountSignIn({}, variables, context);
    });

    test('it should return the result of accountChecks', async () => {
      account = await accounts.get(context, account.id);

      const expected = await accountChecks(context, account, mockUrlOrigin);

      expect(result).toEqual(expected);
    });

    test('it should NOT add an authentication retry entry', async () => {
      retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

      expect(retries.length).toEqual(0);
    });

    it('it should NOT mark the account as isBlocked=true', async () => {
      // get the latest account
      account = await accounts.get(context, account.id);

      expect(account.isBlocked).toEqual(false);
    });
  });

  describe('when the provided password is invalid', () => {
    beforeEach(async () => {
      await accounts.deleteAll(context);

      // wipe the AuthenticationRetry table so we have a clean slate.
      retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

      await context.query.AuthenticationRetry.deleteMany({
        where: retries,
      });

      account = await accounts.create({ context });

      result = await accountSignIn({}, variables, context);

      variables[PASSWORD] = `${mockPassword}-incorrect`;
    });

    afterAll(() => {
      variables[PASSWORD] = mockPassword;
    });

    test('it should return success=false', async () => {
      result = await accountSignIn({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });

    test('it should add an authentication retry entry', async () => {
      // get the latest retries
      retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

      expect(retries.length).toEqual(1);
    });

    describe(`when the account has ${MAX_AUTH_RETRIES} entries in the AuthenticationRetry table`, () => {
      beforeEach(async () => {
        await accounts.deleteAll(context);

        // create a new account and ensure it is not blocked so that we have a clean slate.
        const unblockedAccount = {
          ...mockAccount,
          isBlocked: false,
        };

        account = await accounts.create({ context, accountData: unblockedAccount });

        // wipe the AuthenticationRetry table so we have a clean slate.
        retries = await context.query.AuthenticationRetry.findMany();

        await context.query.AuthenticationRetry.deleteMany({
          where: retries,
        });

        // generate an array of promises to create retry entries
        const entriesToCreate = [...Array(MAX_AUTH_RETRIES)].map(async () => createAuthenticationRetryEntry(context, account.id));

        await Promise.all(entriesToCreate);

        result = await accountSignIn({}, variables, context);
      });

      test('it should return success=false, isBlocked=true and accountId', async () => {
        const expected = {
          success: false,
          isBlocked: true,
          accountId: account.id,
        };

        expect(result).toEqual(expected);
      });

      test('it should mark the account as isBlocked=true', async () => {
        // get the latest account
        account = await accounts.get(context, account.id);

        expect(account.isBlocked).toEqual(true);
      });
    });

    describe('when the account is blocked', () => {
      beforeEach(async () => {
        await accounts.deleteAll(context);

        account = await accounts.create({ context });

        account = (await context.query.Account.updateOne({
          where: { id: account.id },
          data: {
            isBlocked: true,
          },
        })) as Account;

        result = await accountSignIn({}, variables, context);
      });

      test('it should return success=false, isBlocked=true and accountId', async () => {
        const expected = {
          success: false,
          isBlocked: true,
          accountId: account.id,
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await accountSignIn({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.securityCodeEmail = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await accountSignIn({}, variables, context);
      } catch (err) {
        expect(securityCodeEmailSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(`Validating password or sending email for account sign in (accountSignIn mutation) ${mockSendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
