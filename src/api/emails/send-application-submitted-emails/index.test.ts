import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import sendApplicationSubmittedEmails from '.';
import baseConfig from '../../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import sendEmail from '../index';
import { ANSWERS, EMAIL_TEMPLATE_IDS } from '../../constants';
import { mockAccount, mockBuyer, mockApplicationDeclaration, mockExporterCompany, mockSendEmailResponse } from '../../test-mocks';
import { Account, Application, ApplicationBuyer, ApplicationDeclaration, ApplicationSubmissionEmailVariables, ApplicationExporterCompany } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('emails/send-email-application-submitted', () => {
  let exporter: Account;
  let application: Application;
  let exporterCompany: ApplicationExporterCompany;
  let buyer: ApplicationBuyer;
  let declaration: ApplicationDeclaration;

  jest.mock('./index');

  let applicationSubmittedEmailSpy = jest.fn();
  let documentsEmailSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    // create a new exporter
    exporter = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id firstName lastName email salt hash verificationHash',
    })) as Account;

    // create a new application
    application = (await context.query.Application.createOne({
      data: {},
      query: 'id referenceNumber exporterCompany { id } buyer { id } declaration { id }',
    })) as Application;

    // create a new exporter company
    exporterCompany = (await context.query.ExporterCompany.updateOne({
      where: { id: application.exporterCompany.id },
      data: mockExporterCompany,
      query: 'id companyName',
    })) as ApplicationExporterCompany;

    // create a new buyer
    buyer = (await context.query.Buyer.updateOne({
      where: { id: application.buyer.id },
      data: mockBuyer,
      query: 'id companyOrOrganisationName',
    })) as ApplicationBuyer;

    // create a new declaration
    declaration = (await context.query.Declaration.updateOne({
      where: { id: application.declaration.id },
      data: mockApplicationDeclaration,
      query: 'id',
    })) as ApplicationDeclaration;

    jest.resetAllMocks();

    applicationSubmittedEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    documentsEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.applicationSubmitted.exporter = applicationSubmittedEmailSpy;
    sendEmail.documentsEmail = documentsEmailSpy;
  });

  describe('emails', () => {
    let expectedSendEmailVars: ApplicationSubmissionEmailVariables;

    beforeEach(() => {
      const { email, firstName } = exporter;
      const { referenceNumber } = application;
      const { companyName } = exporterCompany;
      const { companyOrOrganisationName } = buyer;

      expectedSendEmailVars = {
        emailAddress: email,
        firstName,
        referenceNumber,
        buyerName: companyOrOrganisationName,
        exporterCompanyName: companyName,
        // TODO: EMS-1273 to remove below
        linkToFile: '',
      } as ApplicationSubmissionEmailVariables;
    });

    test('it should call sendEmail.applicationSubmitted.exporter', async () => {
      await sendApplicationSubmittedEmails.send(context, application.referenceNumber, exporter.id, buyer.id, declaration.id, exporterCompany.id);

      expect(applicationSubmittedEmailSpy).toHaveBeenCalledTimes(1);
      expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars);
    });

    test('it should call sendEmail.documentsEmail with correct template ID ', async () => {
      await sendApplicationSubmittedEmails.send(context, application.referenceNumber, exporter.id, buyer.id, declaration.id, exporterCompany.id);

      expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY_AND_TRADING_HISTORY;

      expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and buyer has exporterIsConnectedWithBuyer', () => {
      beforeEach(async () => {
        declaration = (await context.query.Declaration.updateOne({
          where: { id: application.declaration.id },
          data: {
            hasAntiBriberyCodeOfConduct: ANSWERS.NO,
          },
        })) as ApplicationDeclaration;
      });

      test('it should call sendEmail.documentsEmail with correct template ID', async () => {
        await sendApplicationSubmittedEmails.send(context, application.referenceNumber, exporter.id, buyer.id, declaration.id, exporterCompany.id);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.TRADING_HISTORY;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
      });
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct and does NOT have exporterIsConnectedWithBuyer', () => {
      beforeEach(async () => {
        declaration = (await context.query.Declaration.updateOne({
          where: { id: application.declaration.id },
          data: {
            hasAntiBriberyCodeOfConduct: ANSWERS.NO,
          },
        })) as ApplicationDeclaration;

        buyer = (await context.query.Buyer.updateOne({
          where: { id: application.buyer.id },
          data: {
            exporterIsConnectedWithBuyer: ANSWERS.NO,
          },
        })) as ApplicationDeclaration;
      });

      test('it should NOT call sendEmail.documentsEmail', async () => {
        await sendApplicationSubmittedEmails.send(context, application.referenceNumber, exporter.id, buyer.id, declaration.id, exporterCompany.id);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the declaration has an answer of `Yes` for hasAntiBriberyCodeOfConduct and does NOT have exporterIsConnectedWithBuyer', () => {
      beforeEach(async () => {
        declaration = (await context.query.Declaration.updateOne({
          where: { id: application.declaration.id },
          data: {
            hasAntiBriberyCodeOfConduct: ANSWERS.YES,
          },
        })) as ApplicationDeclaration;

        buyer = (await context.query.Buyer.updateOne({
          where: { id: application.buyer.id },
          data: {
            exporterIsConnectedWithBuyer: ANSWERS.NO,
          },
        })) as ApplicationDeclaration;
      });

      test('it should NOT call sendEmail.documentsEmail', async () => {
        await sendApplicationSubmittedEmails.send(context, application.referenceNumber, exporter.id, buyer.id, declaration.id, exporterCompany.id);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SEND_DOCUMENTS.ANTI_BRIBERY;

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, templateId);
      });
    });
  });

  it('should return the email response', async () => {
    const result = await sendApplicationSubmittedEmails.send(context, application.referenceNumber, exporter.id, buyer.id, declaration.id, exporterCompany.id);

    const expected = {
      success: true,
      emailRecipient: mockAccount.email,
    };

    expect(result).toEqual(expected);
  });

  describe('when no exporter is found', () => {
    test('it should return success=false', async () => {
      // wipe the exporter table so we have a clean slate.
      const exporters = await context.query.Exporter.findMany();

      await context.query.Exporter.deleteMany({
        where: exporters,
      });

      const result = await sendApplicationSubmittedEmails.send(context, application.referenceNumber, exporter.id, buyer.id, declaration.id, exporterCompany.id);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('when no buyer is found', () => {
    test('it should return success=false', async () => {
      // wipe the buyer table so we have a clean slate.
      const buyers = await context.query.Buyer.findMany();

      await context.query.Buyer.deleteMany({
        where: buyers,
      });

      const result = await sendApplicationSubmittedEmails.send(context, application.referenceNumber, exporter.id, buyer.id, declaration.id, exporterCompany.id);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.applicationSubmitted.exporter = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendApplicationSubmittedEmails.send(context, application.referenceNumber, exporter.id, buyer.id, declaration.id, exporterCompany.id);
      } catch (err) {
        const expected = new Error(`Sending application submitted emails ${mockSendEmailResponse}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
