import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import sendEmailConfirmEmailAddressMutation from './send-email-confirm-email-address';
import baseConfig from '../../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import getFullNameString from '../../helpers/get-full-name-string';
import sendEmail from '../../emails';
import { mockAccount, mockSendEmailResponse } from '../../test-mocks';
import { Account, SendExporterEmailVariables } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/send-email-confirm-email-address', () => {
  let account: Account;
  let variables: SendExporterEmailVariables;

  jest.mock('../../emails');

  let sendConfirmEmailAddressEmailSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id firstName lastName email salt hash verificationHash',
    })) as Account;

    variables = {
      urlOrigin: 'https://mock-origin.com',
      accountId: account.id,
    };

    jest.resetAllMocks();

    sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.confirmEmailAddress = sendConfirmEmailAddressEmailSpy;
  });

  test('it should call sendEmail.confirmEmailAddress and return success=true', async () => {
    const result = await sendEmailConfirmEmailAddressMutation({}, variables, context);

    const { email, verificationHash } = account;

    const name = getFullNameString(account);

    expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledWith(email, variables.urlOrigin, name, verificationHash);

    const expected = {
      success: true,
      emailRecipient: mockAccount.email,
    };

    expect(result).toEqual(expected);
  });

  describe('when sendEmailConfirmEmailAddress does not return success=true', () => {
    test('should throw an error', async () => {
      try {
        await sendEmailConfirmEmailAddressMutation({}, variables, context);
      } catch (err) {
        const expected = new Error('Sending email verification for account creation (sendEmailConfirmEmailAddress mutation)');

        expect(err).toEqual(expected);
      }
    });
  });
});
