import getPopulatedDeclaration from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import declaration from '../../test-helpers/declaration';
import declarationModernSlavery from '../../test-helpers/declaration-modern-slavery';
import { Context, ApplicationDeclaration, ApplicationDeclarationModernSlavery } from '../../types';

describe('helpers/get-populated-declaration-by-id', () => {
  let context: Context;
  let createdDeclaration: ApplicationDeclaration;
  let createdDeclarationModernSlavery: ApplicationDeclarationModernSlavery;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdDeclaration = (await declaration.create(context)) as ApplicationDeclaration;

    const relationshipObject = {
      declaration: {
        connect: {
          id: createdDeclaration.id,
        },
      },
    };

    createdDeclarationModernSlavery = (await declarationModernSlavery.create(context, relationshipObject)) as ApplicationDeclarationModernSlavery;
  });

  it('should return a populated declaration', async () => {
    const result = await getPopulatedDeclaration(context, createdDeclaration.id);

    const expected = {
      ...createdDeclaration,
      modernSlaveryId: createdDeclarationModernSlavery.id,
      modernSlavery: createdDeclarationModernSlavery,
    };

    expect(result).toEqual(expected);
  });

  describe('when a declaration is not found', () => {
    it('should throw an error', async () => {
      await expect(getPopulatedDeclaration(context, mockInvalidId)).rejects.toThrow(`Getting populated declaration ${mockInvalidId}`);
    });
  });

  describe('when a declaration modern slavery is not found', () => {
    it('should throw an error', async () => {
      const declarationNoModernSlavery = (await declaration.create(context)) as ApplicationDeclaration;

      try {
        await getPopulatedDeclaration(context, declarationNoModernSlavery.id);
      } catch (error) {
        const expected = `Getting populated declaration (modern slavery) ${declarationNoModernSlavery.id}`;

        expect(String(error).includes(expected)).toEqual(true);
      }
    });
  });
});
