import createAPolicyContact from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a policy contact')).toEqual(true);
};

describe('helpers/create-a-policy-contact', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
  });

  test('it should return a policy contact with application relationship', async () => {
    const result = await createAPolicyContact(context, application.id);

    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);

    expect(result.applicationId).toEqual(application.id);

    expect(result.firstName).toEqual('');
    expect(result.lastName).toEqual('');
    expect(result.email).toEqual('');
    expect(result.position).toEqual('');
    expect(result.isSameAsOwner).toBeNull();
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createAPolicyContact(context, mockInvalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAPolicyContact({}, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
