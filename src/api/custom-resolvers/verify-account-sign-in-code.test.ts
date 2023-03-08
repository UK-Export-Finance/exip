import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import { subMinutes } from 'date-fns';
import verifyAccountSignInCode from './verify-account-sign-in-code';
import create from '../helpers/create-jwt';
import { ACCOUNT } from '../constants';
import getExporterById from '../helpers/get-exporter-by-id';
import generate from '../helpers/generate-otp';
import generateOTPAndUpdateAccount from '../helpers/generate-otp-and-update-account';
import baseConfig from '../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { mockAccount } from '../test-mocks';
import { Account, VerifyAccountSignInCodeVariables, VerifyAccountSignInCodeResponse } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const {
  JWT: {
    TOKEN: { EXPIRY },
  },
} = ACCOUNT;

describe('custom-resolvers/verify-account-sign-in-code', () => {
  let exporter: Account;
  let updatedExporter: Account;
  let variables: VerifyAccountSignInCodeVariables;
  let result: VerifyAccountSignInCodeResponse;

  jest.mock('../helpers/create-jwt');

  const mockJWT = {
    token: `Bearer 123-MOCK`,
    expires: EXPIRY,
    sessionIdentifier: '1234',
  };

  create.JWT = () => mockJWT;

  beforeEach(async () => {
    // create an account
    exporter = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id firstName lastName email salt hash verificationHash sessionExpiry',
    })) as Account;

    // generate OTP and update the account
    const { securityCode } = await generateOTPAndUpdateAccount(context, exporter.id);

    variables = {
      accountId: exporter.id,
      securityCode,
    };

    result = await verifyAccountSignInCode({}, variables, context);

    updatedExporter = await getExporterById(context, exporter.id);
  });

  afterEach(async () => {
    await context.query.Exporter.deleteOne({
      where: { id: exporter.id },
    });
  });

  test('it should return success=true', async () => {
    expect(result.success).toEqual(true);
  });

  test('it should return account details', async () => {
    expect(result.accountId).toEqual(exporter.id);
    expect(result.firstName).toEqual(exporter.firstName);
    expect(result.lastName).toEqual(exporter.lastName);
  });

  test('it should return JWT', async () => {
    expect(result.token).toEqual(mockJWT.token);
    expect(result.sessionIdentifier).toEqual(mockJWT.sessionIdentifier);
  });

  it('should save a session identifier', () => {
    expect(updatedExporter.sessionIdentifier).toEqual(mockJWT.sessionIdentifier);

    expect(typeof updatedExporter.sessionExpiry).toEqual('object');
  });

  describe('session expiry date', () => {
    const now = new Date();

    const hours = 8;
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
      const expiry = new Date(updatedExporter.sessionExpiry);

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

  it("should nullify thhe account's OTP fields", () => {
    expect(updatedExporter.otpSalt).toEqual('');
    expect(updatedExporter.otpHash).toEqual('');
    expect(updatedExporter.otpExpiry).toEqual(null);
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

  describe('when no exporter is found', () => {
    test('it should return success=false', async () => {
      // no need to delete here - exporter is (correctly) already deleted due to afterEach()

      result = await verifyAccountSignInCode({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the exporter's OTP has expired`, () => {
    beforeAll(async () => {
      // create an account
      exporter = (await context.query.Exporter.createOne({
        data: mockAccount,
        query: 'id firstName lastName email salt hash verificationHash otpExpiry',
      })) as Account;
    });

    test('it should return success=false and expired=true', async () => {
      const otp = generate.otp();

      // add OTP to the account
      const { salt, hash } = otp;

      const today = new Date();

      const previousTime = subMinutes(today, 6);

      // update the account
      const updateResponse = await context.db.Exporter.updateOne({
        where: { id: exporter.id },
        data: {
          otpSalt: salt,
          otpHash: hash,
          otpExpiry: previousTime,
        },
      });

      // update variables
      updatedExporter = {
        ...exporter,
        ...updateResponse,
      } as Account;

      variables = {
        accountId: updatedExporter.id,
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

  describe('when the exporter does not have OTP salt, hash or expiry', () => {
    test('it should return success=false', async () => {
      // create an account
      exporter = (await context.query.Exporter.createOne({
        data: mockAccount,
        query: 'id firstName lastName email salt hash verificationHash',
      })) as Account;

      result = await verifyAccountSignInCode({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
