import getPopulatedDeclaration from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import declaration from '../../test-helpers/declaration';
import declarationsModernSlavery from '../../test-helpers/declaration-modern-slavery';
import { Context, ApplicationDeclaration, ApplicationDeclarationModernSlavery } from '../../types';

describe('helpers/get-populated-declaration', () => {
  let context: Context;
  let createdDeclaration: ApplicationDeclaration;
  let createdModernSlavery: ApplicationDeclarationModernSlavery;
  let declarationConnectObject = {};

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdDeclaration = (await declaration.create(context)) as ApplicationDeclaration;

    declarationConnectObject = {
      connect: {
        id: createdDeclaration.id,
      },
    };

    const initModernSlavery = {
      declaration: declarationConnectObject,
    };

    createdModernSlavery = (await declarationsModernSlavery.create(context, initModernSlavery)) as ApplicationDeclarationModernSlavery;

    const declarationUpdateObject = {
      modernSlavery: {
        connect: {
          id: createdModernSlavery.id,
        },
      },
    };

    await declaration.update(context, createdDeclaration.id, declarationUpdateObject);
  });

  it('should return a populated declaration', async () => {
    const result = await getPopulatedDeclaration(context, createdDeclaration.id);

    expect(result.id).toEqual(createdDeclaration.id);

    expect(result.modernSlavery).toEqual(createdModernSlavery);
  });

  describe('when a declaration is not found', () => {
    it('should throw an error', async () => {
      const expectedErrorMessage = `Error getting populated declaration ${mockInvalidId}`;

      await expect(getPopulatedDeclaration(context, mockInvalidId)).rejects.toThrow(expectedErrorMessage);
    });
  });

  describe('when a modernSlavery is not found', () => {
    it('should throw an error', async () => {
      const declarationNoModernSlavery = (await declaration.create(context)) as ApplicationDeclaration;

      const expectedErrorMessage = `Error getting populated declaration ${declarationNoModernSlavery.id}`;

      await expect(getPopulatedDeclaration(context, declarationNoModernSlavery.id)).rejects.toThrow(expectedErrorMessage);
    });
  });
});
