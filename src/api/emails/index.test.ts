import dotenv from 'dotenv';
import sendEmail, { callNotify } from '.';
import fileSystem from '../file-system';
import notify from '../integrations/notify';
import getFullNameString from '../helpers/get-full-name-string';
import { EMAIL_TEMPLATE_IDS } from '../constants';
import { mockAccount, mockApplication, mockCompany, mockBuyer, mockSendEmailResponse, mockInsuranceFeedback } from '../test-mocks';
import formatDate from '../helpers/format-date';

dotenv.config();

describe('emails', () => {
  jest.mock('../integrations/notify');
  jest.mock('../file-system');

  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const mockCsvFile = JSON.stringify({ mock: true });

  const mockFileSystemResponse = Buffer.from(mockCsvFile);

  const writeFileSpy = jest.fn(() => Promise.resolve(mockFileSystemResponse));
  const unlinkSpy = jest.fn(() => Promise.resolve(true));

  const { email, verificationHash } = mockAccount;
  const { referenceNumber } = mockApplication;
  const { companyName } = mockCompany;
  const { companyOrOrganisationName } = mockBuyer;

  const mockCsvPath = '/path-to-csv';

  const fileIsCsv = true;

  const fullName = getFullNameString(mockAccount);

  const variables = {
    emailAddress: email,
    name: fullName,
    referenceNumber,
    buyerName: companyOrOrganisationName,
    buyerLocation: companyName,
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
      name: fullName,
      confirmToken: verificationHash,
    };

    test('it should call notify.sendEmail and return the response', async () => {
      const result = await sendEmail.confirmEmailAddress(email, fullName, verificationHash);

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
          await sendEmail.confirmEmailAddress(email, fullName, verificationHash);
        } catch (err) {
          const expected = new Error(`Sending confirm email address email Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });

  describe('securityCodeEmail', () => {
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;
    const mockSecurityCode = '123456';

    const expectedVariables = {
      name: fullName,
      securityCode: mockSecurityCode,
    };

    test('it should call notify.sendEmail and return the response', async () => {
      notify.sendEmail = sendEmailSpy;

      const result = await sendEmail.securityCodeEmail(email, fullName, mockSecurityCode);

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
          await sendEmail.securityCodeEmail(email, fullName, verificationHash);
        } catch (err) {
          const expected = new Error(`Sending security code email for account sign in Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });

  describe('passwordResetLink', () => {
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.PASSWORD_RESET;
    const mockPasswordResetHash = '123456';

    const expectedVariables = {
      name: fullName,
      passwordResetToken: mockPasswordResetHash,
    };

    test('it should call notify.sendEmail and return the response', async () => {
      notify.sendEmail = sendEmailSpy;

      const result = await sendEmail.passwordResetLink(email, fullName, mockPasswordResetHash);

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
          await sendEmail.passwordResetLink(email, fullName, mockPasswordResetHash);
        } catch (err) {
          const expected = new Error(`Sending email for account password reset Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });

  describe('applicationSubmittedEmail', () => {
    describe('account', () => {
      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;

      test('it should call notify.sendEmail and return the response', async () => {
        notify.sendEmail = sendEmailSpy;

        const result = await sendEmail.applicationSubmitted.account(variables);

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
            await sendEmail.applicationSubmitted.account(variables);
          } catch (err) {
            const expected = new Error(`Sending application submitted email to account Error: Sending email ${mockErrorMessage}`);

            expect(err).toEqual(expected);
          }
        });
      });
    });

    describe('underwritingTeam', () => {
      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.UNDERWRITING_TEAM.NOTIFICATION_ANTI_BRIBERY_AND_TRADING_HISTORY;

      test('it should call notify.sendEmail and return the response', async () => {
        notify.sendEmail = sendEmailSpy;

        const result = await sendEmail.applicationSubmitted.underwritingTeam(variables, mockCsvPath, templateId);

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
            await sendEmail.applicationSubmitted.underwritingTeam(variables, mockCsvPath, templateId);
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

  describe('feedbackEmail', () => {
    const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;

    test('it should call notify.sendEmail and return the response', async () => {
      notify.sendEmail = sendEmailSpy;

      const emailVariables = {
        ...mockInsuranceFeedback,
        createdAt: new Date(),
      };

      const result = await sendEmail.insuranceFeedbackEmail(emailVariables);

      const resultVariables = {
        ...emailVariables,
        date: formatDate(new Date()),
        time: formatDate(new Date(), 'HH:mm:ss'),
      };

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, resultVariables);

      const expected = mockSendEmailResponse;

      expect(result).toEqual(expected);
    });

    describe('error handling', () => {
      beforeAll(async () => {
        notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
      });

      test('should throw an error', async () => {
        try {
          await sendEmail.insuranceFeedbackEmail(mockInsuranceFeedback);
        } catch (err) {
          const expected = new Error(`Sending insurance feedback email Error: Sending email ${mockErrorMessage}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });
});
