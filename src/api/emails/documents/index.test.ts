import { documentsEmail } from '.';
import notify from '../../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import { mockAccount, mockApplication, mockSendEmailResponse, mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

describe('emails/documents', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email } = mockAccount;

  const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;

  const fullName = getFullNameString(mockAccount);

  const variables = {
    emailAddress: email,
    name: fullName,
    referenceNumber: mockApplication.referenceNumber,
    buyerName: String(mockApplication.buyer.companyOrOrganisationName),
    buyerLocation: String(mockApplication.buyer.country?.name),
  };

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call notify.sendEmail and return the response', async () => {
    notify.sendEmail = sendEmailSpy;

    const result = await documentsEmail(variables, templateId);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, variables);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeAll(async () => {
      notify.sendEmail = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await documentsEmail(variables, templateId);
      } catch (error) {
        const expected = new Error(`Sending documents email Error: Sending email ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
