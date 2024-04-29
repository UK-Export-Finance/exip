import { Context, LossPayeeFinancialInternationalUpdateInput } from '.keystone/types'; // eslint-disable-line
import updateLossPayeeFinancialInternational from '.';
import { mockLossPayeeFinancialDetailsInternational } from '../../test-mocks';
import { ApplicationLossPayeeFinancialInternational } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import createLossPayeeFinancialDetailsInternational from '../../test-helpers/loss-payee-financial-international';

const {
  iban,
  bicSwiftCode,
  bankAddress,
} = mockLossPayeeFinancialDetailsInternational;

describe('helpers/update-loss-payee-financial-international', () => {
  let context: Context;
  let result: ApplicationLossPayeeFinancialInternational;
  let lossPayeeFinancialInternationalId = '';

  const updateData = {
    bankAddress: `${bankAddress}c`,
    bicSwiftCode: `${bicSwiftCode}b`,
    iban: `${iban}a`,
  } as LossPayeeFinancialInternationalUpdateInput;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('successfully updates loss payee financial international', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      const lossPayeeFinancialInternational = (await createLossPayeeFinancialDetailsInternational({
        context,
      })) as ApplicationLossPayeeFinancialInternational;

      lossPayeeFinancialInternationalId = lossPayeeFinancialInternational.id;

      result = await updateLossPayeeFinancialInternational(context, lossPayeeFinancialInternationalId, updateData);
    });

    it('should return the updated data', () => {
      expect(result.iban).toEqual(updateData.iban);
      expect(result.bicSwiftCode).toEqual(updateData.bicSwiftCode);
      expect(result.bankAddress).toEqual(updateData.bankAddress);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      await expect(updateLossPayeeFinancialInternational(context, '1', updateData)).rejects.toThrow(
        'Updating loss payee financial international (helper) Access denied: You cannot update that LossPayeeFinancialInternational - it may not exist',
      );
    });
  });
});
