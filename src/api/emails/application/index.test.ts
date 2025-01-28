import application from '.';
import APIM from '../../integrations/APIM';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getSubmittedConfirmationTemplateId from './get-submitted-confirmation-template-id';
import getFullNameString from '../../helpers/get-full-name-string';
import fileSystem from '../../file-system';
import { mockAccount, mockApplication, mockCompany, mockBuyer, mockSendEmailResponse, mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

describe('emails/application', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const mockFile = JSON.stringify({ mock: true });

  const mockFileSystemResponse = Buffer.from(mockFile);

  const readFileSpy = jest.fn(() => Promise.resolve(mockFileSystemResponse));
  const unlinkSpy = jest.fn(() => Promise.resolve(true));

  const { email } = mockAccount;
  const { referenceNumber, policy } = mockApplication;
  const { companyName } = mockCompany;
  const { companyOrOrganisationName } = mockBuyer;

  const fullName = getFullNameString(mockAccount);

  const variables = {
    emailAddress: email,
    name: fullName,
    referenceNumber,
    buyerName: companyOrOrganisationName,
    buyerLocation: companyName,
  };

  const mockFilePath = '/path-to-file';

  describe('application', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      APIM.sendEmail = sendEmailSpy;
      fileSystem.readFile = readFileSpy;
      fileSystem.unlink = unlinkSpy;
    });

    it('should call APIM.sendEmail and return the response', async () => {
      APIM.sendEmail = sendEmailSpy;

      const result = await application.submittedEmail(variables, policy);

      const expectedTemplateId = getSubmittedConfirmationTemplateId(policy);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(expectedTemplateId, email, variables);

      const expected = mockSendEmailResponse;

      expect(result).toEqual(expected);
    });

    describe('error handling', () => {
      beforeAll(async () => {
        APIM.sendEmail = mockSpyPromiseRejection;
      });

      it('should throw an error', async () => {
        try {
          await application.submittedEmail(variables, policy);
        } catch (error) {
          const expected = new Error(
            `Sending application submitted email to to application owner or provided business contact Error: Sending email ${new Error(mockErrorMessage)}`,
          );

          expect(error).toEqual(expected);
        }
      });
    });
  });

  describe('underwritingTeam', () => {
    const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY;

    beforeEach(() => {
      jest.clearAllMocks();

      APIM.sendEmail = sendEmailSpy;
      fileSystem.readFile = readFileSpy;
      fileSystem.unlink = unlinkSpy;
    });

    it('should call APIM.sendEmail and return the response', async () => {
      APIM.sendEmail = sendEmailSpy;

      const result = await application.underwritingTeam(variables, mockFilePath, templateId);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);

      const emailAddress = process.env.UNDERWRITING_TEAM_EMAIL;

      const expectedVariables = {
        ...variables,
        file: Buffer.from(mockFileSystemResponse),
      };

      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, emailAddress, expectedVariables);

      const expected = mockSendEmailResponse;

      expect(result).toEqual(expected);
    });

    describe('error handling', () => {
      beforeAll(async () => {
        APIM.sendEmail = mockSpyPromiseRejection;
      });

      it('should throw an error', async () => {
        const response = application.underwritingTeam(variables, mockFilePath, templateId);

        await expect(response).rejects.toThrow(`Sending application submitted email to underwriting team Error: Sending email ${new Error(mockErrorMessage)}`);
      });
    });
  });
});
