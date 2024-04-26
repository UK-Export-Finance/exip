import updateLossPayeeFinancialDetailsInternational from '.';
import { mockLossPayeeFinancialDetailsInternational } from '../../../test-mocks';
import { Context, SuccessResponse, ApplicationLossPayeeFinancialInternational } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import createLossPayeeFinancialDetailsInternational from '../../../test-helpers/loss-payee-financial-international';

describe('custom-resolvers/update-loss-payee-financial-details-international', () => {
  let context: Context;
  let lossPayeeFinancialDetailsInternationalResponse: SuccessResponse;
  const variables = {
    id: '1',
    ...mockLossPayeeFinancialDetailsInternational,
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
      const lossPayeeFinancialDetailsInternational = (await createLossPayeeFinancialDetailsInternational({
        context,
      })) as ApplicationLossPayeeFinancialInternational;

      variables.id = lossPayeeFinancialDetailsInternational.id;
      lossPayeeFinancialDetailsInternationalResponse = await updateLossPayeeFinancialDetailsInternational({}, variables, context);
    });

    it('should return success as true', () => {
      const { success } = lossPayeeFinancialDetailsInternationalResponse;

      expect(success).toEqual(true);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      await expect(updateLossPayeeFinancialDetailsInternational({}, { id: '1' }, context)).rejects.toThrow(
        'Updating loss payee financial details international',
      );
    });
  });
});
