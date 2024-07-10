import { addMonths } from 'date-fns';
import { APPLICATION } from './constants';
import getKeystoneContext from './test-helpers/get-keystone-context';
import applications from './test-helpers/applications';
import buyers from './test-helpers/buyers';
import buyerTradingHistoryHelper from './test-helpers/buyer-trading-history';
import policies from './test-helpers/policies';
import { Application, ApplicationBuyer, ApplicationBusiness, Context } from './types';

describe('Keystone - Create an Application', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;

    /**
     * Create buyer trading history,
     * Associate with the application.
     */
    const buyer = (await buyers.create({
      context,
      data: {
        application: {
          connect: { id: application.id },
        },
      },
    })) as ApplicationBuyer;

    /**
     * Create buyer trading history,
     * Associate with the buyer.
     */
    const buyerTradingHistory = await buyerTradingHistoryHelper.create({
      context,
      data: {
        buyer: {
          connect: { id: buyer.id },
        },
      },
    });

    // create policy and associate with the application.
    const policy = await policies.create({
      context,
      data: {
        application: {
          connect: { id: application.id },
        },
      },
    });

    // update the application with buyer and policy IDs.
    await applications.update({
      context,
      applicationId: application.id,
      data: {
        buyer: {
          connect: { id: buyer.id },
          buyerTradingHistory: {
            connect: { id: buyerTradingHistory.id },
          },
        },
        policy: {
          connect: { id: policy.id },
        },
      },
    });

    application = {
      ...application,
      buyer: {
        id: buyer.id,
      },
      policy: {
        id: policy.id,
      },
    };
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

  test('it should have the latest version number', () => {
    const expected = APPLICATION.LATEST_VERSION.VERSION_NUMBER;

    expect(application.version).toEqual(expected);
  });

  test('it should have the deal type', () => {
    const expected = APPLICATION.DEAL_TYPE;

    expect(application.dealType).toEqual(expected);
  });

  test('it should have a default submission count', () => {
    const expected = APPLICATION.SUBMISSION_COUNT_DEFAULT;

    expect(application.submissionCount).toEqual(expected);
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

  test('it should have a default submission type', () => {
    expect(application.submissionType).toEqual(APPLICATION.SUBMISSION_TYPE.MIA);
  });

  test(`it should have a status of ${APPLICATION.STATUS.IN_PROGRESS}`, () => {
    expect(application.status).toEqual(APPLICATION.STATUS.IN_PROGRESS);
  });

  test('it should have a reference number', () => {
    expect(application.referenceNumber).toBeDefined();
    expect(typeof application.referenceNumber).toEqual('number');
  });

  test('it should have a business id', () => {
    expect(application.business).toBeDefined();
    expect(typeof application.business.id).toEqual('string');
  });

  test('it should have a policy contact id', () => {
    expect(application.policyContact.id).toBeDefined();
    expect(typeof application.policyContact.id).toEqual('string');
  });

  test('it should have a broker id', () => {
    expect(application.broker).toBeDefined();
    expect(typeof application.broker.id).toEqual('string');
  });

  test('it should have a declaration id', () => {
    expect(application.declaration).toBeDefined();
    expect(typeof application.declaration.id).toEqual('string');
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

  describe('business entry', () => {
    let business: ApplicationBusiness;

    beforeAll(async () => {
      business = await context.query.Business.findOne({
        where: {
          id: application.business.id,
        },
        query: 'id application { id } turnoverCurrencyCode',
      });
    });
    test('it should add the application ID to the business entry', async () => {
      expect(business.application.id).toEqual(application.id);
    });

    test('it should have a default business.turnoverCurrencyCode', async () => {
      expect(business.turnoverCurrencyCode).toEqual(APPLICATION.DEFAULT_CURRENCY);
    });
  });

  test('it should add the application ID to the broker entry', async () => {
    const broker = await context.query.Broker.findOne({
      where: {
        id: application.broker.id,
      },
      query: 'id application { id }',
    });

    expect(broker.application.id).toEqual(application.id);
  });

  test('it should add the application ID to the declaration entry', async () => {
    const declaration = await context.query.Declaration.findOne({
      where: {
        id: application.declaration.id,
      },
      query: 'id application { id }',
    });

    expect(declaration.application.id).toEqual(application.id);
  });
});
