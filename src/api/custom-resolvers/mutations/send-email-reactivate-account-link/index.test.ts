import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../../../keystone';
import sendEmailReactivateAccountLink from '.';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import { ACCOUNT } from '../../../constants';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse } from '../../../test-mocks';
import { Account, SuccessResponse, AccountSendEmailReactivateLinkVariables } from '../../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const {
  ENCRYPTION: {
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
} = ACCOUNT;

describe('custom-resolvers/send-email-reactivate-account-link', () => {
  let account: Account;
  let result: SuccessResponse;

  jest.mock('../../../emails');

  let reactivateAccountLinkSpy = jest.fn();

  const variables = {
    urlOrigin: mockUrlOrigin,
  } as AccountSendEmailReactivateLinkVariables;

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    // wipe the accounts table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // create an account
    account = (await context.query.Account.createOne({
      data: {
        ...mockAccount,
        isBlocked: true,
      },
      query: 'id',
    })) as Account;

    jest.resetAllMocks();

    reactivateAccountLinkSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.reactivateAccountLink = reactivateAccountLinkSpy;

    variables.accountId = account.id;

    result = await sendEmailReactivateAccountLink({}, variables, context);

    // get the latest account
    account = (await context.query.Account.findOne({
      where: { id: account.id },
      query: 'id email firstName lastName reactivationHash reactivationExpiry',
    })) as Account;
  });

  it('should return the email response, email and accountId', () => {
    const expected = {
      ...mockSendEmailResponse,
      email: account.email,
      accountId: account.id,
    };
    expect(result).toEqual(expected);
  });

  it('should generate a reactivationHash and add to the account', async () => {
    expect(account.reactivationHash.length).toEqual(KEY_LENGTH * 2);
  });

  it('should generate and add a reactivationExpiry to the account', async () => {
    const now = new Date();

    const tomorrowDay = new Date(now).getDay() + 1;

    const expiry = new Date(account.reactivationExpiry);

    const expiryDay = expiry.getDay();

    expect(expiryDay).toEqual(tomorrowDay);
  });

  test('it should call sendEmail.reactivateAccountLink', () => {
    const { email, reactivationHash } = account;

    const name = getFullNameString(account);

    expect(reactivateAccountLinkSpy).toHaveBeenCalledTimes(1);
    expect(reactivateAccountLinkSpy).toHaveBeenCalledWith(mockUrlOrigin, email, name, reactivationHash);
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const accounts = await context.query.Account.findMany();

      await context.query.Account.deleteMany({
        where: accounts,
      });

      result = await sendEmailReactivateAccountLink({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.reactivateAccountLink = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendEmailReactivateAccountLink({}, variables, context);
      } catch (err) {
        expect(reactivateAccountLinkSpy).toHaveBeenCalledTimes(1);

        const errMessage = 'Checking account and sending reactivate account email/link (sendEmailReactivateAccountLink mutation)';

        const expected = new Error(`${errMessage} ${mockSendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
