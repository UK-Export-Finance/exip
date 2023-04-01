import dotenv from 'dotenv';
import sendEmail, { callNotify } from '.';
import fileSystem from '../file-system';
import notify from '../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../constants';
import { mockAccount, mockApplication, mockExporterCompany, mockBuyer, mockSendEmailResponse } from '../test-mocks';

dotenv.config();

describe('emails', () => {
  jest.mock('../integrations/notify');
  jest.mock('../file-system');

  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
  // const writeFileSpy = jest.fn(() => Promise.resolve(true));

  const mockCsvFile = JSON.stringify({ mock: true });

  const mockFileSystemResponse = Buffer.from(mockCsvFile);

  const writeFileSpy = jest.fn(() => Promise.resolve(mockFileSystemResponse));
  const unlinkSpy = jest.fn(() => Promise.resolve());

  const { email, firstName, verificationHash } = mockAccount;
  const { referenceNumber } = mockApplication;
  const { companyName } = mockExporterCompany;
  const { companyOrOrganisationName } = mockBuyer;

  const mockCsvPath = '/path-to-csv';

  const fileIsCsv = true;

  const variables = {
    emailAddress: email,
    firstName,
    referenceNumber,
    buyerName: companyOrOrganisationName,
    exporterCompanyName: companyName,
  };

  const mockErrorMessage = 'Mock error';

  beforeAll(async () => {
    notify.sendEmail = sendEmailSpy;
    fileSystem.readFile = writeFileSpy;
    fileSystem.unlink = unlinkSpy;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('callNotify', () => {
    test('it should call notify.sendEmail and return the response', async () => {
      const templateId = 'mockTemplateId';
      const mockVariables = { test: true };

      const result = await callNotify(templateId, email, mockVariables, mockFileSystemResponse, fileIsCsv);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, mockVariables, mockFileSystemResponse, fileIsCsv);

      const expected = mockSendEmailResponse;

      expect(result).toEqual(expected);
    });
  });

  describe('confirmEmailAddress', () => {
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

    const expectedVariables = {
      firstName,
      confirmToken: verificationHash,
    };

    test('it should call notify.sendEmail and return the response', async () => {
      const result = await sendEmail.confirmEmailAddress(email, firstName, verificationHash);

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
          await sendEmail.confirmEmailAddress(email, firstName, verificationHash);
        } catch (err) {
          const expected = new Error(`Sending email verification for account creation Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });

  describe('securityCodeEmail', () => {
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;
    const mockSecurityCode = '123456';

    const expectedVariables = {
      firstName,
      securityCode: mockSecurityCode,
    };

    test('it should call notify.sendEmail and return the response', async () => {
      notify.sendEmail = sendEmailSpy;

      const result = await sendEmail.securityCodeEmail(email, firstName, mockSecurityCode);

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
          await sendEmail.securityCodeEmail(email, firstName, verificationHash);
        } catch (err) {
          const expected = new Error(`Sending security code email for account sign in Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });

  describe('applicationSubmittedEmail', () => {
    describe('exporter', () => {
      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;

      test('it should call notify.sendEmail and return the response', async () => {
        notify.sendEmail = sendEmailSpy;

        const result = await sendEmail.applicationSubmitted.exporter(variables);

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
            await sendEmail.applicationSubmitted.exporter(variables);
          } catch (err) {
            const expected = new Error(`Sending application submitted email to exporter Error: Sending email ${mockErrorMessage}`);

            expect(err).toEqual(expected);
          }
        });
      });
    });

    describe('underwritingTeam', () => {
      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.UNDERWRITING_TEAM.NOTIFICATION;

      test('it should call notify.sendEmail and return the response', async () => {
        notify.sendEmail = sendEmailSpy;

        const result = await sendEmail.applicationSubmitted.underwritingTeam(variables, mockCsvPath);

        expect(sendEmailSpy).toHaveBeenCalledTimes(1);

        const emailAddress = process.env.UNDERWRITING_TEAM_EMAIL;

        const expectedFileBuffer = Buffer.from(mockFileSystemResponse);

        expect(sendEmailSpy).toHaveBeenCalledWith(templateId, emailAddress, variables, expectedFileBuffer, fileIsCsv);

        const expected = mockSendEmailResponse;

        expect(result).toEqual(expected);
      });

      describe('error handling', () => {
        beforeAll(async () => {
          notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
        });

        test('should throw an error', async () => {
          try {
            await sendEmail.applicationSubmitted.underwritingTeam(variables, mockCsvPath);
          } catch (err) {
            const expected = new Error(`Sending application submitted email to underwriting team Error: Sending email ${mockErrorMessage}`);

            expect(err).toEqual(expected);
          }
        });
      });
    });
  });

  describe('documentsEmail', () => {
    const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;

    test('it should call notify.sendEmail and return the response', async () => {
      notify.sendEmail = sendEmailSpy;

      const result = await sendEmail.documentsEmail(variables, templateId);

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
          await sendEmail.documentsEmail(variables, templateId);
        } catch (err) {
          const expected = new Error(`Sending documents email Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });
});
