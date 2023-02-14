import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import { addMonths } from 'date-fns';
import baseConfig from './keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { ACCOUNT, APPLICATION, EMAIL_TEMPLATE_IDS } from './constants';
import notify from './integrations/notify';
import { Application, Account } from './types';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule);

describe('Create an Application', () => {
  let application: Application;

  beforeAll(async () => {
    application = (await context.query.Application.createOne({
      data: {},
      query:
        'id createdAt updatedAt referenceNumber submissionDeadline submissionType eligibility { id } policyAndExport { id } exporterCompany { id } exporterBusiness { id }',
    })) as Application;
  });

  test('it should have an ID', () => {
    expect(application.id).toBeDefined();
    expect(typeof application.id).toEqual('string');
  });

  test('it should have created and updated dates', () => {
    const createdAtDay = new Date(application.createdAt).getDate();
    const createdAtMonth = new Date(application.createdAt).getMonth();
    const createdAtYear = new Date(application.createdAt).getFullYear();

    const expectedDay = new Date().getDate();
    const expectedMonth = new Date().getMonth();
    const expectedYear = new Date().getFullYear();

    expect(createdAtDay).toEqual(expectedDay);
    expect(createdAtMonth).toEqual(expectedMonth);
    expect(createdAtYear).toEqual(expectedYear);

    const updatedAtDay = new Date(application.updatedAt).getDate();
    const updatedAtMonth = new Date(application.updatedAt).getMonth();
    const updatedAtYear = new Date(application.updatedAt).getFullYear();

    expect(updatedAtDay).toEqual(expectedDay);
    expect(updatedAtMonth).toEqual(expectedMonth);
    expect(updatedAtYear).toEqual(expectedYear);
  });

  test('it should have a submission deadline date', () => {
    const submissionDeadlineDay = new Date(application.submissionDeadline).getDate();
    const submissionDeadlineMonth = new Date(application.submissionDeadline).getMonth();
    const submissionDeadlineYear = new Date(application.submissionDeadline).getFullYear();

    const now = new Date();

    const expectedDate = addMonths(new Date(now), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);

    const expectedDay = new Date(expectedDate).getDate();
    const expectedMonth = new Date(expectedDate).getMonth();
    const expectedYear = new Date(expectedDate).getFullYear();

    expect(submissionDeadlineDay).toEqual(expectedDay);
    expect(submissionDeadlineMonth).toEqual(expectedMonth);
    expect(submissionDeadlineYear).toEqual(expectedYear);
  });

  test('it should have a reference number', () => {
    expect(application.referenceNumber).toBeDefined();
    expect(typeof application.referenceNumber).toEqual('number');
  });

  test('it should have a policy and export id', () => {
    expect(application.policyAndExport).toBeDefined();
    expect(typeof application.policyAndExport.id).toEqual('string');
  });

  test('it should have an exporter company id', () => {
    expect(application.exporterCompany).toBeDefined();
    expect(typeof application.exporterCompany.id).toEqual('string');
  });

  test('it should have an exporter business id', () => {
    expect(application.exporterBusiness).toBeDefined();
    expect(typeof application.exporterBusiness.id).toEqual('string');
  });

  test('it should have a default submission type', () => {
    expect(application.submissionType).toEqual(APPLICATION.SUBMISSION_TYPE.MIA);
  });

  test('it should have generated an eligibility entry and add the ID to the application', async () => {
    const allEligibilityEntires = await context.query.Eligibility.findMany();
    const lastEligibilityEntry = allEligibilityEntires[allEligibilityEntires.length - 1];

    const expected = lastEligibilityEntry.id;

    expect(application.eligibility.id).toEqual(expected);
  });

  test('it should add the application ID to the reference number entry', async () => {
    const referenceNumber = await context.query.ReferenceNumber.findOne({
      where: {
        id: application.referenceNumber.toString(),
      },
      query: 'id application { id }',
    });

    expect(referenceNumber.application.id).toEqual(application.id);
  });

  test('it should add the application ID to the policy and export entry', async () => {
    const policyAndExport = await context.query.PolicyAndExport.findOne({
      where: {
        id: application.policyAndExport.id,
      },
      query: 'id application { id }',
    });

    expect(policyAndExport.application.id).toEqual(application.id);
  });

  test('it should add the application ID to the exporter company entry', async () => {
    const exporterCompany = await context.query.ExporterCompany.findOne({
      where: {
        id: application.exporterCompany.id,
      },
      query: 'id application { id }',
    });

    expect(exporterCompany.application.id).toEqual(application.id);
  });

  test('it should add the exporter company ID to the exporter company address entry', async () => {
    const exporterCompany = await context.query.ExporterCompany.findOne({
      where: {
        id: application.exporterCompany.id,
      },
      query: 'id application { id } registeredOfficeAddress { id }',
    });

    const exporterCompanyAddress = await context.query.ExporterCompanyAddress.findOne({
      where: {
        id: exporterCompany.registeredOfficeAddress.id,
      },
      query: 'id exporterCompany { id }',
    });

    expect(exporterCompanyAddress.exporterCompany.id).toEqual(application.exporterCompany.id);
  });

  test('it should add the application ID to the policy and export entry', async () => {
    const exporterBusiness = await context.query.ExporterBusiness.findOne({
      where: {
        id: application.exporterBusiness.id,
      },
      query: 'id application { id }',
    });

    expect(exporterBusiness.application.id).toEqual(application.id);
  });
});

