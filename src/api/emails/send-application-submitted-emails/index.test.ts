import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import sendApplicationSubmittedEmails from '.';
import baseConfig from '../../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import sendEmail from '../index';
import getFullNameString from '../../helpers/get-full-name-string';
import getApplicationSubmittedEmailTemplateIds from '../../helpers/get-application-submitted-email-template-ids';
import formatDate from '../../helpers/format-date';
import { createFullApplication } from '../../test-helpers';
import { Application, ApplicationSubmissionEmailVariables } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line
import { mockSendEmailResponse } from '../../test-mocks';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('emails/send-email-application-submitted', () => {
  let application: Application;
  const mockXlsxPath = '/path-to-xlsx';

  jest.mock('./index');

  let applicationSubmittedEmailSpy = jest.fn();
  let underwritingTeamEmailSpy = jest.fn();
  let documentsEmailSpy = jest.fn();

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
    let expectedSendEmailVars: ApplicationSubmissionEmailVariables;
    let expectedContactSendEmailVars: ApplicationSubmissionEmailVariables;

    beforeEach(() => {
      const { referenceNumber, owner, company, buyer, policyAndExport, business } = application;
      const { email } = owner;
      const { companyName } = company;
      const { companyOrOrganisationName } = buyer;
      const { businessContactDetail } = business;

      const sharedEmailVars = {
        referenceNumber,
        buyerName: companyOrOrganisationName,
        buyerLocation: buyer.country?.name,
        companyName,
        requestedStartDate: formatDate(policyAndExport.requestedStartDate),
      };

      expectedSendEmailVars = {
        emailAddress: email,
        name: getFullNameString(owner),
        ...sharedEmailVars,
      } as ApplicationSubmissionEmailVariables;

      expectedContactSendEmailVars = {
        emailAddress: businessContactDetail.email,
        name: getFullNameString(businessContactDetail),
        ...sharedEmailVars,
      } as ApplicationSubmissionEmailVariables;
    });

    describe('when application owner and business contact emails are the same', () => {
      test('it should call sendEmail.application.applicationSubmittedEmail once', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(applicationSubmittedEmailSpy).toHaveBeenCalledTimes(1);
        expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars);
      });

      test('it should call sendEmail.application.applicationSubmittedEmail with the correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(underwritingTeamEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).underwritingTeam;

        expect(underwritingTeamEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, mockXlsxPath, templateId);
      });

      test('it should call sendEmail.documentsEmail with the correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
      });
    });

    describe('when application owner and business contact emails are the different', () => {
      test('it should call sendEmail.application.submittedEmail twice', async () => {
        application.business.businessContactDetail.email = 'test@test.com';
        expectedContactSendEmailVars.emailAddress = application.business.businessContactDetail.email;

        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(applicationSubmittedEmailSpy).toHaveBeenCalledTimes(2);
        expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars);
        expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedContactSendEmailVars);
      });

      test('it should call sendEmail.application.submittedEmail with the correct template ID', async () => {
        application.business.businessContactDetail.email = 'test@test.com';

        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(underwritingTeamEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).underwritingTeam;

        expect(underwritingTeamEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, mockXlsxPath, templateId);
      });

      test('it should call sendEmail.documentsEmail with the correct template ID twice', async () => {
        application.business.businessContactDetail.email = 'test@test.com';
        expectedContactSendEmailVars.emailAddress = application.business.businessContactDetail.email;

        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(2);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedContactSendEmailVars, templateId);
      });
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and buyer has exporterHasTradedWithBuyer answer of `Yes`', () => {
      beforeEach(() => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: false,
        };

        application.buyer = {
          ...application.buyer,
          exporterHasTradedWithBuyer: true,
        };
      });

      test('it should call sendEmail.documentsEmail with the correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
      });
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and does NOT have exporterHasTradedWithBuyer', () => {
      beforeEach(() => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: false,
        };

        application.buyer = {
          ...application.buyer,
          exporterHasTradedWithBuyer: false,
        };
      });

      test('it should NOT call sendEmail.documentsEmail', async () => {
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

        application.buyer = {
          ...application.buyer,
          exporterHasTradedWithBuyer: false,
        };
      });

      test('it should NOT call sendEmail.documentsEmail', async () => {
        await sendApplicationSubmittedEmails.send(application, mockXlsxPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
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

      test('should throw an error', async () => {
        try {
          await sendApplicationSubmittedEmails.send(application, mockXlsxPath);
        } catch (err) {
          const expected = new Error('Sending application submitted emails Error: Sending application submitted email to owner/account');

          expect(err).toEqual(expected);
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

      test('should throw an error', async () => {
        try {
          await sendApplicationSubmittedEmails.send(application, mockXlsxPath);
        } catch (err) {
          const expected = new Error('Sending application submitted emails Error: Sending application submitted email to underwriting team');

          expect(err).toEqual(expected);
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

      test('should throw an error', async () => {
        try {
          await sendApplicationSubmittedEmails.send(application, mockXlsxPath);
        } catch (err) {
          const expected = new Error(`Sending application submitted emails Error: Sending application documents emails ${mockSendEmailResponse}`);

          expect(err).toEqual(expected);
        }
      });
    });

    describe('when sendEmail.application.submittedEmail fails', () => {
      beforeEach(() => {
        sendEmail.application.submittedEmail = jest.fn(() => Promise.reject(mockSendEmailResponse));
      });

      test('should throw an error', async () => {
        try {
          await sendApplicationSubmittedEmails.send(application, mockXlsxPath);
        } catch (err) {
          const expected = new Error(`Sending application submitted emails ${mockSendEmailResponse}`);

          expect(err).toEqual(expected);
        }
      });
    });
  });
});
