import getPrivateMarketById from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import privateMarket from '../../test-helpers/private-market';
import { Context, ApplicationPrivateMarket } from '../../types';

describe('helpers/get-private-market-by-id', () => {
  let context: Context;
  let createdPrivateMarket: ApplicationPrivateMarket;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdPrivateMarket = await privateMarket.create(context) as ApplicationPrivateMarket;
  });

  it('should return a private market by ID', async () => {
    const result = (await getPrivateMarketById(context, createdPrivateMarket.id));

    expect(result.id).toEqual(createdPrivateMarket.id);
  });

  describe('when a private market is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getPrivateMarketById(context, invalidId);
      } catch (err) {
        const errorMessage = `Getting privateMarket by ID ${invalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
