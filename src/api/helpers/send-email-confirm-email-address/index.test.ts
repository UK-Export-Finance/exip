import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import confirmEmailAddressEmail from '.';
import baseConfig from '../../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import getFullNameString from '../get-full-name-string';
import sendEmail from '../../emails';
import accounts from '../../test-helpers/accounts';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse } from '../../test-mocks';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/send-email-confirm-email-address', () => {
  let account: Account;

  jest.mock('../../emails');

  let sendEmailConfirmEmailAddressSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    account = await accounts.create({ context });

    jest.resetAllMocks();

    sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;
  });

  test('it should call sendEmail.confirmEmailAddress and return success=true', async () => {
    const result = await confirmEmailAddressEmail.send(context, mockUrlOrigin, account.id);

    const { email, verificationHash } = account;

    const name = getFullNameString(account);

    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, mockUrlOrigin, name, verificationHash);

    const expected = {
      success: true,
      emailRecipient: mockAccount.email,
    };

    expect(result).toEqual(expected);
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      await accounts.deleteAll(context);

      const result = await confirmEmailAddressEmail.send(context, mockUrlOrigin, account.id);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.confirmEmailAddress = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await confirmEmailAddressEmail.send(context, mockUrlOrigin, account.id);
      } catch (err) {
        const expected = new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${mockSendEmailResponse}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
