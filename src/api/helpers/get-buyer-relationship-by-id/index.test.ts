import getBuyerRelationshipById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import buyerRelationship from '../../test-helpers/buyer-relationship';
import { Context, ApplicationBuyerRelationship } from '../../types';

describe('helpers/get-buyer-relationship-by-id', () => {
  let context: Context;
  let createdRelationship: ApplicationBuyerRelationship;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdRelationship = (await buyerRelationship.create(context)) as ApplicationBuyerRelationship;
  });

  it('should return a buyer relationship by ID', async () => {
    const result = await getBuyerRelationshipById(context, createdRelationship.id);

    expect(result.id).toEqual(createdRelationship.id);
  });

  describe('when a buyer is not found', () => {
    it('should throw an error', async () => {
      try {
        await getBuyerRelationshipById(context, mockInvalidId);
      } catch (error) {
        const errorMessage = `Getting buyer relationship by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(error).toEqual(expected);
      }
    });
  });
});
