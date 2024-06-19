import { Context } from '.keystone/types';
import createACompanyAddress from '.';
import { mockCompany } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import companyHelpers from '../../test-helpers/company';

const { registeredOfficeAddress: mockAddress } = mockCompany;

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a company address')).toEqual(true);
};

describe('helpers/create-a-company-address', () => {
  let context: Context;
  let company: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    company = (await companyHelpers.createCompany({ context })) as object;
  });

  test('it should return a company address with ID', async () => {
    const result = await createACompanyAddress(context, mockAddress, company.id);

    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);

    expect(result.addressLine1).toEqual(mockAddress.addressLine1);
    expect(result.addressLine2).toEqual(mockAddress.addressLine2);
    expect(result.careOf).toEqual(mockAddress.careOf);
    expect(result.locality).toEqual(mockAddress.locality);
    expect(result.region).toEqual(mockAddress.region);
    expect(result.postalCode).toEqual(mockAddress.postalCode);
    expect(result.country).toEqual(mockAddress.country);
    expect(result.premises).toEqual(mockAddress.premises);
  });

  describe('when an invalid company ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createACompanyAddress(context, mockAddress, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createACompanyAddress({}, mockAddress, company.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
