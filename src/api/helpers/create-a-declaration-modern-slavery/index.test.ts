import createADeclarationModernSlavery from '.';
import { mockInvalidId } from '../../test-mocks';
import createADeclarationModernSlaveryVersion from '../create-a-declaration-modern-slavery-version';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import declarations from '../../test-helpers/declarations';
import { Application, ApplicationDeclaration, Context } from '../../types';

describe('helpers/create-a-declaration-modern-slavery', () => {
  let context: Context;
  let application: Application;
  let declaration: ApplicationDeclaration;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
    declaration = (await declarations.create(context)) as ApplicationDeclaration;
  });

  test('it should return a declaration modern slavery with ID', async () => {
    const result = await createADeclarationModernSlavery(context, declaration.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty declaration modern slavery fields', async () => {
    const result = await createADeclarationModernSlavery(context, declaration.id);

    expect(result.willAdhereToAllRequirements).toBeNull();
    expect(result.hasNoOffensesOrInvestigations).toBeNull();
    expect(result.isNotAwareOfExistingSlavery).toBeNull();

    expect(result.cannotAdhereToAllRequirements).toEqual('');
    expect(result.offensesOrInvestigations).toEqual('');
    expect(result.awareOfExistingSlavery).toEqual('');
  });

  test('it should return declaration version fields via createADeclarationModernSlaveryVersion helper', async () => {
    const result = await createADeclarationModernSlavery(context, declaration.id);

    const {
      declarationModernSlaveryVersion: {
        id: declarationModernSlaveryVersionId,
        willAdhereToAllRequirements,
        hasNoOffensesOrInvestigations,
        isNotAwareOfExistingSlavery,
      },
      id: declarationModernSlaveryId,
    } = result;

    expect(declarationModernSlaveryVersionId).toBeDefined();
    expect(typeof declarationModernSlaveryVersionId).toEqual('string');
    expect(declarationModernSlaveryVersionId.length).toBeGreaterThan(0);

    const expectedVersions = await createADeclarationModernSlaveryVersion(context, declarationModernSlaveryId);

    expect(willAdhereToAllRequirements).toEqual(expectedVersions.willAdhereToAllRequirements);
    expect(hasNoOffensesOrInvestigations).toEqual(expectedVersions.hasNoOffensesOrInvestigations);
    expect(isNotAwareOfExistingSlavery).toEqual(expectedVersions.isNotAwareOfExistingSlavery);
  });

  describe('when an invalid declaration ID is passed', () => {
    test('it should throw an error', async () => {
      await expect(createADeclarationModernSlavery(context, mockInvalidId)).rejects.toThrow('Creating an application declaration modern slavery');
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      await expect(createADeclarationModernSlavery({}, application.id)).rejects.toThrow('Creating an application declaration modern slavery');
    });
  });
});
