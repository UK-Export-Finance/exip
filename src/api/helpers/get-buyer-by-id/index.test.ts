import getBuyerById from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import buyer from '../../test-helpers/buyer';
import { Context, ApplicationBuyer } from '../../types';

describe('helpers/get-buyer-by-id', () => {
  let context: Context;
  let createdBuyer: ApplicationBuyer;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdBuyer = await buyer.create(context) as ApplicationBuyer;
  });

  it('should return a buyer by ID', async () => {
    const result = (await getBuyerById(context, createdBuyer.id));

    expect(result.id).toEqual(createdBuyer.id);
  });

  describe('when a buyer is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getBuyerById(context, invalidId);
      } catch (err) {
        const errorMessage = `Getting buyer by ID ${invalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
