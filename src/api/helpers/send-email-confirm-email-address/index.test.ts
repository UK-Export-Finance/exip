import confirmEmailAddressEmail from '.';
import getFullNameString from '../get-full-name-string';
import sendEmail from '../../emails';
import accounts from '../../test-helpers/accounts';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse } from '../../test-mocks';
import { DATE_24_HOURS_IN_THE_PAST, DATE_24_HOURS_FROM_NOW } from '../../constants';
import { Account, Context } from '../../types';

describe('helpers/send-email-confirm-email-address', () => {
  let context: Context;
  let account: Account;

  jest.mock('../../emails');

  let sendEmailConfirmEmailAddressSpy = jest.fn();

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    account = await accounts.create({ context });

    jest.resetAllMocks();

    sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;
  });

  describe('when verificationHash and verificationExpiry do not exist', () => {
    test('it should call sendEmail.confirmEmailAddress and return success=true', async () => {
      const result = await confirmEmailAddressEmail.send(context, mockUrlOrigin, account.id);

      const { email, verificationHash } = account;

      const name = getFullNameString(account);

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, mockUrlOrigin, name, verificationHash, account.id);

      const expected = {
        success: true,
        emailRecipient: mockAccount.email,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when verificationHash exists and verificationExpiry has elapsed', () => {
    test('it should call sendEmail.confirmEmailAddress and return success=true and not use account verificationHash', async () => {
      await accounts.update(context, account.id, { verificationExpiry: DATE_24_HOURS_IN_THE_PAST(), verificationHash: 'mock-hash' });

      const updatedAccount = await accounts.get(context, account.id);
      const result = await confirmEmailAddressEmail.send(context, mockUrlOrigin, updatedAccount.id);

      const { email, verificationHash } = updatedAccount;

      const name = getFullNameString(account);

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);

      // should generate new hash so not called with account hash
      expect(sendEmailConfirmEmailAddressSpy).not.toHaveBeenCalledWith(email, mockUrlOrigin, name, verificationHash, account.id);

      const expected = {
        success: true,
        emailRecipient: mockAccount.email,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when verificationHash exists and verificationExpiry has not elapsed', () => {
    test('it should call sendEmail.confirmEmailAddress and return success=true', async () => {
      await accounts.update(context, account.id, { verificationExpiry: DATE_24_HOURS_FROM_NOW(), verificationHash: 'mock-hash' });

      const updatedAccount = await accounts.get(context, account.id);
      const result = await confirmEmailAddressEmail.send(context, mockUrlOrigin, updatedAccount.id);

      const { email, verificationHash } = updatedAccount;

      const name = getFullNameString(account);

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, mockUrlOrigin, name, verificationHash, account.id);

      const expected = {
        success: true,
        emailRecipient: mockAccount.email,
      };

      expect(result).toEqual(expected);
    });
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
