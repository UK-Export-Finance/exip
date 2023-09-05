import addAndGetOTP from '.';
import generate from '../../../helpers/generate-otp';
import accounts from '../../../test-helpers/accounts';
import { mockAccount, mockOTP } from '../../../test-mocks';
import { Account, AddAndGetOtpResponse, Context } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

describe('custom-resolvers/add-and-get-OTP', () => {
  let context: Context;
  let account: Account;

  jest.mock('../../../helpers/generate-otp');

  generate.otp = () => mockOTP;

  const variables = {
    email: mockAccount.email,
  };

  let result: AddAndGetOtpResponse;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    account = await accounts.create({ context });

    result = await addAndGetOTP({}, variables, context);

    account = await accounts.get(context, account.id);
  });

  test('it should generate an OTP and save to the account', () => {
    expect(account.otpSalt).toEqual(mockOTP.salt);
    expect(account.otpHash).toEqual(mockOTP.hash);
    // @ts-ignore
    expect(new Date(account.otpExpiry)).toEqual(mockOTP.expiry);
  });

  it('should return success=true with OTP security code', () => {
    const expected = {
      success: true,
      securityCode: mockOTP.securityCode,
    };

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    const mockOTPError = 'Generating OTP';

    beforeEach(() => {
      generate.otp = () => {
        throw new Error(mockOTPError);
      };
    });

    test('should throw an error', async () => {
      try {
        await addAndGetOTP({}, variables, context);
      } catch (err) {
        const expected = new Error(`Adding OTP to an account (addAndGetOTP mutation) Error: Adding OTP to an account Error: ${mockOTPError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
