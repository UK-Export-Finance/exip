import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import sendEmailConfirmEmailAddress from './send-email-confirm-email-address';
import baseConfig from '../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import sendEmail from '../emails';
import { mockAccount } from '../test-mocks';
import { Account, SendExporterEmailVariables } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/send-email-confirm-email-address', () => {
  let exporter: Account;
  let variables: SendExporterEmailVariables;

  jest.mock('../emails');

  const sendEmailResponse = { success: true, emailRecipient: mockAccount.email };

  let sendEmailConfirmEmailAddressSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    exporter = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id firstName lastName email salt hash verificationHash',
    })) as Account;

    variables = {
      exporterId: exporter.id,
    };

    jest.resetAllMocks();

    sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(sendEmailResponse));

    sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;
  });

  test('it should call sendEmail.confirmEmailAddress and return success=true', async () => {
    const result = await sendEmailConfirmEmailAddress({}, variables, context);

    const { email, firstName, verificationHash } = exporter;

    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, firstName, verificationHash);

    const expected = {
      success: true,
      emailRecipient: mockAccount.email,
    };

    expect(result).toEqual(expected);
  });

  describe('when no exporter is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const exporters = await context.query.Exporter.findMany();

      await context.query.Exporter.deleteMany({
        where: exporters,
      });

      const result = await sendEmailConfirmEmailAddress({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.confirmEmailAddress = jest.fn(() => Promise.reject(sendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendEmailConfirmEmailAddress({}, variables, context);
      } catch (err) {
        const expected = new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${sendEmailResponse}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
