import { accessCodeEmail } from '.';
import notify from '../../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import { mockAccount, mockSendEmailResponse, mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

describe('emails/access-code-email', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email } = mockAccount;

  const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.ACCESS_CODE;

  const mockSecurityCode = '123456';

  const fullName = getFullNameString(mockAccount);

  const expectedVariables = {
    name: fullName,
    securityCode: mockSecurityCode,
  };

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  it('should call notify.sendEmail and return the response', async () => {
    const result = await accessCodeEmail(email, fullName, mockSecurityCode);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);

    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, expectedVariables);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeAll(async () => {
      notify.sendEmail = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await accessCodeEmail(email, fullName, mockSecurityCode);
      } catch (error) {
        const expected = new Error(`Sending access code email for account sign in Error: Sending email ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
