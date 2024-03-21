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

    application = (await applications.create({ context, data: {} })) as Application;
  });

  test('it should return an export contract with ID and privateMarket relationship', async () => {
    const { exportContract, privateMarket } = await createAnExportContract(context, application.id);

    expect(exportContract.id).toBeDefined();
    expect(typeof exportContract.id).toEqual('string');
    expect(privateMarket.id.length).toBeGreaterThan(0);
  });

  test('it should return empty exportContract fields, application relationship and default finalDestinationKnown', async () => {
    const { exportContract } = await createAnExportContract(context, application.id);

    expect(exportContract.applicationId).toEqual(application.id);

    expect(exportContract.finalDestinationCountryCode).toEqual('');

    expect(exportContract.finalDestinationKnown).toEqual(APPLICATION.DEFAULT_FINAL_DESTINATION_KNOWN);
    expect(exportContract.goodsOrServicesDescription).toEqual('');
    expect(exportContract.paymentTermsDescription).toEqual('');
  });

  test('it should return empty privateMarket fields', async () => {
    const { privateMarket } = await createAnExportContract(context, application.id);

    expect(privateMarket.attempted).toEqual(null);
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
