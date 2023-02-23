import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import verifyAccountSignInCode from './verify-account-sign-in-code';
import generate from '../helpers/generate-otp';
import baseConfig from '../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { mockAccount } from '../test-mocks';
import { Account, VerifyAccountSignInCodeVariables, VerifyAccountSignInCodeResponse } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/verify-account-sign-in-code', () => {
  let exporter: Account;
  let updatedExporter: Account;
  let variables: VerifyAccountSignInCodeVariables;
  let result: VerifyAccountSignInCodeResponse;

  beforeEach(async () => {
    // create an account
    exporter = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id firstName lastName email salt hash verificationHash',
    })) as Account;

    // generate a OTP
    const otp = generate.otp();

    // add OTP to the account
    const { securityCode, salt, hash, expiry } = otp;

    await context.db.Exporter.updateOne({
      where: { id: exporter.id },
      data: {
        otpSalt: salt,
        otpHash: hash,
        otpExpiry: expiry,
      },
    });

    variables = {
      accountId: exporter.id,
      securityCode,
    };

    result = await verifyAccountSignInCode({}, variables, context);

    updatedExporter = (await context.db.Exporter.findOne({
      where: { id: exporter.id },
    })) as Account;
  });

  test('it should return success=true', async () => {
    expect(result.success).toEqual(true);
  });

  test('it should return account details', async () => {
    expect(result.accountId).toEqual(exporter.id);
    expect(result.firstName).toEqual(exporter.firstName);
    expect(result.lastName).toEqual(exporter.lastName);
  });

  // TODO transform createJWT into module like OTP so we can stub it and test actual generation.
  test('it should return JWT', async () => {
    expect(typeof result.token).toEqual('string');
    expect(typeof result.expires).toEqual('string');
    expect(typeof result.sessionIdentifier).toEqual('string');
  });

  it('should save a session identifier', () => {
    expect(typeof updatedExporter.sessionIdentifier).toEqual('string');

    expect(typeof updatedExporter.sessionExpiry).toEqual('object');
  });

  it('should save a session expiry date to the account', () => {
    const now = new Date();

    const nowDay = now.getDay();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const nowHours = now.getHours();

    const expiry = new Date(updatedExporter.sessionExpiry);

    const expiryDay = expiry.getDay();
    const expiryMonth = expiry.getMonth();
    const expiryYear = expiry.getFullYear();
    const expiryHours = expiry.getHours();

    expect(expiryDay).toEqual(nowDay);
    expect(expiryMonth).toEqual(nowMonth);
    expect(expiryYear).toEqual(nowYear);
    expect(expiryHours).toEqual(nowHours + 8);
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
      // delete the exporter
      await context.query.Exporter.deleteOne({
        where: { id: exporter.id },
      });

      result = await verifyAccountSignInCode({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
