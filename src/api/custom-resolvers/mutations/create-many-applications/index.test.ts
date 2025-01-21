import createManyApplications from '.';
import { mockAccount } from '../../../test-mocks';
import { Account, Context, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import accounts from '../../../test-helpers/accounts';
import buyer from '../../../test-helpers/buyer';
import application from '../../../test-helpers/applications';
import referenceNumber from '../../../test-helpers/reference-number';

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

  it('should return success=true', async () => {
    result = await createManyApplications({}, variables, context);

    expect(result.success).toEqual(true);
  });

  it(`should return an array of applications`, async () => {
    result = await createManyApplications({}, variables, context);

    const applications = await application.getAll(context);
    const referenceNumbers = await referenceNumber.getAll(context);

    const expected = [
      {
        id: applications[0].id,
        referenceNumber: referenceNumbers.filter((ref) => ref.applicationId === applications[0].id)[0].id,
      },
      {
        id: applications[1].id,
        referenceNumber: referenceNumbers.filter((ref) => ref.applicationId === applications[1].id)[0].id,
      },
      {
        id: applications[2].id,
        referenceNumber: referenceNumbers.filter((ref) => ref.applicationId === applications[2].id)[0].id,
      },
    ];

    expect(result.applications).toEqual(expected);
  });

  describe('when creation is not successful', () => {
    it('should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createManyApplications({}, variables, {});
      } catch (error) {
        const errorString = String(error);

        expect(errorString.includes('Creating many application')).toEqual(true);
      }
    });
  });
});
