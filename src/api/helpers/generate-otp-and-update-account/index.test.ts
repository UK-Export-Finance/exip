import generateOTPAndUpdateAccount from '.';
import generate from '../generate-otp';
import accounts from '../../test-helpers/accounts';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { mockOTP } from '../../test-mocks';
import { Account, AddAndGetOtpResponse, Context } from '../../types';

describe('helpers/generate-otp-and-update-account', () => {
  let context: Context;
  let account: Account;
  let result: AddAndGetOtpResponse;

  jest.mock('../generate-otp');

  generate.otp = () => mockOTP;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    account = await accounts.create({ context });

    result = await generateOTPAndUpdateAccount(context, account.id);

    jest.clearAllMocks();

    account = await accounts.get(context, account.id);
  });

  it('should generate an OTP and save to the account', async () => {
    expect(account.otpSalt).toEqual(mockOTP.salt);
    expect(account.otpHash).toEqual(mockOTP.hash);
    expect(new Date(account.otpExpiry)).toEqual(mockOTP.expiry);
  });

  it("should update the account's isInactive flag to be false", async () => {
    expect(account.status.isInactive).toEqual(false);
  });

  it('should return the success response and securityCode', async () => {
    const expected = {
      success: true,
      securityCode: mockOTP.securityCode,
    };

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    const mockOTPError = 'Mock error';

    beforeEach(() => {
      generate.otp = () => {
        throw new Error(mockOTPError);
      };
    });

    it('should throw an error', async () => {
      try {
        await generateOTPAndUpdateAccount(context, account.id);
      } catch (error) {
        const expected = new Error(`Adding OTP to an account Error: ${mockOTPError}`);
        expect(error).toEqual(expected);
      }
    });
  });
});
