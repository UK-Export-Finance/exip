import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../keystone';
import addAndGetOTP from './add-and-get-OTP';
import generate from '../helpers/generate-otp';
import { mockAccount, mockOTP } from '../test-mocks';
import { Account, AddAndGetOtpResponse } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/add-and-get-OTP', () => {
  let account: Account;

  jest.mock('../helpers/generate-otp');

  generate.otp = () => mockOTP;

  const variables = {
    email: mockAccount.email,
  };

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
      query: 'id email',
    })) as Account;

    result = await addAndGetOTP({}, variables, context);

    account = (await context.query.Exporter.findOne({
      where: { id: account.id },
      query: 'otpSalt otpHash otpExpiry',
    })) as Account;
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
        const expected = new Error(`Adding OTP to exporter account (addAndGetOTP mutation) Error: Adding OTP to exporter account Error: ${mockOTPError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
