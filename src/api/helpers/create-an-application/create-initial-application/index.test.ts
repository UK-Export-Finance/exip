import { addMonths } from 'date-fns';
import initialApplication from '.';
import { APPLICATION } from '../../../constants';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import accounts from '../../../test-helpers/accounts';
import { Context, Account, Application } from '../../../types';

const {
  DEAL_TYPE,
  LATEST_VERSION_NUMBER,
  STATUS: { ABANDONED, IN_PROGRESS },
  SUBMISSION_COUNT_DEFAULT,
  SUBMISSION_DEADLINE_IN_MONTHS,
  SUBMISSION_TYPE,
} = APPLICATION;

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

  test('it should return with some empty data/ relationships', () => {
    expect(result.business).toBeUndefined();
    expect(result.broker).toBeUndefined();
    expect(result.buyer).toBeUndefined();
    expect(result.company).toBeUndefined();
    expect(result.declaration).toBeUndefined();
    expect(result.eligibility).toBeUndefined();
    expect(result.exportContract).toBeUndefined();
    expect(result.migratedV1toV2).toBeNull();
    expect(result.nominatedLossPayee).toBeUndefined();
    expect(result.owner).toBeUndefined();
    expect(result.referenceNumber).toBeNull();
    expect(result.policy).toBeUndefined();
    expect(result.policyContact).toBeUndefined();
    expect(result.sectionReview).toBeUndefined();
  });

  test('it should have a default submissionType', () => {
    expect(result.submissionType).toEqual(SUBMISSION_TYPE.MIA);
  });

  test('it should have a default previousStatus', () => {
    expect(result.previousStatus).toEqual('');
  });

  test('it should have a default dealType', () => {
    expect(result.dealType).toEqual(DEAL_TYPE);
  });

  test('it should have a default submissionCount', () => {
    expect(result.submissionCount).toEqual(SUBMISSION_COUNT_DEFAULT);
  });

  test('it should have a default submissionType', () => {
    expect(result.submissionType).toEqual(SUBMISSION_TYPE.MIA);
  });

  describe('when a status is provided', () => {
    test('it should return an application with the provided status', async () => {
      const { status } = await initialApplication.create({ context, accountId, status: ABANDONED });

      expect(status).toEqual(ABANDONED);
    });
  });

  describe('when a status is NOT provided', () => {
    test(`it should return an application with a ${IN_PROGRESS} status`, async () => {
      const { status } = await initialApplication.create({ context, accountId });

      expect(status).toEqual(IN_PROGRESS);
    });
  });

  describe('timestamp fields', () => {
    const now = new Date();

    test('it should have a submission deadline date', () => {
      const submissionDeadlineDay = new Date(result.submissionDeadline).getDate();
      const submissionDeadlineMonth = new Date(result.submissionDeadline).getMonth();
      const submissionDeadlineYear = new Date(result.submissionDeadline).getFullYear();

      const expectedDate = addMonths(new Date(now), SUBMISSION_DEADLINE_IN_MONTHS);

      expect(submissionDeadlineDay).toEqual(new Date(expectedDate).getDate());
      expect(submissionDeadlineMonth).toEqual(new Date(expectedDate).getMonth());
      expect(submissionDeadlineYear).toEqual(new Date(expectedDate).getFullYear());
    });

    test('it should have a createdAt date', () => {
      const createdAtDay = new Date(result.createdAt).getDate();
      const createdAtMonth = new Date(result.createdAt).getMonth();
      const createdAtYear = new Date(result.createdAt).getFullYear();

      expect(createdAtDay).toEqual(new Date().getDate());
      expect(createdAtMonth).toEqual(new Date().getMonth());
      expect(createdAtYear).toEqual(new Date().getFullYear());
    });

    test('it should have updatedAt date', () => {
      const updatedAtDay = new Date(result.updatedAt).getDate();
      const updatedAtMonth = new Date(result.updatedAt).getMonth();
      const updatedAtYear = new Date(result.updatedAt).getFullYear();

      expect(updatedAtDay).toEqual(new Date().getDate());
      expect(updatedAtMonth).toEqual(new Date().getMonth());
      expect(updatedAtYear).toEqual(new Date().getFullYear());
    });
  });

  test('it should have a default latest version number', () => {
    const expected = LATEST_VERSION_NUMBER;

    expect(result.version).toEqual(expected);
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      await expect(initialApplication.create({ context: {}, accountId })).rejects.toThrow(
        `Creating initial application (createInitialApplication helper) for user ${account.id}`,
      );
    });
  });
});
