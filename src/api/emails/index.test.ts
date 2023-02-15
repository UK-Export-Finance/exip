import dotenv from 'dotenv';
import sendEmail from '.';
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

  test('it should call notify.sendEmail and return the response', async () => {
    const result = await sendEmail.confirmEmailAddress(email, firstName, verificationHash);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL, email, firstName, verificationHash);

    const expected = sendEmailResponse;

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    const mockErrorMessage = 'API error';

    beforeAll(async () => {
      notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
    });

    test('should throw an error', async () => {
      try {
        await sendEmail.confirmEmailAddress(email, firstName, verificationHash);
      } catch (err) {
        const expected = new Error(`Sending email verification for account creation ${mockErrorMessage}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
