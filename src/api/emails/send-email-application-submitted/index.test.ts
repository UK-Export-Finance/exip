import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import sendEmailApplicationSubmitted from '.';
import baseConfig from '../../keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import sendEmail from '../index';
import { mockAccount, mockSendEmailResponse } from '../../test-mocks';
import { Account, Application, ApplicationBuyer } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('emails/send-email-application-submitted', () => {
  let exporter: Account;
  let application: Application;
  let buyer: ApplicationBuyer;

  jest.mock('./index');

  let sendEmailApplicationSubmittedSpy = jest.fn();

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
      query: 'id referenceNumber buyer { id }',
    })) as Application;

    const mockBuyer = {
      companyOrOrganisationName: 'Mock buyer',
    };

    buyer = (await context.query.Buyer.updateOne({
      where: { id: application.buyer.id },
      data: mockBuyer,
      query: 'id companyOrOrganisationName',
    })) as ApplicationBuyer;

    jest.resetAllMocks();

    sendEmailApplicationSubmittedSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.applicationSubmittedEmail = sendEmailApplicationSubmittedSpy;
  });

  test('it should call sendEmail.applicationSubmittedEmail', async () => {
    await sendEmailApplicationSubmitted(context, exporter.id, buyer.id, application.referenceNumber);

    const { email, firstName } = exporter;
    const { referenceNumber } = application;
    const { companyOrOrganisationName } = buyer;

    expect(sendEmailApplicationSubmittedSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailApplicationSubmittedSpy).toHaveBeenCalledWith(email, firstName, referenceNumber, companyOrOrganisationName);
  });

  it('should return the email response', async () => {
    const result = await sendEmailApplicationSubmitted(context, exporter.id, buyer.id, application.referenceNumber);

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

      const result = await sendEmailApplicationSubmitted(context, exporter.id, buyer.id, application.referenceNumber);

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

      const result = await sendEmailApplicationSubmitted(context, exporter.id, buyer.id, application.referenceNumber);

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
        await sendEmailApplicationSubmitted(context, exporter.id, buyer.id, application.referenceNumber);
      } catch (err) {
        const expected = new Error(`Sending email to exporter - application submitted ${mockSendEmailResponse}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
