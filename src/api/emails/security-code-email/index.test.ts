import { securityCodeEmail } from '.';
import notify from '../../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import { mockAccount, mockSendEmailResponse } from '../../test-mocks';

describe('emails/security-code-email', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email } = mockAccount;

  const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;

  const mockSecurityCode = '123456';

  const fullName = getFullNameString(mockAccount);

  const expectedVariables = {
    name: fullName,
    securityCode: mockSecurityCode,
  };

  const mockErrorMessage = 'Mock error';

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  test('it should call notify.sendEmail and return the response', async () => {
    const result = await securityCodeEmail(email, fullName, mockSecurityCode);

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
        await securityCodeEmail(email, fullName, mockSecurityCode);
      } catch (err) {
        const expected = new Error(`Sending security code email for account sign in Error: Sending email ${mockErrorMessage}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
