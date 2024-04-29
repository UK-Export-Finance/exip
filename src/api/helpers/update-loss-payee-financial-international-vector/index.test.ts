import { Context, LossPayeeFinancialInternationalVectorUpdateInput } from '.keystone/types'; // eslint-disable-line
import updateLossPayeeFinancialInternationalVector from '.';
import { mockLossPayeeFinancialDetailsInternationalVector } from '../../test-mocks';
import { ApplicationLossPayeeFinancialInternationalVector } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import createLossPayeeFinancialDetailsInternationalVector from '../../test-helpers/loss-payee-financial-international-vector';

const { bicSwiftCodeVector, ibanVector } = mockLossPayeeFinancialDetailsInternationalVector;

describe('helpers/update-loss-payee-financial-international-vector', () => {
  let context: Context;
  let result: ApplicationLossPayeeFinancialInternationalVector;
  let lossPayeeFinancialInternationalVectorId = '';

  const updateData = {
    bicSwiftCodeVector: `${bicSwiftCodeVector}a`,
    ibanVector: `${ibanVector}b`,
  } as LossPayeeFinancialInternationalVectorUpdateInput;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('successfully updates loss payee financial international', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      const lossPayeeFinancialInternationalVector = (await createLossPayeeFinancialDetailsInternationalVector({
        context,
      })) as ApplicationLossPayeeFinancialInternationalVector;

      lossPayeeFinancialInternationalVectorId = lossPayeeFinancialInternationalVector.id;

      result = await updateLossPayeeFinancialInternationalVector(context, lossPayeeFinancialInternationalVectorId, updateData);
    });

    it('should return the updated data', () => {
      expect(result.bicSwiftCodeVector).toEqual(updateData.bicSwiftCodeVector);
      expect(result.ibanVector).toEqual(updateData.ibanVector);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      await expect(updateLossPayeeFinancialInternationalVector(context, '1', updateData)).rejects.toThrow(
        'Updating loss payee financial international vector (helper) Access denied: You cannot update that LossPayeeFinancialInternationalVector - it may not exist',
      );
    });
  });
});
