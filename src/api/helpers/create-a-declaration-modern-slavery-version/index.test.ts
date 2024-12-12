import createADeclarationModernSlaveryVersion from '.';
import DECLARATIONS from '../../constants/declarations';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import declarationsModernSlavery from '../../test-helpers/declarations-modern-slavery';
import { ApplicationDeclarationModernSlavery, Context } from '../../types';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY } =
  DECLARATIONS.LATEST_MODERN_SLAVERY_DECLARATIONS;

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating an application declaration modern slavery version')).toEqual(true);
};

describe('helpers/create-a-declaration-modern-slavery-version', () => {
  let context: Context;
  let declarationModernSlavery: ApplicationDeclarationModernSlavery;

  beforeAll(async () => {
    context = getKeystoneContext();

    declarationModernSlavery = (await declarationsModernSlavery.create(context)) as ApplicationDeclarationModernSlavery;
  });

  test('it should return a declaration version with ID', async () => {
    const result = await createADeclarationModernSlaveryVersion(context, declarationModernSlavery.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return a declarationModernSlavery ID', async () => {
    const result = await createADeclarationModernSlaveryVersion(context, declarationModernSlavery.id);

    expect(result.declarationModernSlaveryId).toEqual(declarationModernSlavery.id);
  });

  test('it should return declaration version fields with the latest versions', async () => {
    const result = await createADeclarationModernSlaveryVersion(context, declarationModernSlavery.id);

    expect(result.willAdhereToAllRequirements).toEqual(WILL_ADHERE_TO_ALL_REQUIREMENTS);
    expect(result.hasNoOffensesOrInvestigations).toEqual(HAS_NO_OFFENSES_OR_INVESTIGATIONS);
    expect(result.isNotAwareOfExistingSlavery).toEqual(IS_NOT_AWARE_OF_EXISTING_SLAVERY);
  });

  describe('when an invalid declaration modern slavery ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createADeclarationModernSlaveryVersion(context, invalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
