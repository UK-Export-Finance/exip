import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import confirmEmailAddressEmail from '.';
import baseConfig from '../../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import getFullNameString from '../get-full-name-string';
import sendEmail from '../../emails';
import { mockAccount, mockSendEmailResponse } from '../../test-mocks';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/send-email-confirm-email-address', () => {
  let account: Account;

  const mockUrlOrigin = 'https://mock-origin.com';

  jest.mock('../../emails');

  let sendEmailConfirmEmailAddressSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id firstName lastName email salt hash verificationHash',
    })) as Account;

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
      // wipe the accounttable so we have a clean slate.
      const accounts = await context.query.Account.findMany();

      await context.query.Account.deleteMany({
        where: accounts,
      });

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
