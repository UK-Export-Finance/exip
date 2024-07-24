import createAnAbandonedApplication from '.';
import { mockAccount, mockCountries, mockInvalidId } from '../../../test-mocks';
import mockCompany from '../../../test-mocks/mock-company';
import { Account, Context, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import accounts from '../../../test-helpers/accounts';
import { APPLICATION } from '../../../constants';

const { STATUS } = APPLICATION;

describe('custom-resolvers/create-an-abandoned-application', () => {
  let context: Context;
  let account: Account;
  let result: SuccessResponse;

  const { status, ...mockAccountUpdate } = mockAccount;

  const variables = {
    accountId: '',
    eligibilityAnswers: {
      buyerCountryIsoCode: mockCountries[0].isoCode,
      hasCompaniesHouseNumber: true,
    },
    company: mockCompany,
    sectionReview: {
      eligibility: true,
    },
  };

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context, data: mockAccountUpdate });

    variables.accountId = account.id;
  });

  test('it should return success=true', async () => {
    result = await createAnAbandonedApplication({}, variables, context);

    expect(result.success).toEqual(true);
  });

  test(`it should return status as ${STATUS.ABANDONED}`, async () => {
    result = await createAnAbandonedApplication({}, variables, context);

    expect(result.status).toEqual(STATUS.ABANDONED);
  });

  describe('when there is no account for the provided accountId', () => {
    test('it should return success=false', async () => {
      variables.accountId = mockInvalidId;

      result = await createAnAbandonedApplication({}, variables, context);

      expect(result.success).toEqual(false);
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      await expect(createAnAbandonedApplication({}, variables, {})).rejects.toThrow('Creating an abandoned application');
    });
  });
});
