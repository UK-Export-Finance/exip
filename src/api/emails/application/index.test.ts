import application from '.';
import notify from '../../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import getFullNameString from '../../helpers/get-full-name-string';
import fileSystem from '../../file-system';
import { mockAccount, mockApplication, mockCompany, mockBuyer, mockSendEmailResponse } from '../../test-mocks';

describe('emails/application', () => {
  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const mockFile = JSON.stringify({ mock: true });

  const mockFileSystemResponse = Buffer.from(mockFile);

  const readFileSpy = jest.fn(() => Promise.resolve(mockFileSystemResponse));
  const unlinkSpy = jest.fn(() => Promise.resolve(true));

  const { email } = mockAccount;
  const { referenceNumber } = mockApplication;
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

  const mockErrorMessage = 'Mock error';

  describe('account', () => {
    const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;

    beforeEach(() => {
      jest.clearAllMocks();

      notify.sendEmail = sendEmailSpy;
      fileSystem.readFile = readFileSpy;
      fileSystem.unlink = unlinkSpy;
    });

    test('it should call notify.sendEmail and return the response', async () => {
      notify.sendEmail = sendEmailSpy;

      const result = await application.submittedEmail(variables);

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
          await application.submittedEmail(variables);
        } catch (err) {
          const expected = new Error(
            `Sending application submitted email to to application owner or provided business contact Error: Sending email ${mockErrorMessage}`,
          );

          expect(err).toEqual(expected);
        }
      });
    });
  });

  describe('underwritingTeam', () => {
    const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY;

    beforeEach(() => {
      jest.clearAllMocks();

      notify.sendEmail = sendEmailSpy;
      fileSystem.readFile = readFileSpy;
      fileSystem.unlink = unlinkSpy;
    });

    test('it should call notify.sendEmail and return the response', async () => {
      notify.sendEmail = sendEmailSpy;

      const result = await application.underwritingTeam(variables, mockFilePath, templateId);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);

      const emailAddress = process.env.UNDERWRITING_TEAM_EMAIL;

      const expectedFileBuffer = Buffer.from(mockFileSystemResponse);

      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, emailAddress, variables, expectedFileBuffer);

      const expected = mockSendEmailResponse;

      expect(result).toEqual(expected);
    });

    describe('error handling', () => {
      beforeAll(async () => {
        notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
      });

      test('should throw an error', async () => {
        try {
          await application.underwritingTeam(variables, mockFilePath, templateId);
        } catch (err) {
          const expected = new Error(`Sending application submitted email to underwriting team Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });
});
