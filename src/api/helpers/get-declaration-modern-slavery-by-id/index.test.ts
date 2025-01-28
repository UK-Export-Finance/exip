import getDeclarationModernSlaveryById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import declarationModernSlavery from '../../test-helpers/declaration-modern-slavery';
import { Context, ApplicationDeclarationModernSlavery } from '../../types';

describe('helpers/get-declaration-modern-slavery-by-id', () => {
  let context: Context;
  let createdDeclarationModernSlavery: ApplicationDeclarationModernSlavery;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdDeclarationModernSlavery = (await declarationModernSlavery.create(context)) as ApplicationDeclarationModernSlavery;
  });

  it('should return a declaration modern slavery by ID', async () => {
    const result = await getDeclarationModernSlaveryById(context, createdDeclarationModernSlavery.id);

    expect(result.id).toEqual(createdDeclarationModernSlavery.id);
  });

  describe('when a declaration modern slavery is not found', () => {
    it('should throw an error', async () => {
      try {
        await getDeclarationModernSlaveryById(context, mockInvalidId);
      } catch (error) {
        const errorMessage = `Getting declaration modern slavery by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(error).toEqual(expected);
      }
    });
  });
});
