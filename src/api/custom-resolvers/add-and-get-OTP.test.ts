import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../keystone';
import addAndGetOTP from './add-and-get-OTP';
import generate from '../helpers/generate-otp';
import { mockAccount } from '../test-mocks';
import { Account, AddAndGetOtpResponseResponse } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/add-and-get-OTP', () => {
  let account: Account;

  jest.mock('../helpers/generate-otp');

  const mockOtp = {
    securityCode: '123456',
    salt: 'mockSalt',
    hash: 'mockHash',
    expiry: new Date(),
  };

  generate.otp = () => mockOtp;

  const variables = {
    email: mockAccount.email,
  };

  let result: AddAndGetOtpResponseResponse;

  beforeAll(async () => {
    // wipe the table so we have a clean slate.
    const exporters = await context.query.Exporter.findMany();

    await context.query.Exporter.deleteMany({
      where: exporters,
    });

    // create a new exporter
    account = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id email',
    })) as Account;

    result = await addAndGetOTP({}, variables, context);

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

  it('should return success=true with OTP security code', async () => {
    const expected = {
      success: true,
      securityCode: mockOtp.securityCode,
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
        const expected = new Error(`Adding OTP to exporter account (addAndGetOTP mutation) Error: Adding OTP to exporter account Error: ${mockOTPError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
