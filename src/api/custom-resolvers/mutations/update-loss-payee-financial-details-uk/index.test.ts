import updateLossPayeeFinancialDetailsUk from '.';
import { mockLossPayeeFinancialDetailsUk } from '../../../test-mocks';
import { Context, SuccessResponse, ApplicationLossPayeeFinancialUk, ApplicationLossPayeeFinancialUkVector } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import createLossPayeeFinancialDetailsUk from '../../../test-helpers/loss-payee-financial-uk';
import createLossPayeeFinancialDetailsUkVector from '../../../test-helpers/loss-payee-financial-uk-vector';

describe('custom-resolvers/update-loss-payee-financial-details-uk', () => {
  let context: Context;
  let lossPayeeFinancialDetailsUk: ApplicationLossPayeeFinancialUk;
  let lossPayeeFinancialDetailsUkResponse: SuccessResponse;
  let vector: ApplicationLossPayeeFinancialUkVector;

  const variables = {
    id: '1',
    ...mockLossPayeeFinancialDetailsUk,
  } as ApplicationLossPayeeFinancialUk;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('successfully updates loss payee financial uk', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      lossPayeeFinancialDetailsUk = (await createLossPayeeFinancialDetailsUk({ context })) as ApplicationLossPayeeFinancialUk;

      vector = (await createLossPayeeFinancialDetailsUkVector({
        context,
        data: {
          financialUk: {
            connect: { id: lossPayeeFinancialDetailsUk.id },
          },
        },
      })) as ApplicationLossPayeeFinancialUkVector;

      variables.id = lossPayeeFinancialDetailsUk.id;
      variables.vector = vector;

      lossPayeeFinancialDetailsUkResponse = (await updateLossPayeeFinancialDetailsUk({}, variables, context)) as SuccessResponse;
    });

    it('should return success as true', () => {
      const { success } = lossPayeeFinancialDetailsUkResponse;

      expect(success).toEqual(true);
    });
  });

  describe('when an error occurs whilst updating loss payee financial uk', () => {
    it('should throw an error', async () => {
      await expect(updateLossPayeeFinancialDetailsUk({}, { id: '1', vector: { id: vector.id } }, context)).rejects.toThrow('Updating loss payee financial uk');
    });
  });

  describe('when an error occurs whilst updating loss payee financial uk vector', () => {
    it('should throw an error', async () => {
      /**
       * Delete the LossPayeeFinancialUkVector relationship,
       * to cause the vector data saving to fail.
       */
      await context.query.LossPayeeFinancialUkVector.deleteOne({
        where: {
          id: vector.id,
        },
      });

      variables.id = lossPayeeFinancialDetailsUk.id;

      await expect(updateLossPayeeFinancialDetailsUk({}, variables, context)).rejects.toThrow('Updating loss payee financial uk');
    });
  });
});
