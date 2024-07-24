import createADeclarationVersion from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import declarations from '../../test-helpers/declarations';
import { ApplicationDeclaration, Context } from '../../types';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating an application declaration version')).toEqual(true);
};

describe('helpers/create-a-declaration-version', () => {
  let context: Context;
  let declaration: ApplicationDeclaration;

  beforeAll(async () => {
    context = getKeystoneContext();

    declaration = (await declarations.create(context)) as ApplicationDeclaration;
  });

  test('it should return a declaration version with ID', async () => {
    const result = await createADeclarationVersion(context, declaration.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return a declaration ID and empty declaration version fields', async () => {
    const result = await createADeclarationVersion(context, declaration.id);

    expect(result.declarationId).toEqual(declaration.id);

    expect(result.agreeToConfidentiality).toEqual('');
    expect(result.agreeToAntiBribery).toEqual('');
    expect(result.hasAntiBriberyCodeOfConduct).toEqual('');
    expect(result.willExportWithAntiBriberyCodeOfConduct).toEqual('');
    expect(result.agreeToConfirmationAndAcknowledgements).toEqual('');
    expect(result.agreeHowDataWillBeUsed).toEqual('');
  });

  describe('when an invalid declaration ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createADeclarationVersion(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
