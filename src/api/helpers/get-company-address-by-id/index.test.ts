import getCompanyAddressById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import company from '../../test-helpers/company';
import { Context, ApplicationCompanyAddress } from '../../types';

describe('helpers/get-company-address-by-id', () => {
  let context: Context;
  let createdAddress: ApplicationCompanyAddress;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdAddress = (await company.createCompanyAddress(context)) as ApplicationCompanyAddress;
  });

  it('should return a company address by ID', async () => {
    const result = await getCompanyAddressById(context, createdAddress.id);

    expect(result.id).toEqual(createdAddress.id);
  });

  describe('when a company address is not found', () => {
    it('should throw an error', async () => {
      try {
        await getCompanyAddressById(context, mockInvalidId);
      } catch (err) {
        const errorMessage = `Getting company address by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
