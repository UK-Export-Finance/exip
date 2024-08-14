import createManyApplications from '.';
import { mockAccount } from '../../../test-mocks';
import { Account, Context, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import accounts from '../../../test-helpers/accounts';
import buyer from '../../../test-helpers/buyer';
import application from '../../../test-helpers/applications';
import referenceNumber from '../../../test-helpers/reference-number';
import { APPLICATION } from '../../../constants';

const { STATUS } = APPLICATION;

describe('custom-resolvers/create-many-applications', () => {
  let context: Context;
  let account: Account;
  let result: SuccessResponse;

  const { status, ...mockAccountUpdate } = mockAccount;

  const variables = {
    accountId: '',
    count: 3,
  };

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context, data: mockAccountUpdate });

    variables.accountId = account.id;
  });

  beforeEach(async () => {
    await buyer.deleteAll(context);
    await application.deleteAll(context);
    await referenceNumber.deleteAll(context);
  });

  test('it should return success=true', async () => {
    result = await createManyApplications({}, variables, context);

    expect(result.success).toEqual(true);
  });

  test(`it should return an array of applications`, async () => {
    result = await createManyApplications({}, variables, context);

    const buyers = await buyer.getAll(context);
    const applications = await application.getAll(context);
    const referenceNumbers = await referenceNumber.getAll(context);

    const shared = {
      createdAt: null,
      updatedAt: null,
      eligibilityId: null,
      submissionDate: null,
      submissionDeadline: null,
      submissionType: null,
      submissionCount: 0,
      status: STATUS.IN_PROGRESS,
      previousStatus: '',
      policyId: null,
      exportContractId: null,
      ownerId: account.id,
      businessId: null,
      brokerId: null,
      buyerId: buyers[0].id,
      companyId: null,
      declarationId: null,
      nominatedLossPayeeId: null,
      policyContactId: null,
      sectionReviewId: null,
      version: '2',
      dealType: 'EXIP',
      migratedV1toV2: null,
    };

    const expected = [
      {
        ...shared,
        id: applications[0].id,
        referenceNumber: referenceNumbers.filter((ref) => ref.applicationId === applications[0].id)[0].id,
      },
      {
        ...shared,
        id: applications[1].id,
        referenceNumber: referenceNumbers.filter((ref) => ref.applicationId === applications[1].id)[0].id,
      },
      {
        ...shared,
        id: applications[2].id,
        referenceNumber: referenceNumbers.filter((ref) => ref.applicationId === applications[2].id)[0].id,
      },
    ];

    expect(result.applications).toEqual(expected);
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createManyApplications({}, variables, {});
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Creating many application')).toEqual(true);
      }
    });
  });
});
