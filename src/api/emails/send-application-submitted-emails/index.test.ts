import dotenv from 'dotenv';
import sendApplicationSubmittedEmails from '.';
import sendEmail from '../index';
import replaceCharacterCodesWithCharacters from '../../helpers/replace-character-codes-with-characters';
import getFullNameString from '../../helpers/get-full-name-string';
import getApplicationSubmittedEmailTemplateIds from '../../helpers/get-application-submitted-email-template-ids';
import formatDate from '../../helpers/format-date';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import { Application, ApplicationSubmissionEmailVariables, Context } from '../../types';
import { mockSendEmailResponse, mockSpyPromiseRejection } from '../../test-mocks';

dotenv.config();

describe('emails/send-email-application-submitted', () => {
  let context: Context;
  let application: Application;
  const mockXlsxPath = '/path-to-xlsx';

  jest.mock('./index');

  let applicationSubmittedEmailSpy = jest.fn();
  let underwritingTeamEmailSpy = jest.fn();
  let documentsEmailSpy = jest.fn();

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    application = await createFullApplication(context);

    jest.resetAllMocks();

    applicationSubmittedEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    underwritingTeamEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    documentsEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.application.submittedEmail = applicationSubmittedEmailSpy;
    sendEmail.application.underwritingTeam = underwritingTeamEmailSpy;

    sendEmail.documentsEmail = documentsEmailSpy;
  });

  describe('emails', () => {
    let expectedSendOwnerEmailVars: ApplicationSubmissionEmailVariables;
    let expectedContactSendEmailVars: ApplicationSubmissionEmailVariables;

    beforeEach(() => {
      const { referenceNumber, owner, company, buyer, policy, policyContact } = application;
      const { email } = owner;
      const { companyName } = company;
      const { companyOrOrganisationName } = buyer;

      const sharedEmailVars = {
        referenceNumber,
        buyerName: replaceCharacterCodesWithCharacters(String(companyOrOrganisationName)),
        buyerLocation: buyer.country?.name,
        companyName: replaceCharacterCodesWithCharacters(companyName),
        requestedStartDate: formatDate(policy.requestedStartDate),
      };

      expectedSendOwnerEmailVars = {
        ...sharedEmailVars,
        emailAddress: email,
        buyerName: replaceCharacterCodesWithCharacters(String(buyer.companyOrOrganisationName)),
        name: replaceCharacterCodesWithCharacters(getFullNameString(owner)),
      } as ApplicationSubmissionEmailVariables;

      expectedContactSendEmailVars = {
        ...sharedEmailVars,
        emailAddress: policyContact.email,
        buyerName: replaceCharacterCodesWithCharacters(String(buyer.companyOrOrganisationName)),
        name: replaceCharacterCodesWithCharacters(getFullNameString(policyContact)),
      } as ApplicationSubmissionEmailVariables;
    });

    describe('when application owner and policy contact emails are the same', () => {
      it('should call sendEmail.application.applicationSubmittedEmail once', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(applicationSubmittedEmailSpy).toHaveBeenCalledTimes(1);
        expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedSendOwnerEmailVars);
      });

      it('should call sendEmail.application.applicationSubmittedEmail with the correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(underwritingTeamEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).underwritingTeam;

        expect(underwritingTeamEmailSpy).toHaveBeenCalledWith(expectedSendOwnerEmailVars, mockXlsxPath, templateId);
      });

      it('should call sendEmail.documentsEmail with the correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendOwnerEmailVars, templateId);
      });
    });

    describe('when the policy contact is NOT the same as the owner', () => {
      beforeEach(() => {
        application.policyContact.isSameAsOwner = false;
      });

      it('should call sendEmail.application.submittedEmail twice', async () => {
        expectedContactSendEmailVars.emailAddress = application.policyContact.email;

        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(applicationSubmittedEmailSpy).toHaveBeenCalledTimes(2);
        expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedSendOwnerEmailVars);
        expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedContactSendEmailVars);
      });

      it('should call sendEmail.application.submittedEmail with the correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(underwritingTeamEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).underwritingTeam;

        expect(underwritingTeamEmailSpy).toHaveBeenCalledWith(expectedSendOwnerEmailVars, mockXlsxPath, templateId);
      });

      it('should call sendEmail.documentsEmail with the correct template ID twice', async () => {
        expectedContactSendEmailVars.emailAddress = application.policyContact.email;

        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(2);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendOwnerEmailVars, templateId);
        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedContactSendEmailVars, templateId);
      });
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and buyer has exporterHasTradedWithBuyer answer of `Yes`', () => {
      beforeEach(() => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: false,
        };

        application.buyer.buyerTradingHistory = {
          ...application.buyer.buyerTradingHistory,
          exporterHasTradedWithBuyer: true,
        };
      });

      it('should call sendEmail.documentsEmail with the correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendOwnerEmailVars, templateId);
      });
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and does NOT have exporterHasTradedWithBuyer', () => {
      beforeEach(() => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: false,
        };

        application.buyer.buyerTradingHistory = {
          ...application.buyer.buyerTradingHistory,
          exporterHasTradedWithBuyer: false,
        };
      });

      it('should NOT call sendEmail.documentsEmail', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the declaration has an answer of `Yes` for hasAntiBriberyCodeOfConduct and does NOT have exporterHasTradedWithBuyer', () => {
      beforeEach(async () => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: true,
        };

        application.buyer.buyerTradingHistory = {
          ...application.buyer.buyerTradingHistory,
          exporterHasTradedWithBuyer: false,
        };
      });

      it('should NOT call sendEmail.documentsEmail', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendOwnerEmailVars, templateId);
      });
    });
  });

  it('should return success=true', async () => {
    const result = await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

    const expected = { success: true };

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    describe('when sendEmail.application.submittedEmail returns success=false', () => {
      beforeEach(() => {
        sendEmail.application.submittedEmail = jest.fn(() =>
          Promise.resolve({
            ...mockSendEmailResponse,
            success: false,
          }),
        );
      });

      it('should throw an error', async () => {
        try {
          await sendApplicationSubmittedEmails.send(application, mockXlsxPath);
        } catch (error) {
          const expected = new Error('Sending application submitted emails Error: Sending application submitted email to owner/account');

          expect(error).toEqual(expected);
        }
      });
    });

    describe('when sendEmail.application.underwritingTeam returns success=false', () => {
      beforeEach(() => {
        sendEmail.application.underwritingTeam = jest.fn(() =>
          Promise.resolve({
            ...mockSendEmailResponse,
            success: false,
          }),
        );
      });

      it('should throw an error', async () => {
        try {
          await sendApplicationSubmittedEmails.send(application, mockXlsxPath);
        } catch (error) {
          const expected = new Error('Sending application submitted emails Error: Sending application submitted email to underwriting team');

          expect(error).toEqual(expected);
        }
      });
    });

    describe('when sendEmail.documentsEmail returns success=false', () => {
      beforeEach(() => {
        sendEmail.documentsEmail = jest.fn(() =>
          Promise.resolve({
            ...mockSendEmailResponse,
            success: false,
          }),
        );
      });

      it('should throw an error', async () => {
        const response = sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        await expect(response).rejects.toThrow(`Sending application submitted emails Error: Sending application documents emails ${mockSendEmailResponse}`);
      });
    });

    describe('when sendEmail.application.submittedEmail fails', () => {
      beforeEach(() => {
        sendEmail.application.submittedEmail = mockSpyPromiseRejection;
      });

      it('should throw an error', async () => {
        const response = sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        await expect(response).rejects.toThrow(`Sending application submitted emails ${new Error('Sending application submitted email to owner/account')}`);
      });
    });
  });
});
