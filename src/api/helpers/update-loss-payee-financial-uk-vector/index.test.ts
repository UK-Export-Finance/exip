import { Context, LossPayeeFinancialUkVectorUpdateInput } from '.keystone/types'; // eslint-disable-line
import updateLossPayeeFinancialUkVector from '.';
import { mockLossPayeeFinancialDetailsUkVector } from '../../test-mocks';
import { ApplicationLossPayeeFinancialUkVector } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import createLossPayeeFinancialDetailsUkVector from '../../test-helpers/loss-payee-financial-uk-vector';

const { accountNumberVector, sortCodeVector } = mockLossPayeeFinancialDetailsUkVector;

describe('helpers/update-loss-payee-financial-uk-vector', () => {
  let context: Context;
  let result: ApplicationLossPayeeFinancialUkVector;
  let lossPayeeFinancialUkVectorId = '';

  const updateData = {
    accountNumberVector: `${accountNumberVector}a`,
    sortCodeVector: `${sortCodeVector}b`,
  } as LossPayeeFinancialUkVectorUpdateInput;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('successfully updates loss payee financial uk', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      const lossPayeeFinancialUkVector = (await createLossPayeeFinancialDetailsUkVector({
        context,
      })) as ApplicationLossPayeeFinancialUkVector;

      lossPayeeFinancialUkVectorId = lossPayeeFinancialUkVector.id;

      result = await updateLossPayeeFinancialUkVector(context, lossPayeeFinancialUkVectorId, updateData);
    });

    it('should return the updated data', () => {
      expect(result.accountNumberVector).toEqual(updateData.accountNumberVector);
      expect(result.sortCodeVector).toEqual(updateData.sortCodeVector);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      await expect(updateLossPayeeFinancialUkVector(context, '1', updateData)).rejects.toThrow(
        'Updating loss payee financial uk vector (helper) Access denied: You cannot update that LossPayeeFinancialUkVector - it may not exist',
      );
    });
  });
});
