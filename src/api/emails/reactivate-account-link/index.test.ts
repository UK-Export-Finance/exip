import { reactivateAccountLink } from '.';
import APIM from '../../integrations/APIM';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse, mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

describe('emails/reactivate-account-link', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email } = mockAccount;

  const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.REACTIVATE_ACCOUNT_CONFIRM_EMAIL;

  const mockReactivationHash = '123456';

  const fullName = getFullNameString(mockAccount);

  const expectedVariables = {
    urlOrigin: mockUrlOrigin,
    name: fullName,
    reactivationToken: mockReactivationHash,
  };

  beforeAll(async () => {
    APIM.sendEmail = sendEmailSpy;
  });

  it('should call APIM.sendEmail and return the response', async () => {
    APIM.sendEmail = sendEmailSpy;

    const result = await reactivateAccountLink(mockUrlOrigin, email, fullName, mockReactivationHash);

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
      const response = reactivateAccountLink(mockUrlOrigin, email, fullName, mockReactivationHash);

      await expect(response).rejects.toThrow(`Sending email for account reactivation ${new Error(mockErrorMessage)}`);
    });
  });
});
