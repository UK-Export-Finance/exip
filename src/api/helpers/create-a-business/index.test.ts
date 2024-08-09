import createABusiness from '.';
import { APPLICATION } from '../../constants';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating a business')).toEqual(true);
};

describe('helpers/create-a-business', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
  });

  test('it should return a business with an application relationship', async () => {
    const result = await createABusiness(context, application.id);

    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);

    expect(result.applicationId).toEqual(application.id);

    expect(result.goodsOrServicesSupplied).toEqual('');
    expect(result.totalYearsExporting).toBeNull();
    expect(result.totalEmployeesUK).toBeNull();
    expect(result.totalEmployeesInternational).toBeNull();
    expect(result.estimatedAnnualTurnover).toBeNull();
    expect(result.exportsTurnoverPercentage).toBeNull();
    expect(result.turnoverCurrencyCode).toEqual(APPLICATION.DEFAULT_CURRENCY);
    expect(result.hasCreditControlProcess).toBeNull();
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABusiness(context, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createABusiness({}, application.id);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
