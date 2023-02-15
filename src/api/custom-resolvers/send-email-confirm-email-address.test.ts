import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import sendEmailConfirmEmailAddress from './send-email-confirm-email-address';
import baseConfig from '../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import sendEmail from '../emails';
import { mockAccount } from '../test-mocks';
import { Account, SendEmailConfirmEmailAddressVariables } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/send-email-confirm-email-address', () => {
  let exporter: Account;
  let variables: SendEmailConfirmEmailAddressVariables;

  jest.mock('../emails');

  const sendEmailResponse = { success: true, emailRecipient: mockAccount.email };

  const sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(sendEmailResponse));

  beforeAll(async () => {
    sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

    exporter = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id firstName lastName email salt hash verificationHash',
    })) as Account;

    variables = {
      exporterId: exporter.id,
    };
  });

  test('it should call sendEmail.confirmEmailAddress and return success=true', async () => {
    const result = await sendEmailConfirmEmailAddress({}, variables, context);

    const { email, firstName, verificationHash } = exporter;

    // called twice during exporter creation and then calling the mutation
    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(2);
    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, firstName, verificationHash);

    const expected = {
      success: true,
      emailRecipient: mockAccount.email,
    };

    expect(result).toEqual(expected);
  });

  describe('when no exporter is found', () => {
    test('it should return success=false', async () => {
      // delete the exporter
      await context.query.Exporter.deleteOne({
        where: { id: exporter.id },
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
        expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${sendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
