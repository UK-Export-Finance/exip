import getDeclarationById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import declaration from '../../test-helpers/declaration';
import { Context, ApplicationDeclaration } from '../../types';

describe('helpers/get-declaration-by-id', () => {
  let context: Context;
  let createdDeclaration: ApplicationDeclaration;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdDeclaration = (await declaration.create(context)) as ApplicationDeclaration;
  });

  it('should return a declaration by ID', async () => {
    const result = await getDeclarationById(context, createdDeclaration.id);

    expect(result.id).toEqual(createdDeclaration.id);
  });

  describe('when a declaration is not found', () => {
    it('should throw an error', async () => {
      try {
        await getDeclarationById(context, mockInvalidId);
      } catch (error) {
        const errorMessage = `Getting declaration by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(error).toEqual(expected);
      }
    });
  });
});
