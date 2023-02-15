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

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  test('it should call notify.sendEmail and return the response', async () => {
    const { email, firstName, verificationHash } = mockAccount;

    const result = await sendEmail.confirmEmailAddress(email, firstName, verificationHash);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL, email, firstName, verificationHash);

    const expected = sendEmailResponse;

    expect(result).toEqual(expected);
  });
});
