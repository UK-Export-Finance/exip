import createABroker from '.';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a broker')).toEqual(true);
};

describe('helpers/create-a-broker', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
  });

  test('it should return a broker', async () => {
    const result = await createABroker(context, application.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');

    expect(result.applicationId).toEqual(application.id);
    expect(result.isUsingBroker).toBeNull();
    expect(result.name).toEqual('');
    expect(result.addressLine1).toEqual('');
    expect(result.addressLine2).toEqual('');
    expect(result.town).toEqual('');
    expect(result.county).toEqual('');
    expect(result.postcode).toEqual('');
    expect(result.fullAddress).toEqual('');
    expect(result.email).toEqual('');
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABroker(context, 'invalid-id');
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createABroker({}, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
