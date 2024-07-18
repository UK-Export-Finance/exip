import getBuyerTradingHistoryById from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import buyerTradingHistory from '../../test-helpers/buyer-trading-history';
import { Context, ApplicationBuyerTradingHistory } from '../../types';

describe('helpers/get-buyer-trading-history-by-id', () => {
  let context: Context;
  let createdRelationship: ApplicationBuyerTradingHistory;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdRelationship = await buyerTradingHistory.create(context) as ApplicationBuyerTradingHistory;
  });

  it('should return a buyer trading history by ID', async () => {
    const result = (await getBuyerTradingHistoryById(context, createdRelationship.id));

    expect(result.id).toEqual(createdRelationship.id);
  });

  describe('when a buyer is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getBuyerTradingHistoryById(context, invalidId);
      } catch (err) {
        const errorMessage = `Getting buyer trading history by ID ${invalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
