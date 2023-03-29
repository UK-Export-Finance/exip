import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import sendApplicationSubmittedEmails from '.';
import baseConfig from '../../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import sendEmail from '../index';
import { mockAccount, mockBuyer, mockApplicationDeclaration, mockSendEmailResponse } from '../../test-mocks';
import { Account, Application, ApplicationBuyer, ApplicationDeclaration, ApplicationSubmissionEmailVariables } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('emails/send-email-application-submitted', () => {
  let exporter: Account;
  let application: Application;
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
      query: 'id referenceNumber buyer { id } declaration { id }',
    })) as Application;

    buyer = (await context.query.Buyer.updateOne({
      where: { id: application.buyer.id },
      data: mockBuyer,
      query: 'id companyOrOrganisationName',
    })) as ApplicationBuyer;

    declaration = (await context.query.Declaration.updateOne({
      where: { id: application.declaration.id },
      data: mockApplicationDeclaration,
      query: 'id',
    })) as ApplicationDeclaration;

    jest.resetAllMocks();

    applicationSubmittedEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    documentsEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.applicationSubmittedEmail = applicationSubmittedEmailSpy;
    sendEmail.documentsEmail = documentsEmailSpy;
  });

  describe('emails', () => {
    let expectedSendEmailVars: ApplicationSubmissionEmailVariables;

    beforeEach(() => {
      const { email, firstName } = exporter;
      const { referenceNumber } = application;
      const { companyOrOrganisationName } = buyer;

      expectedSendEmailVars = {
        emailAddress: email,
        firstName,
        referenceNumber,
        buyerName: companyOrOrganisationName,
      } as ApplicationSubmissionEmailVariables;
    });

    test('it should call sendEmail.applicationSubmittedEmail', async () => {
      await sendApplicationSubmittedEmails(context, application.referenceNumber, exporter.id, buyer.id, declaration.id);

      expect(applicationSubmittedEmailSpy).toHaveBeenCalledTimes(1);
      expect(applicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars);
    });

    test('it should call sendEmail.documentsEmail', async () => {
      await sendApplicationSubmittedEmails(context, application.referenceNumber, exporter.id, buyer.id, declaration.id);

      expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

      const useAntiBriberyAndTradingHistoryTemplate = true;

      expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, useAntiBriberyAndTradingHistoryTemplate);
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct', () => {
      beforeEach(async () => {
        declaration = (await context.query.Declaration.updateOne({
          where: { id: application.declaration.id },
          data: {
            hasAntiBriberyCodeOfConduct: 'No',
          },
          query: 'id',
        })) as ApplicationDeclaration;
      });

      test('it should call sendEmail.documentsEmail without a template flag', async () => {
        await sendApplicationSubmittedEmails(context, application.referenceNumber, exporter.id, buyer.id, declaration.id);

        expect(documentsEmailSpy).toHaveBeenCalledTimes(1);

        expect(documentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars);
      });
    });
  });

  it('should return the email response', async () => {
    const result = await sendApplicationSubmittedEmails(context, application.referenceNumber, exporter.id, buyer.id, declaration.id);

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

      const result = await sendApplicationSubmittedEmails(context, application.referenceNumber, exporter.id, buyer.id, declaration.id);

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

      const result = await sendApplicationSubmittedEmails(context, application.referenceNumber, exporter.id, buyer.id, declaration.id);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.applicationSubmittedEmail = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendApplicationSubmittedEmails(context, application.referenceNumber, exporter.id, buyer.id, declaration.id);
      } catch (err) {
        const expected = new Error(`Sending application submitted emails to exporter ${mockSendEmailResponse}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
