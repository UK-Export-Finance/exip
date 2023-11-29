import createACompany from '.';
import { mockCompany } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a company, address and SIC codes')).toEqual(true);
};

describe('helpers/create-a-company', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
  });

  test('it should return a company with address and SIC code relationships', async () => {
    const result = await createACompany(context, application.id, mockCompany);

    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);

    expect(result.companyName).toEqual(mockCompany.companyName);
    expect(result.companyNumber).toEqual(mockCompany.companyNumber);

    /**
     * Check that an address and SIC codes have been created.
     * No need to check the specific fields.
     * These are tested in other functions that createACompany calls.
     */

    expect(result.registeredOfficeAddress.id.length).toBeGreaterThan(0);
    expect(result.sicCodes.length).toBeGreaterThan(0);
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createACompany(context, invalidId, mockCompany);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createACompany({}, application.id, mockCompany);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
