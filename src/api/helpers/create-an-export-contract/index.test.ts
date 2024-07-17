import createAnExportContract from '.';
import { APPLICATION } from '../../constants';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating an export contract')).toEqual(true);
};

describe('helpers/create-an-export-contract', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
  });

  test('it should return an export contract with ID and privateMarket relationship', async () => {
    const result = await createAnExportContract(context, application.id);

    const { privateMarket } = result;

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(privateMarket.id.length).toBeGreaterThan(0);
  });

  test('it should return empty exportContract fields, application relationship and default finalDestinationKnown', async () => {
    const result = await createAnExportContract(context, application.id);

    expect(result.applicationId).toEqual(application.id);

    expect(result.finalDestinationCountryCode).toEqual('');

    expect(result.finalDestinationKnown).toEqual(APPLICATION.DEFAULT_FINAL_DESTINATION_KNOWN);
    expect(result.goodsOrServicesDescription).toEqual('');
    expect(result.paymentTermsDescription).toEqual('');
  });

  test('it should return empty privateMarket fields', async () => {
    const { privateMarket } = await createAnExportContract(context, application.id);

    expect(privateMarket.attempted).toBeNull();
    expect(privateMarket.declinedDescription).toEqual('');
  });

  describe('when an invalid policy ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createAnExportContract(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAnExportContract({}, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
