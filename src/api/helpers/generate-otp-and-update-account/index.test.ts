import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import generateOTPAndUpdateAccount from '.';
import baseConfig from '../../keystone';
import generate from '../generate-otp';
import accounts from '../../test-helpers/accounts';
import { mockOTP } from '../../test-mocks';
import { Account, AddAndGetOtpResponse, Context } from '../../types';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/generate-otp-and-update-account', () => {
  let account: Account;

  jest.mock('../generate-otp');

  generate.otp = () => mockOTP;

  let result: AddAndGetOtpResponse;

  beforeEach(async () => {
    await accounts.deleteAll(context);

    account = await accounts.create({ context });

    result = await generateOTPAndUpdateAccount(context, account.id);

    jest.clearAllMocks();

    account = await accounts.get(context, account.id);
  });

  test('it should generate an OTP and save to the account', async () => {
    expect(account.otpSalt).toEqual(mockOTP.salt);
    expect(account.otpHash).toEqual(mockOTP.hash);
    expect(new Date(account.otpExpiry)).toEqual(mockOTP.expiry);
  });

  test('it should return the success response and securityCode', async () => {
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

    test('should throw an error', async () => {
      try {
        await generateOTPAndUpdateAccount(context, account.id);
      } catch (err) {
        const expected = new Error(`Adding OTP to an account Error: ${mockOTPError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
