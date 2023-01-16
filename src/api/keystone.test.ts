import { getContext } from '@keystone-6/core/context';
import { addMonths } from 'date-fns';
import baseConfig from './keystone';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { APPLICATION } from './constants';
import { Application } from './types';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

const context = getContext(config, PrismaModule);

describe('Create an Application', () => {
  let application: Application;

  beforeAll(async () => {
    application = (await context.query.Application.createOne({
      data: {},
      query: 'id createdAt updatedAt referenceNumber submissionDeadline submissionType eligibility { id } policyAndExport { id } exporterCompany { id }',
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
});
