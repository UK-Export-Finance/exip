import updateLossPayeeFinancialDetailsInternational from '.';
import { mockLossPayeeFinancialDetailsInternational } from '../../../test-mocks';
import { Context, SuccessResponse, ApplicationLossPayeeFinancialInternational, ApplicationLossPayeeFinancialInternationalVector } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import createLossPayeeFinancialDetailsInternational from '../../../test-helpers/loss-payee-financial-international';
import createLossPayeeFinancialDetailsInternationalVector from '../../../test-helpers/loss-payee-financial-international-vector';

describe('custom-resolvers/update-loss-payee-financial-details-international', () => {
  let context: Context;
  let lossPayeeFinancialDetailsInternationalResponse: SuccessResponse;
  let vector: ApplicationLossPayeeFinancialInternationalVector;

  const variables = {
    id: '1',
    ...mockLossPayeeFinancialDetailsInternational,
  } as ApplicationLossPayeeFinancialInternational;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('successfully updates loss payee financial international', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      const lossPayeeFinancialDetailsInternational = (await createLossPayeeFinancialDetailsInternational({
        context,
      })) as ApplicationLossPayeeFinancialInternational;

      vector = (await createLossPayeeFinancialDetailsInternationalVector({
        context,
        data: {
          financialInternational: {
            connect: { id: lossPayeeFinancialDetailsInternational.id },
          },
        },
      })) as ApplicationLossPayeeFinancialInternationalVector;

      await context.query.LossPayeeFinancialInternational.updateOne({
        where: {
          id: lossPayeeFinancialDetailsInternational.id,
        },
        data: {
          vector: {
            connect: {
              id: vector.id,
            },
          },
        },
      });

      variables.id = lossPayeeFinancialDetailsInternational.id;
      variables.vector = vector;

      lossPayeeFinancialDetailsInternationalResponse = await updateLossPayeeFinancialDetailsInternational({}, variables, context);
    });

    it('should return success as true', () => {
      const { success } = lossPayeeFinancialDetailsInternationalResponse;

      expect(success).toEqual(true);
    });
  });

  describe('when an error occurs when updating loss payee financial international', () => {
    it('should throw an error', async () => {
      await expect(updateLossPayeeFinancialDetailsInternational({}, { id: '1', vector: { id: vector.id } }, context)).rejects.toThrow(
        'Updating loss payee financial international',
      );
    });
  });

  describe('when an error occurs when updating loss payee financial international vector', () => {
    it('should throw an error', async () => {
      /**
       * Create a new LossPayeeFinancialDetailsInternational,
       * Without a vector relationship.
       * This will then cause the vector call to fail,
       * because there is no associated vector ID.
       */
      const lossPayeeFinancialDetailsInternational = (await createLossPayeeFinancialDetailsInternational({
        context,
      })) as ApplicationLossPayeeFinancialInternational;

      variables.id = lossPayeeFinancialDetailsInternational.id;

      await expect(updateLossPayeeFinancialDetailsInternational({}, variables, context)).rejects.toThrow('Updating loss payee financial international');
    });
  });
});
