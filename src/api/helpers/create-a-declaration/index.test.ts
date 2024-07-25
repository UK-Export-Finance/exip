import createADeclaration from '.';
import createADeclarationVersion from '../create-a-declaration-version';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating an application declaration')).toEqual(true);
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

  // declarationVersion
  test('it should return an application ID', async () => {
    const result = await createADeclaration(context, application.id);

    expect(result.applicationId).toEqual(application.id);
  });

  test('it should return empty declaration fields', async () => {
    const result = await createADeclaration(context, application.id);

    expect(result.agreeHowDataWillBeUsed).toBeNull();
    expect(result.agreeToConfidentiality).toBeNull();
    expect(result.agreeToAntiBribery).toBeNull();
    expect(result.agreeToConfirmationAndAcknowledgements).toBeNull();
    expect(result.hasAntiBriberyCodeOfConduct).toBeNull();
    expect(result.willExportWithAntiBriberyCodeOfConduct).toBeNull();
  });

  test('it should return declaration version fields via createADeclarationVersion helper', async () => {
    const result = await createADeclaration(context, application.id);

    const {
      declarationVersion: {
        id: declarationVersionId,
        agreeHowDataWillBeUsed,
        agreeToAntiBribery,
        agreeToConfidentiality,
        agreeToConfirmationAndAcknowledgements,
        hasAntiBriberyCodeOfConduct,
        willExportWithAntiBriberyCodeOfConduct,
      },
      id: declarationId,
    } = result;

    expect(declarationVersionId).toBeDefined();
    expect(typeof declarationVersionId).toEqual('string');
    expect(declarationVersionId.length).toBeGreaterThan(0);

    expect(result.declarationVersion.declarationId).toEqual(declarationId);

    const expectedVersions = await createADeclarationVersion(context, declarationId);

    expect(agreeHowDataWillBeUsed).toEqual('');
    expect(agreeToAntiBribery).toEqual(expectedVersions.agreeToAntiBribery);
    expect(agreeToConfidentiality).toEqual(expectedVersions.agreeToConfidentiality);
    expect(agreeToConfirmationAndAcknowledgements).toEqual(expectedVersions.agreeToConfirmationAndAcknowledgements);
    expect(hasAntiBriberyCodeOfConduct).toEqual(expectedVersions.hasAntiBriberyCodeOfConduct);
    expect(willExportWithAntiBriberyCodeOfConduct).toEqual(expectedVersions.willExportWithAntiBriberyCodeOfConduct);
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
