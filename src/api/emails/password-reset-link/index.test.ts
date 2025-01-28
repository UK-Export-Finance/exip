import { passwordResetLink } from '.';
import APIM from '../../integrations/APIM';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse, mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

describe('emails/password-reset-link', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email } = mockAccount;

  const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.PASSWORD_RESET;

  const mockPasswordResetHash = '123456';

  const fullName = getFullNameString(mockAccount);

  const expectedVariables = {
    urlOrigin: mockUrlOrigin,
    name: fullName,
    passwordResetToken: mockPasswordResetHash,
  };

  beforeAll(async () => {
    APIM.sendEmail = sendEmailSpy;
  });

  it('should call APIM.sendEmail and return the response', async () => {
    APIM.sendEmail = sendEmailSpy;

    const result = await passwordResetLink(mockUrlOrigin, email, fullName, mockPasswordResetHash);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, expectedVariables);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeAll(async () => {
      APIM.sendEmail = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await passwordResetLink(mockUrlOrigin, email, fullName, mockPasswordResetHash);
      } catch (error) {
        const expected = new Error(`Sending email for account password reset ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
