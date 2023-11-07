import verifyAccountSignInCode from '.';
import create from '../../../helpers/create-jwt';
import { ACCOUNT } from '../../../constants';
import getAccountById from '../../../helpers/get-account-by-id';
import generate from '../../../helpers/generate-otp';
import generateOTPAndUpdateAccount from '../../../helpers/generate-otp-and-update-account';
import accounts from '../../../test-helpers/accounts';
import authRetries from '../../../test-helpers/auth-retries';
import { Account, Context, VerifyAccountSignInCodeVariables, VerifyAccountSignInCodeResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const {
  JWT: {
    TOKEN: { EXPIRY },
  },
} = ACCOUNT;

describe('custom-resolvers/verify-account-sign-in-code', () => {
  let context: Context;
  let account: Account;
  let updatedAccount: Account;
  let variables: VerifyAccountSignInCodeVariables;
  let result: VerifyAccountSignInCodeResponse;

  jest.mock('../../../helpers/create-jwt');

  const mockJWT = {
    token: `Bearer 123-MOCK`,
    expires: EXPIRY,
    sessionIdentifier: '1234',
  };

  create.JWT = () => mockJWT;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    account = await accounts.create({ context });

    await authRetries.deleteAll(context);

    // generate OTP and update the account
    const { securityCode } = await generateOTPAndUpdateAccount(context, account.id);

    variables = {
      accountId: account.id,
      securityCode,
    };

    result = await verifyAccountSignInCode({}, variables, context);

    updatedAccount = await getAccountById(context, account.id);
  });

  afterEach(async () => {
    await context.query.Account.deleteOne({
      where: { id: account.id },
    });
  });

  test('it should return success=true', async () => {
    expect(result.success).toEqual(true);
  });

  test('it should return account details', async () => {
    expect(result.accountId).toEqual(account.id);
    expect(result.firstName).toEqual(account.firstName);
    expect(result.lastName).toEqual(account.lastName);
  });

  test('it should return JWT', async () => {
    expect(result.token).toEqual(mockJWT.token);
    expect(result.sessionIdentifier).toEqual(mockJWT.sessionIdentifier);
  });

  test(`it should wipe the account's retry entires`, async () => {
    const retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(0);
  });

  it('should save a session identifier', () => {
    expect(updatedAccount.sessionIdentifier).toEqual(mockJWT.sessionIdentifier);

    expect(typeof updatedAccount.sessionExpiry).toEqual('object');
  });

  describe('session expiry date', () => {
    const now = new Date();

    const hours = 12;
    const expected = new Date(now.getTime() + hours * 60 * 60 * 1000);

    const expectedDay = expected.getDay();
    const expectedMonth = expected.getMonth();
    const expectedYear = expected.getFullYear();
    const expectedHours = expected.getHours();

    it('should be returned', () => {
      const expiry = new Date(String(result.expires));

      const expiryDay = expiry.getDay();
      const expiryMonth = expiry.getMonth();
      const expiryYear = expiry.getFullYear();
      const expiryHours = expiry.getHours();

      expect(expiryDay).toEqual(expectedDay);
      expect(expiryMonth).toEqual(expectedMonth);
      expect(expiryYear).toEqual(expectedYear);
      expect(expiryHours).toEqual(expectedHours);
    });

    it('should save a session expiry date to the account', () => {
      const expiry = new Date(updatedAccount.sessionExpiry);

      const expiryDay = expiry.getDay();
      const expiryMonth = expiry.getMonth();
      const expiryYear = expiry.getFullYear();
      const expiryHours = expiry.getHours();

      expect(expiryDay).toEqual(expectedDay);
      expect(expiryMonth).toEqual(expectedMonth);
      expect(expiryYear).toEqual(expectedYear);
      expect(expiryHours).toEqual(expectedHours);
    });
  });

  it("should nullify the account's OTP fields", () => {
    expect(updatedAccount.otpSalt).toEqual('');
    expect(updatedAccount.otpHash).toEqual('');
    expect(updatedAccount.otpExpiry).toEqual(null);
  });

  describe('when the provided sign in code is invalid', () => {
    it('should return success=false', async () => {
      variables = {
        ...variables,
        securityCode: '1',
      };

      result = await verifyAccountSignInCode({}, variables, context);

      expect(result.success).toEqual(false);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // no need to delete here - account is (correctly) already deleted due to afterEach()

      result = await verifyAccountSignInCode({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the account's OTP has expired`, () => {
    beforeAll(async () => {
      account = await accounts.create({ context });
    });

    const otp = generate.otp();
    test('it should return success=false and expired=true', async () => {
      // add OTP to the account
      const { salt, hash } = otp;

      const now = new Date();

      // update the OTP expiry to be outside of the expiration time
      const minutes = 31;

      const previousTime = new Date(now.getTime() - minutes * 60000);

      // update the account
      const updateResponse = await context.db.Account.updateOne({
        where: { id: account.id },
        data: {
          otpSalt: salt,
          otpHash: hash,
          otpExpiry: previousTime,
        },
      });

      // update variables
      updatedAccount = {
        ...account,
        ...updateResponse,
      } as Account;

      variables = {
        accountId: updatedAccount.id,
        securityCode: '1',
      };

      result = await verifyAccountSignInCode({}, variables, context);

      const expected = {
        success: false,
        expired: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the account does not have OTP salt, hash or expiry', () => {
    test('it should return success=false', async () => {
      account = await accounts.create({ context });

      result = await verifyAccountSignInCode({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
