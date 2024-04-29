import { Context, LossPayeeFinancialUkUpdateInput } from '.keystone/types'; // eslint-disable-line
import updateLossPayeeFinancialUkUk from '.';
import { mockLossPayeeFinancialDetailsUk } from '../../test-mocks';
import { ApplicationLossPayeeFinancialUk } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import createLossPayeeFinancialDetailsUk from '../../test-helpers/loss-payee-financial-uk';

const { accountNumber, sortCode } = mockLossPayeeFinancialDetailsUk;

describe('helpers/update-loss-payee-financial-uk', () => {
  let context: Context;
  let result: ApplicationLossPayeeFinancialUk;
  let lossPayeeFinancialUkId = '';

  const updateData = {
    accountNumber: `${accountNumber}a`,
    sortCode: `${sortCode}b`,
  } as LossPayeeFinancialUkUpdateInput;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('successfully updates loss payee financial uk', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      const lossPayeeFinancialUk = (await createLossPayeeFinancialDetailsUk({
        context,
      })) as ApplicationLossPayeeFinancialUk;

      lossPayeeFinancialUkId = lossPayeeFinancialUk.id;

      result = await updateLossPayeeFinancialUkUk(context, lossPayeeFinancialUkId, updateData);
    });

    it('should return the updated data', () => {
      expect(result.accountNumber).toEqual(updateData.accountNumber);
      expect(result.sortCode).toEqual(updateData.sortCode);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      await expect(updateLossPayeeFinancialUkUk(context, '1', updateData)).rejects.toThrow(
        'Updating loss payee financial uk (helper) Access denied: You cannot update that LossPayeeFinancialUk - it may not exist',
      );
    });
  });
});
