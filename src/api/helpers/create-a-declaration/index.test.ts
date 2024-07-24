import createADeclaration from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating am application declaration')).toEqual(true);
};

describe('helpers/create-a-declaration', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
  });

  test('it should return a declaration with ID', async () => {
    const result = await createADeclaration(context, application.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return an application ID and empty declaration fields', async () => {
    const result = await createADeclaration(context, application.id);

    expect(result.applicationId).toEqual(application.id);

    expect(result.agreeToConfidentiality).toBeNull();
    expect(result.agreeToAntiBribery).toBeNull();
    expect(result.hasAntiBriberyCodeOfConduct).toBeNull();
    expect(result.willExportWithAntiBriberyCodeOfConduct).toBeNull();
    expect(result.agreeToConfirmationAndAcknowledgements).toBeNull();
    expect(result.agreeHowDataWillBeUsed).toBeNull();
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createADeclaration(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