describe('Create an Exporter', () => {
  let exporter: Account;

  let mockAccountInputData = {
    firstName: 'First',
    lastName: 'Last',
    email: process.env.GOV_NOTIFY_API_KEY,
    salt: 'mockSalt',
    hash: 'mockHash',
    verificationHash: 'mockVerificationHash',
    verificationExpiry: ACCOUNT.EMAIL.VERIFICATION_EXPIRY(),
  };

  const sendEmailSpySuccessSpy = jest.fn(() => Promise.resolve({ success: true }));

  let sendEmailSpy = sendEmailSpySuccessSpy;

  describe('create', () => {
    jest.mock('./integrations/notify');

    beforeAll(async () => {
      notify.sendEmail = sendEmailSpy;

      exporter = (await context.query.Exporter.createOne({
        data: mockAccountInputData,
        query: 'id createdAt updatedAt firstName lastName email salt hash isVerified verificationHash verificationExpiry',
      })) as Account;
    });

    test('it should have an ID', () => {
      expect(exporter.id).toBeDefined();
      expect(typeof exporter.id).toEqual('string');
    });

    test('it should have created and updated dates', () => {
      const createdAtDay = new Date(exporter.createdAt).getDate();
      const createdAtMonth = new Date(exporter.createdAt).getMonth();
      const createdAtYear = new Date(exporter.createdAt).getFullYear();

      const expectedDay = new Date().getDate();
      const expectedMonth = new Date().getMonth();
      const expectedYear = new Date().getFullYear();

      expect(createdAtDay).toEqual(expectedDay);
      expect(createdAtMonth).toEqual(expectedMonth);
      expect(createdAtYear).toEqual(expectedYear);

      const updatedAtDay = new Date(exporter.updatedAt).getDate();
      const updatedAtMonth = new Date(exporter.updatedAt).getMonth();
      const updatedAtYear = new Date(exporter.updatedAt).getFullYear();

      expect(updatedAtDay).toEqual(expectedDay);
      expect(updatedAtMonth).toEqual(expectedMonth);
      expect(updatedAtYear).toEqual(expectedYear);
    });

    test('it should call notify.sendEmail', () => {
      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith(
        EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL,
        mockAccountInputData.email,
        mockAccountInputData.firstName,
        mockAccountInputData.verificationHash,
      );
    });
  });

  describe('update', () => {
    const update = { firstName: 'Updated' };

    beforeAll(async () => {
      mockAccountInputData = {
        ...mockAccountInputData,
        ...update,
      };

      sendEmailSpy = sendEmailSpySuccessSpy;
      notify.sendEmail = sendEmailSpy;

      exporter = (await context.query.Exporter.createOne({
        data: mockAccountInputData,
        query: 'id',
      })) as Account;

      exporter = (await context.query.Exporter.updateOne({
        where: { id: exporter.id },
        data: mockAccountInputData,
        query: 'id createdAt updatedAt firstName lastName email salt hash isVerified verificationHash verificationExpiry',
      })) as Account;
    });

    test('it should update the provided fields', () => {
      expect(exporter.firstName).toEqual(update.firstName);
    });

    test('it should update updatedAt', () => {
      expect(exporter.updatedAt).not.toEqual(exporter.createdAt);
    });
  });
});
