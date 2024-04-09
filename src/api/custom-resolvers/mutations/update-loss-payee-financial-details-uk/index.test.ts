import updateLossPayeeFinancialDetailsUk from '.';
import { mockLossPayeeFinancialDetailsUk } from '../../../test-mocks';
import { Context, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

describe('custom-resolvers/update-loss-payee-financial-details-uk', () => {
  let context: Context;
  let lossPayeeFinancialDetailsUkResponse: SuccessResponse;
  const variables = {
    id: '1',
    ...mockLossPayeeFinancialDetailsUk,
  };

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('successfully creating loss payee financial details', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      lossPayeeFinancialDetailsUkResponse = (await updateLossPayeeFinancialDetailsUk({}, variables, context)) as SuccessResponse;
    });

    it('should generate and return the loss payee financial details', () => {
      const { success } = lossPayeeFinancialDetailsUkResponse;

      expect(success).toEqual(true);
    });
  });
});
