import dotenv from 'dotenv';
import sendEmail, { callNotify } from '.';
import notify from '../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../constants';
import { mockAccount } from '../test-mocks';

dotenv.config();

describe('emails', () => {
  jest.mock('../integrations/notify');

  const sendEmailResponse = { success: true, emailRecipient: mockAccount.email };

  const sendEmailSpy = jest.fn(() => Promise.resolve(sendEmailResponse));

  const { email, firstName, verificationHash } = mockAccount;

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('callNotify', () => {
    test('it should call notify.sendEmail and return the response', async () => {
      const templateId = 'mockTemplateId';
      const mockVariables = { test: true };

      const result = await callNotify(templateId, email, firstName, mockVariables);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, firstName, mockVariables);

      const expected = sendEmailResponse;

      expect(result).toEqual(expected);
    });
  });

  describe('confirmEmailAddress', () => {
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

    test('it should call notify.sendEmail and return the response', async () => {
      const result = await sendEmail.confirmEmailAddress(email, firstName, verificationHash);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, firstName, { confirmToken: verificationHash });

      const expected = sendEmailResponse;

      expect(result).toEqual(expected);
    });

    describe('error handling', () => {
      const mockErrorMessage = 'Mock error';

      beforeAll(async () => {
        notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
      });

      test('should throw an error', async () => {
        try {
          await sendEmail.confirmEmailAddress(email, firstName, verificationHash);
        } catch (err) {
          const expected = new Error(`Sending email verification for account creation Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });

  describe('securityCodeEmail', () => {
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;
    const mockSecurityCode = '123456';

    test('it should call notify.sendEmail and return the response', async () => {
      notify.sendEmail = sendEmailSpy;

      const result = await sendEmail.securityCodeEmail(email, firstName, mockSecurityCode);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, firstName, { securityCode: mockSecurityCode });

      const expected = sendEmailResponse;

      expect(result).toEqual(expected);
    });

    describe('error handling', () => {
      const mockErrorMessage = 'Mock error';

      beforeAll(async () => {
        notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
      });

      test('should throw an error', async () => {
        try {
          await sendEmail.securityCodeEmail(email, firstName, verificationHash);
        } catch (err) {
          const expected = new Error(`Sending security code email for account sign in Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });
});
