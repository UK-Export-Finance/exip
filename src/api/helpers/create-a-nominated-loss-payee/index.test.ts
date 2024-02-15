import createANominatedLossPayee from '.';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a nominated loss payee')).toEqual(true);
};

describe('helpers/create-a-nominated-loss-payee', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
  });

  test('it should return a nominated loss payee with ID', async () => {
    const nominatedLossPayee = await createANominatedLossPayee(context, application.id);

    expect(nominatedLossPayee.id).toBeDefined();
    expect(typeof nominatedLossPayee.id).toEqual('string');
    expect(nominatedLossPayee.id.length).toBeGreaterThan(0);
  });

  test('it should return application ID and empty nominated loss payee fields', async () => {
    const nominatedLossPayee = await createANominatedLossPayee(context, application.id);

    expect(nominatedLossPayee.applicationId).toEqual(application.id);
    expect(nominatedLossPayee.isAppointing).toEqual(null);
    expect(nominatedLossPayee.name).toEqual('');
    expect(nominatedLossPayee.locatedInUk).toEqual(null);
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createANominatedLossPayee(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createANominatedLossPayee({}, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
