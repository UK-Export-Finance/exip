import updateApplication from './helpers/update-application';
import getKeystoneContext from './test-helpers/get-keystone-context';
import applications from './test-helpers/applications';
import buyers from './test-helpers/buyers';
import buyerTradingHistoryHelper from './test-helpers/buyer-trading-history';
import policies from './test-helpers/policies';
import { Application, BuyerTradingHistory, Context } from './types';

describe('Keystone - Application timestamp updates', () => {
  let context: Context;
  let application: Application;

  const updateApplicationTimestampSpy = jest.fn();

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;

    // create buyer and associate with the application.
    const buyer = await buyers.create({
      context,
      data: {
        application: {
          connect: { id: application.id },
        },
      },
    });

    /**
     * Create buyer trading history,
     * Associate with the buyer and application
     */
    const buyerTradingHistory = (await buyerTradingHistoryHelper.create({
      context,
      data: {
        buyer: {
          connect: { id: buyer.id },
        },
        application: {
          connect: { id: application.id },
        },
      },
    })) as BuyerTradingHistory;

    // create policy and associate with the application.
    const policy = await policies.create({
      context,
      data: {
        application: {
          connect: { id: application.id },
        },
      },
    });

    // create company and associate with the application.
    const company = await context.query.Company.createOne({
      data: {
        application: {
          connect: { id: application.id },
        },
      },
    });

    const sectionReview = await context.query.SectionReview.createOne({
      data: {
        application: {
          connect: { id: application.id },
        },
      },
    });

    application = {
      ...application,
      buyer: {
        ...buyer,
        buyerTradingHistory,
      },
      company: {
        id: company.id,
      },
      policy: {
        id: policy.id,
      },
      sectionReview: {
        id: sectionReview.id,
      },
    };
  });

  beforeEach(() => {
    jest.resetAllMocks();

    jest.mock('./helpers/update-application');

    updateApplication.timestamp = updateApplicationTimestampSpy;
  });

  const assertSpyWasCalled = () => {
    expect(updateApplicationTimestampSpy).toHaveBeenCalledTimes(1);
    expect(updateApplicationTimestampSpy).toHaveBeenCalledWith(context, application.id);
  };

  describe('Business', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Business.updateOne({
        where: { id: application.business.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Broker', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Broker.updateOne({
        where: { id: application.broker.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Buyer', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Buyer.updateOne({
        where: { id: application.buyer.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('BuyerTradingHistory', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.BuyerTradingHistory.updateOne({
        where: { id: application.buyer.buyerTradingHistory.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Company', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Company.updateOne({
        where: { id: application.company.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Declaration', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Declaration.updateOne({
        where: { id: application.declaration.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('ExportContract', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.ExportContract.updateOne({
        where: { id: application.exportContract.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Policy', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.Policy.updateOne({
        where: { id: application.policy.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('SectionReview', () => {
    test('it should call updateApplication.timestamp', async () => {
      await context.query.SectionReview.updateOne({
        where: { id: application.sectionReview.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });
});
