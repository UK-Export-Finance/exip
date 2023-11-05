import { documentsEmail } from '.';
import notify from '../../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import { mockAccount, mockApplication, mockSendEmailResponse } from '../../test-mocks';

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

  const mockErrorMessage = 'Mock error';

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should call notify.sendEmail and return the response', async () => {
    notify.sendEmail = sendEmailSpy;

    const result = await documentsEmail(variables, templateId);

    expect(sendEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, variables);

    const expected = mockSendEmailResponse;

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeAll(async () => {
      notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
    });

    test('should throw an error', async () => {
      try {
        await documentsEmail(variables, templateId);
      } catch (err) {
        const expected = new Error(`Sending documents email Error: Sending email ${mockErrorMessage}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
