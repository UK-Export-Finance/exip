import mapLossPayeeFinancialDetailsUk from '.';
import encrypt from '../encrypt';
import { mockLossPayeeFinancialDetailsUk } from '../../test-mocks/mock-application';
import { ApplicationLossPayeeFinancialUk } from '../../types';

describe('api/helpers/map-loss-payee-financial-details-uk', () => {
  describe('when accountNumber, sortCode and bankDetails are not defined', () => {
    const variables = {} as ApplicationLossPayeeFinancialUk;

    it('should return variables as an empty string or null', () => {
      const result = mapLossPayeeFinancialDetailsUk(variables);

      const expected = {
        uk: {
          accountNumber: '',
          sortCode: '',
          bankAddress: undefined,
        },
        vectors: {
          accountNumberVector: '',
          sortCodeVector: '',
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when all variables are defined', () => {
    const variables = mockLossPayeeFinancialDetailsUk as ApplicationLossPayeeFinancialUk;

    it('should return encrypted accountNumber and sortCode and ivs and bankAddress', () => {
      const result = mapLossPayeeFinancialDetailsUk(variables);

      const accountNumber = encrypt(mockLossPayeeFinancialDetailsUk.accountNumber);
      const sortCode = encrypt(mockLossPayeeFinancialDetailsUk.sortCode);

      expect(result.uk.accountNumber.length).toEqual(accountNumber.value.length);
      expect(result.uk.sortCode.length).toEqual(sortCode.value.length);
      expect(result.uk.bankAddress).toEqual(mockLossPayeeFinancialDetailsUk.bankAddress);
      expect(result.vectors.sortCodeVector.length).toEqual(sortCode.iv.length);
      expect(result.vectors.accountNumberVector.length).toEqual(accountNumber.iv.length);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      try {
        mapLossPayeeFinancialDetailsUk({ id: '1', vector: { id: '1' } });
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error mapping loss payee financial UK')).toEqual(true);
      }
    });
  });
});
