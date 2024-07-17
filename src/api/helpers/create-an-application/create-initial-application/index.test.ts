import { addMonths } from 'date-fns';
import initialApplication from '.';
import { APPLICATION } from '../../../constants';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import accounts from '../../../test-helpers/accounts';
import { Context, Account, Application } from '../../../types';

const { DEAL_TYPE, LATEST_VERSION, STATUS, SUBMISSION_COUNT_DEFAULT, SUBMISSION_TYPE } = APPLICATION;

describe('helpers/create-an-application/create-initial-application', () => {
  let context: Context;
  let account: Account;
  let accountId = '';

  let result: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context });

    accountId = account.id;

    result = await initialApplication.create({ context, accountId });
  });

  test('it should return an application with default data', () => {
    expect(result.referenceNumber).toBeDefined();
    expect(typeof result.referenceNumber).toEqual('number');

    expect(result.submissionCount).toEqual(SUBMISSION_COUNT_DEFAULT);

    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
    expect(result.submissionDate).toBeNull();
    expect(result.submissionDeadline).toBeDefined();
    expect(result.submissionType).toEqual(SUBMISSION_TYPE.MIA);
    expect(result.status).toEqual(STATUS.IN_PROGRESS);
    expect(result.previousStatus).toEqual('');

    expect(result.version).toEqual(LATEST_VERSION.VERSION_NUMBER);
    expect(result.dealType).toEqual(DEAL_TYPE);
    expect(result.migratedV1toV2).toBeNull();
  });

  test('it should return empty application relationships', () => {
    expect(result.eligibility).toBeUndefined();
    expect(result.policy).toBeUndefined();
    expect(result.exportContract).toBeUndefined();
    expect(result.owner).toBeUndefined();
    expect(result.business).toBeUndefined();
    expect(result.broker).toBeUndefined();
    expect(result.buyer).toBeUndefined();
    expect(result.company).toBeUndefined();
    expect(result.declaration).toBeUndefined();
    expect(result.nominatedLossPayee).toBeUndefined();
    expect(result.policyContact).toBeUndefined();
    expect(result.sectionReview).toBeUndefined();
  });

  test('it should have a submission deadline date', () => {
    const submissionDeadlineDay = new Date(result.submissionDeadline).getDate();
    const submissionDeadlineMonth = new Date(result.submissionDeadline).getMonth();
    const submissionDeadlineYear = new Date(result.submissionDeadline).getFullYear();

    const now = new Date();

    const expectedDate = addMonths(new Date(now), APPLICATION.SUBMISSION_DEADLINE_IN_MONTHS);

    const expectedDay = new Date(expectedDate).getDate();
    const expectedMonth = new Date(expectedDate).getMonth();
    const expectedYear = new Date(expectedDate).getFullYear();

    expect(submissionDeadlineDay).toEqual(expectedDay);
    expect(submissionDeadlineMonth).toEqual(expectedMonth);
    expect(submissionDeadlineYear).toEqual(expectedYear);
  });

  describe('when a status is provided', () => {
    test('it should return an application with the provided status', async () => {
      const { status } = await initialApplication.create({ context, accountId, status: STATUS.ABANDONED });

      expect(status).toEqual(STATUS.ABANDONED);
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      await expect(initialApplication.create({ context: {}, accountId })).rejects.toThrow(
        `Creating initial application (createInitialApplication helper) for user ${account.id}`,
      );
    });
  });
});
