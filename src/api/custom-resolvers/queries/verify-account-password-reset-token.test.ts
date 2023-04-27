import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { subMinutes } from 'date-fns';
import baseConfig from '../../keystone';
import verifyAccountPasswordResetToken from './verify-account-password-reset-token';
import { FIELD_IDS } from '../../constants';
import { mockAccount } from '../../test-mocks';
import { Account, AddAndGetOtpResponse } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

dotenv.config();

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

const context = getContext(config, PrismaModule) as Context;

const {
  ACCOUNT: { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY },
} = FIELD_IDS.INSURANCE;

describe('custom-resolvers/verify-account-password-reset-token', () => {
  let account: Account;

  const variables = {
    token: mockAccount[PASSWORD_RESET_HASH],
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
      query: 'id',
    })) as Account;

    result = await verifyAccountPasswordResetToken({}, variables, context);
  });

  it('should return success=true', () => {
    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  describe(`when the account does not have ${PASSWORD_RESET_HASH}`, () => {
    test('it should return success=false', async () => {
      // update the account so it does not have a PASSWORD_RESET_HASH
      await context.query.Exporter.updateOne({
        where: { id: account.id },
        data: {
          [PASSWORD_RESET_HASH]: '',
        },
      });

      result = await verifyAccountPasswordResetToken({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the account's ${PASSWORD_RESET_EXPIRY} has expired`, () => {
    test('it should return success=false and expired=true', async () => {
      const today = new Date();

      const previousTime = subMinutes(today, 6);

      // update the account so PASSWORD_RESET_EXPIRY is expired
      await context.query.Exporter.updateOne({
        where: { id: account.id },
        data: {
          [PASSWORD_RESET_EXPIRY]: previousTime,
        },
      });

      result = await verifyAccountPasswordResetToken({}, variables, context);

      const expected = {
        expired: true,
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const exporters = await context.query.Exporter.findMany();

      await context.query.Exporter.deleteMany({
        where: exporters,
      });

      result = await verifyAccountPasswordResetToken({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
