import dotenv from 'dotenv';
import sendEmail, { callNotify } from '.';
import notify from '../integrations/notify';
import { EMAIL_TEMPLATE_IDS } from '../constants';
import { mockAccount, mockApplication, mockExporterCompany, mockBuyer, mockSendEmailResponse } from '../test-mocks';

dotenv.config();

describe('emails', () => {
  jest.mock('../integrations/notify');

  const sendEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

  const { email, firstName, verificationHash } = mockAccount;
  const { referenceNumber } = mockApplication;
  const { companyName } = mockExporterCompany;
  const { companyOrOrganisationName } = mockBuyer;

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
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('callNotify', () => {
    test('it should call notify.sendEmail and return the response', async () => {
      const templateId = 'mockTemplateId';
      const mockVariables = { test: true };

      const result = await callNotify(templateId, email, firstName, mockVariables);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, firstName, mockVariables);

      const expected = mockSendEmailResponse;

      expect(result).toEqual(expected);
    });
  });

  describe('confirmEmailAddress', () => {
    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

    test('it should call notify.sendEmail and return the response', async () => {
      const result = await sendEmail.confirmEmailAddress(email, firstName, verificationHash);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, { confirmToken: verificationHash }, firstName);

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

    test('it should call notify.sendEmail and return the response', async () => {
      notify.sendEmail = sendEmailSpy;

      const result = await sendEmail.securityCodeEmail(email, firstName, mockSecurityCode);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, { securityCode: mockSecurityCode }, firstName);

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
        expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, variables, firstName);

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

        const result = await sendEmail.applicationSubmitted.underwritingTeam(variables);

        expect(sendEmailSpy).toHaveBeenCalledTimes(1);

        const emailAddress = process.env.UNDERWRITING_TEAM_EMAIL;

        expect(sendEmailSpy).toHaveBeenCalledWith(templateId, emailAddress, variables);

        const expected = mockSendEmailResponse;

        expect(result).toEqual(expected);
      });

      describe('error handling', () => {
        beforeAll(async () => {
          notify.sendEmail = jest.fn(() => Promise.reject(mockErrorMessage));
        });

        test('should throw an error', async () => {
          try {
            await sendEmail.applicationSubmitted.underwritingTeam(variables);
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
      expect(sendEmailSpy).toHaveBeenCalledWith(templateId, email, variables, firstName);

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
