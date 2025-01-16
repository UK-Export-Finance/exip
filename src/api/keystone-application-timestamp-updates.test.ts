import updateApplication from './helpers/update-application';
import getKeystoneContext from './test-helpers/get-keystone-context';
import applications from './test-helpers/applications';
import buyerHelper from './test-helpers/buyer';
import buyerTradingHistoryHelper from './test-helpers/buyer-trading-history';
import declarations from './test-helpers/declarations';
import policies from './test-helpers/policies';
import { Application, Context } from './types';

describe('Keystone - Application timestamp updates', () => {
  let context: Context;
  let application: Application;

  const updateApplicationTimestampSpy = jest.fn();

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;

    /**
     * Create buyer,
     * associate with the application.
     */
    const buyer = await buyerHelper.create(context, {
      application: {
        connect: { id: application.id },
      },
    });

    /**
     * Create buyer trading history,
     * Associate with the buyer and application
     */
    const buyerTradingHistory = await buyerTradingHistoryHelper.create(context, {
      buyer: {
        connect: { id: buyer.id },
      },
      application: {
        connect: { id: application.id },
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

    /**
     * Create declaration,
     * associate with the application.
     */
    const declaration = await declarations.create(context, {
      application: {
        connect: { id: application.id },
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

    // create exportContract and associate with the application.
    const exportContract = await context.query.ExportContract.createOne({
      context,
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
      declaration: {
        id: declaration.id,
      },
      exportContract: {
        id: exportContract.id,
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
    it('should call updateApplication.timestamp', async () => {
      await context.query.Business.updateOne({
        where: { id: application.businessId },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Broker', () => {
    it('should call updateApplication.timestamp', async () => {
      await context.query.Broker.updateOne({
        where: { id: application.brokerId },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Buyer', () => {
    it('should call updateApplication.timestamp', async () => {
      await context.query.Buyer.updateOne({
        where: { id: application.buyerId },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('BuyerTradingHistory', () => {
    it('should call updateApplication.timestamp', async () => {
      await context.query.BuyerTradingHistory.updateOne({
        where: { id: application.buyer.buyerTradingHistory.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Company', () => {
    it('should call updateApplication.timestamp', async () => {
      await context.query.Company.updateOne({
        where: { id: application.company.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Declaration', () => {
    it('should call updateApplication.timestamp', async () => {
      await context.query.Declaration.updateOne({
        where: { id: application.declaration.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('ExportContract', () => {
    it('should call updateApplication.timestamp', async () => {
      await context.query.ExportContract.updateOne({
        where: { id: application.exportContract.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('Policy', () => {
    it('should call updateApplication.timestamp', async () => {
      await context.query.Policy.updateOne({
        where: { id: application.policy.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });

  describe('SectionReview', () => {
    it('should call updateApplication.timestamp', async () => {
      await context.query.SectionReview.updateOne({
        where: { id: application.sectionReview.id },
        data: {},
        query: 'id',
      });

      assertSpyWasCalled();
    });
  });
});
