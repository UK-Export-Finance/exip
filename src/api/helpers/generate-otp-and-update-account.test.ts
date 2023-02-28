import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import generateOTPAndUpdateAccount from './generate-otp-and-update-account';
import baseConfig from '../keystone';
import generate from './generate-otp';
import { mockAccount } from '../test-mocks';
import { Account, AddAndGetOtpResponse } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/generate-otp-and-update-account', () => {
  let account: Account;

  jest.mock('./generate-otp');

  const mockOtp = {
    securityCode: '123456',
    salt: 'mockSalt',
    hash: 'mockHash',
    expiry: new Date(),
  };

  generate.otp = () => mockOtp;

  let result: AddAndGetOtpResponse;

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const exporters = await context.query.Exporter.findMany();

    await context.query.Exporter.deleteMany({
      where: exporters,
    });

    // create a new exporter
    account = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id firstName lastName email salt hash verificationHash',
    })) as Account;

    result = await generateOTPAndUpdateAccount(context, account.id);

    jest.clearAllMocks();

    account = (await context.query.Exporter.findOne({
      where: { id: account.id },
      query: 'otpSalt otpHash otpExpiry',
    })) as Account;
  });

  test('it should generate an OTP and save to the account', async () => {
    expect(account.otpSalt).toEqual(mockOtp.salt);
    expect(account.otpHash).toEqual(mockOtp.hash);
    // @ts-ignore
    expect(new Date(account.otpExpiry)).toEqual(mockOtp.expiry);
  });

  test('it should return the success response and securityCode', async () => {
    const expected = {
      success: true,
      securityCode: mockOtp.securityCode,
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
        const expected = new Error(`Adding OTP to exporter account Error: ${mockOTPError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
