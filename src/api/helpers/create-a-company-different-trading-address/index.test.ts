import { Context } from '.keystone/types';
import createACompanyDifferentTradingAddress from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import companyHelpers from '../../test-helpers/company';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a company different trading address')).toEqual(true);
};

describe('helpers/create-a-company-different-trading-address', () => {
  let context: Context;
  let company: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    company = (await companyHelpers.createCompany({ context })) as object;
  });

  test('it should return a company different trading address with ID', async () => {
    const result = await createACompanyDifferentTradingAddress(context, company.id);

    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  describe('when an invalid company ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createACompanyDifferentTradingAddress(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createACompanyDifferentTradingAddress({}, company.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
