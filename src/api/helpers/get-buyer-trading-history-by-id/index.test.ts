import getBuyerTradingHistoryById from '.';
import { mockInvalidId } from '../../test-mocks';
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
    createdRelationship = (await buyerTradingHistory.create(context)) as ApplicationBuyerTradingHistory;
  });

  it('should return a buyer trading history by ID', async () => {
    const result = await getBuyerTradingHistoryById(context, createdRelationship.id);

    expect(result.id).toEqual(createdRelationship.id);
  });

  describe('when a buyer trading history is not found', () => {
    it('should throw an error', async () => {
      try {
        await getBuyerTradingHistoryById(context, mockInvalidId);
      } catch (error) {
        const errorMessage = `Getting buyer trading history by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(error).toEqual(expected);
      }
    });
  });
});
