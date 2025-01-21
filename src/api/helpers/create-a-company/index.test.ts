import createACompany from '.';
import { mockCompany, mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating a company, address, SIC codes and company different trading address')).toEqual(true);
};

describe('helpers/create-a-company', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
  });

  it('should return a company with an application relationship, address, SIC code, different trading address relationships', async () => {
    const result = await createACompany(context, application.id, mockCompany);

    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);

    expect(result.applicationId).toEqual(application.id);

    expect(result.companyName).toEqual(mockCompany.companyName);
    expect(result.companyNumber).toEqual(mockCompany.companyNumber);

    /**
     * Check that an address and SIC codes have been created.
     * No need to check the specific fields.
     * These are tested in other functions that createACompany calls.
     */

    expect(result.registeredOfficeAddress.id.length).toBeGreaterThan(0);
    expect(result.sicCodes.length).toBeGreaterThan(0);
    expect(result.differentTradingAddress.id.length).toBeGreaterThan(0);
  });

  describe('when an invalid application ID is passed', () => {
    it('should throw an error', async () => {
      try {
        await createACompany(context, mockInvalidId, mockCompany);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    it('should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createACompany({}, application.id, mockCompany);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
