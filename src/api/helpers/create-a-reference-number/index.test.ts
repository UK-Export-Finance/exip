import createAReferenceNumber from '.';
import { Application, Context } from '../../types';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a reference number')).toEqual(true);
};

describe('helpers/create-a-reference-number', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
  });

  test('it should return a reference number and with a respective ID', async () => {
    const result = await createAReferenceNumber(context, application.id);

    expect(typeof result.referenceNumber).toEqual('number');
    expect(String(result.referenceNumber).length).toEqual(5);

    expect(result.applicationId).toBeNull();
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createAReferenceNumber(context, mockInvalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAReferenceNumber({}, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});