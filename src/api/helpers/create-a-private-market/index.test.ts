import createAPrivateMarket from '.';
import createAnExportContract from '../create-an-export-contract';
import { Application, ApplicationExportContract, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a private market')).toEqual(true);
};

describe('helpers/create-a-private-market', () => {
  let context: Context;
  let application: Application;
  let applicationExportContract: ApplicationExportContract;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
    const createdExportContract = await createAnExportContract(context, application.id);

    const { exportContract } = createdExportContract;

    applicationExportContract = exportContract;
  });

  test('it should return a privateMarket with ID', async () => {
    const result = await createAPrivateMarket(context, applicationExportContract.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty privateMarket fields and default finalDestinationKnown', async () => {
    const result = await createAPrivateMarket(context, applicationExportContract.id);

    expect(result.attempted).toEqual(null);
    expect(result.declinedDescription).toEqual('');
  });

  describe('when an invalid exportContract ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createAPrivateMarket(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAPrivateMarket({}, applicationExportContract.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
