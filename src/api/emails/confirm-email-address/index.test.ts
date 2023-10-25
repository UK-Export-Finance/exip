import { confirmEmailAddress } from '.';
import notify from '../../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import { mockAccount, mockSendEmailResponse, mockUrlOrigin } from '../../test-mocks';

describe('emails/confirm-email-address', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email, verificationHash, id } = mockAccount;

  const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

  const fullName = getFullNameString(mockAccount);

  const expectedVariables = {
    urlOrigin: mockUrlOrigin,
    name: fullName,
    confirmToken: verificationHash,
  };

  const mockErrorMessage = 'Mock error';

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  test('it should call notify.sendEmail and return the response', async () => {
    const result = await confirmEmailAddress(email, mockUrlOrigin, fullName, verificationHash, id);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);

    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, expectedVariables);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeAll(async () => {
      notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
    });

    test('should throw an error', async () => {
      try {
        await confirmEmailAddress(email, mockUrlOrigin, fullName, verificationHash, id);
      } catch (err) {
        const expected = new Error(`Sending confirm email address email Error: Sending email ${mockErrorMessage}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
