import getCompanyDifferentTradingAddressById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import company from '../../test-helpers/company';
import { Context, ApplicationCompanyDifferentTradingAddress } from '../../types';

describe('helpers/get-company-different-trading-address-by-id', () => {
  let context: Context;
  let createdTradingAddress: ApplicationCompanyDifferentTradingAddress;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    const createdCompany = await company.createCompany(context);

    createdTradingAddress = (await company.createCompanyDifferentTradingAddress(context, createdCompany.id)) as ApplicationCompanyDifferentTradingAddress;
  });

  it('should return a company different trading address by ID', async () => {
    const result = await getCompanyDifferentTradingAddressById(context, createdTradingAddress.id);

    expect(result.id).toEqual(createdTradingAddress.id);
  });

  describe('when a company different trading address is not found', () => {
    it('should throw an error', async () => {
      try {
        await getCompanyDifferentTradingAddressById(context, mockInvalidId);
      } catch (err) {
        const errorMessage = `Getting company different trading address by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
