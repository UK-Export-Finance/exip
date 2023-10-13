import { addMonths } from 'date-fns';
import { APPLICATION } from './constants';
import updateApplication from './helpers/update-application';
import accounts from './test-helpers/accounts';
import getKeystoneContext from './test-helpers/get-keystone-context';
import applications from './test-helpers/applications';
import buyers from './test-helpers/buyers';
import policies from './test-helpers/policies';
import { mockAccount } from './test-mocks';
import { Application, Account, Context } from './types';

describe('Create an Application', () => {
  let context: Context;
  let application: Application;

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

  test('it should have a exportContract id', () => {
    expect(application.exportContract).toBeDefined();
    expect(typeof application.exportContract.id).toEqual('string');
  });

  test('it should have a company id', () => {
    expect(application.company).toBeDefined();
    expect(typeof application.company.id).toEqual('string');
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

  test('it should have a sectionReview id', () => {
    expect(application.sectionReview).toBeDefined();
    expect(typeof application.sectionReview.id).toEqual('string');
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

  test('it should add the application ID to the business entry', async () => {
    const business = await context.query.Business.findOne({
      where: {
        id: application.business.id,
      },
      query: 'id application { id }',
    });

    expect(business.application.id).toEqual(application.id);
  });

  test('it should add an application ID and default finalDestinationKnown field to the exportContract entry', async () => {
    const exportContract = await context.query.ExportContract.findOne({
      where: {
        id: application.exportContract.id,
      },
      query: 'id application { id } finalDestinationKnown',
    });

    expect(exportContract.application.id).toEqual(application.id);
    expect(exportContract.finalDestinationKnown).toEqual(true);
  });

  test('it should add the application ID to the company entry', async () => {
    const company = await context.query.Company.findOne({
      where: {
        id: application.company.id,
      },
      query: 'id application { id }',
    });

    expect(company.application.id).toEqual(application.id);
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

  test('it should add the company ID to the company address entry', async () => {
    const company = await context.query.Company.findOne({
      where: {
        id: application.company.id,
      },
      query: 'id application { id } registeredOfficeAddress { id }',
    });

    const companyAddress = await context.query.CompanyAddress.findOne({
      where: {
        id: company.registeredOfficeAddress.id,
      },
      query: 'id company { id }',
    });

    expect(companyAddress.company.id).toEqual(application.company.id);
  });

  test('it should add the application ID to the sectionReview entry', async () => {
    const sectionReview = await context.query.SectionReview.findOne({
      where: {
        id: application.sectionReview.id,
      },
      query: 'id application { id }',
    });

    expect(sectionReview.application.id).toEqual(application.id);
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

describe('Account', () => {
  let context: Context;
  let account: Account;

  describe('create', () => {
    beforeAll(async () => {
      context = getKeystoneContext();

      await accounts.create({ context });
    });

    describe('when an account already exists with the provided email', () => {
      test('it should not create the account', async () => {
        const response = (await accounts.create({ context, data: mockAccount, deleteAccounts: false })) as Account;

        expect(response.id).toBeUndefined();
        expect(response.email).toBeUndefined();

        const allAccounts = await context.query.Account.findMany();

        expect(allAccounts.length).toEqual(1);
      });
    });
  });

  describe('update', () => {
    let updatedAccount: Account;

    const accountUpdate = { firstName: 'Updated' };

    beforeAll(async () => {
      account = await accounts.create({ context });

      updatedAccount = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: accountUpdate,
        query: 'id createdAt updatedAt firstName lastName email salt hash isVerified verificationHash verificationExpiry',
      })) as Account;
    });

    test('it should update the provided fields', () => {
      expect(updatedAccount.firstName).toEqual(accountUpdate.firstName);
    });

    test('it should update updatedAt', () => {
      expect(updatedAccount.updatedAt).not.toEqual(account.createdAt);
    });
  });
});

describe('Application timestamp updates', () => {
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

    // create policy and associate with the application.
    const policy = await policies.create({
      context,
      data: {
        application: {
          connect: { id: application.id },
        },
      },
    });

    // update the application with buyer ID.
    await applications.update({
      context,
      applicationId: application.id,
      data: {
        buyer: {
          connect: { id: buyer.id },
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

  beforeEach(() => {
    jest.resetAllMocks();

    jest.mock('./helpers/update-application');

    updateApplication.timestamp = updateApplicationTimestampSpy;
  });

  const assertSpyWasCalled = () => {
    expect(updateApplicationTimestampSpy).toHaveBeenCalledTimes(1);
    expect(updateApplicationTimestampSpy).toHaveBeenCalledWith(context, application.id);
  };

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
});
