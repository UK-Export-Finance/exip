import { confirmEmailAddress } from '.';
import APIM from '../../integrations/APIM';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import { mockAccount, mockSendEmailResponse, mockUrlOrigin, mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

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

  beforeAll(async () => {
    APIM.sendEmail = sendEmailSpy;
  });

  it('should call APIM.sendEmail and return the response', async () => {
    const result = await confirmEmailAddress(email, mockUrlOrigin, fullName, verificationHash, id);

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
      const response = confirmEmailAddress(email, mockUrlOrigin, fullName, verificationHash, id);

      await expect(response).rejects.toThrow(`Sending confirm email address email ${new Error(mockErrorMessage)}`);
    });
  });
});
