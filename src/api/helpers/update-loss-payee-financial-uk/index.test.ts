import { Context, LossPayeeFinancialUkUpdateInput } from '.keystone/types'; // eslint-disable-line
import updateLossPayeeFinancialInternationalUk from '.';
import { mockLossPayeeFinancialDetailsUk } from '../../test-mocks';
import { ApplicationLossPayeeFinancialUk } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import createLossPayeeFinancialDetailsInternational from '../../test-helpers/loss-payee-financial-international';

const { accountNumber, sortCode } = mockLossPayeeFinancialDetailsUk;

describe('helpers/update-loss-payee-financial-uk', () => {
  let context: Context;
  let result: ApplicationLossPayeeFinancialUk;
  let lossPayeeFinancialInternationalId = '';

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
      const lossPayeeFinancialInternational = (await createLossPayeeFinancialDetailsInternational({
        context,
      })) as ApplicationLossPayeeFinancialUk;

      lossPayeeFinancialInternationalId = lossPayeeFinancialInternational.id;

      result = await updateLossPayeeFinancialInternationalUk(context, lossPayeeFinancialInternationalId, updateData);
    });

    it('should return the updated data', () => {
      expect(result.accountNumber).toEqual(updateData.accountNumber);
      expect(result.sortCode).toEqual(updateData.sortCode);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      await expect(updateLossPayeeFinancialInternationalUk(context, '1', updateData)).rejects.toThrow(
        'Updating loss payee financial uk (helper) Access denied: You cannot update that LossPayeeFinancialInternational - it may not exist',
      );
    });
  });
});
