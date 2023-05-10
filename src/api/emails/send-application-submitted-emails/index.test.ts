import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import sendApplicationSubmittedEmails from '.';
import baseConfig from '../../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import sendEmail from '../index';
import { ANSWERS } from '../../constants';
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
  const mockCsvPath = '/path-to-csv';

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

    sendEmail.applicationSubmitted.account = applicationSubmittedEmailSpy;
    sendEmail.applicationSubmitted.underwritingTeam = underwritingTeamEmailSpy;

    sendEmail.documentsEmail = documentsEmailSpy;
  });

  describe('emails', () => {
    let expectedSendEmailVars: ApplicationSubmissionEmailVariables;

    beforeEach(() => {
      const { referenceNumber, owner, company, buyer, policyAndExport } = application;
      const { email, firstName } = owner;
      const { companyName } = company;
      const { companyOrOrganisationName } = buyer;
      
      expectedSendEmailVars = {
        emailAddress: email,
        firstName,
        referenceNumber,
        buyerName: companyOrOrganisationName,
        buyerLocation: buyer.country?.name,
        exporterCompanyName: companyName,
        requestedStartDate: formatDate(policyAndExport.requestedStartDate),
      } as ApplicationSubmissionEmailVariables;
    });

    test('it should call sendEmail.applicationSubmitted.account', async () => {
      await sendApplicationSubmittedEmails.send(application, mockCsvPath);

      expect(applicationSubmittedEmailSpy).toHaveBeenCalledTimes(1);
      expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars);
    });

    test('it should call sendEmail.applicationSubmitted.account with the correct template ID', async () => {
      await sendApplicationSubmittedEmails.send(application, mockCsvPath);

      expect(underwritingTeamEmailSpy).toHaveBeenCalledTimes(1);

      const templateId = getApplicationSubmittedEmailTemplateIds(application).underwritingTeam;

      expect(underwritingTeamEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, mockCsvPath, templateId);
    });

    test('it should call sendEmail.documentsEmail with the correct template ID', async () => {
      await sendApplicationSubmittedEmails.send(application, mockCsvPath);

      expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

      const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

      expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and buyer has exporterHasTradedWithBuyer answer of `Yes`', () => {
      beforeEach(() => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: ANSWERS.NO,
        };

        application.buyer = {
          ...application.buyer,
          exporterHasTradedWithBuyer: ANSWERS.YES,
        };
      });

      test('it should call sendEmail.documentsEmail with the correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(application, mockCsvPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
      });
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and does NOT have exporterHasTradedWithBuyer', () => {
      beforeEach(() => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: ANSWERS.NO,
        };

        application.buyer = {
          ...application.buyer,
          exporterHasTradedWithBuyer: ANSWERS.NO,
        };
      });

      test('it should NOT call sendEmail.documentsEmail', async () => {
        await sendApplicationSubmittedEmails.send(application, mockCsvPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the declaration has an answer of `Yes` for hasAntiBriberyCodeOfConduct and does NOT have exporterHasTradedWithBuyer', () => {
      beforeEach(async () => {
        application.declaration = {
          ...application.declaration,
          hasAntiBriberyCodeOfConduct: ANSWERS.YES,
        };

        application.buyer = {
          ...application.buyer,
          exporterHasTradedWithBuyer: ANSWERS.NO,
        };
      });

      test('it should NOT call sendEmail.documentsEmail', async () => {
        await sendApplicationSubmittedEmails.send(application, mockCsvPath);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = getApplicationSubmittedEmailTemplateIds(application).account;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
      });
    });
  });

  it('should return success=true', async () => {
    const result = await sendApplicationSubmittedEmails.send(application, mockCsvPath);

    const expected = { success: true };

    expect(result).toEqual(expected);
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.applicationSubmitted.account = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendApplicationSubmittedEmails.send(application, mockCsvPath);
      } catch (err) {
        const expected = new Error(`Sending application submitted emails ${mockSendEmailResponse}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
