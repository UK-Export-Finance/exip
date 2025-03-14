import createACompanyDifferentTradingAddress from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import companyHelpers from '../../test-helpers/company';
import { Context } from '../../types';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating a company different trading address')).toEqual(true);
};

describe('helpers/create-a-company-different-trading-address', () => {
  let context: Context;
  let company: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    company = (await companyHelpers.createCompany(context)) as object;
  });

  it('should return a company different trading address with ID', async () => {
    const result = await createACompanyDifferentTradingAddress(context, company.id);

    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  describe('when an invalid company ID is passed', () => {
    it('should throw an error', async () => {
      try {
        await createACompanyDifferentTradingAddress(context, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    it('should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createACompanyDifferentTradingAddress({}, company.id);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
