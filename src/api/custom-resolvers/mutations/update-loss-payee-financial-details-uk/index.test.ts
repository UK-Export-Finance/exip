import updateLossPayeeFinancialDetailsUk from '.';
import { mockLossPayeeFinancialDetailsUk } from '../../../test-mocks';
import { Context, SuccessResponse, ApplicationLossPayeeFinancialUk } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import createLossPayeeFinancialDetailsUk from '../../../test-helpers/loss-payee-financial-uk';

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

  describe('successfully updates loss payee financial details', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      const lossPayeeFinancialDetailsUk = (await createLossPayeeFinancialDetailsUk({ context })) as ApplicationLossPayeeFinancialUk;

      variables.id = lossPayeeFinancialDetailsUk.id;
      lossPayeeFinancialDetailsUkResponse = (await updateLossPayeeFinancialDetailsUk({}, variables, context)) as SuccessResponse;
    });

    it('should return success as true', () => {
      const { success } = lossPayeeFinancialDetailsUkResponse;

      expect(success).toEqual(true);
    });
  });
});
