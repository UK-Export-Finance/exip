import mapLossPayeeFinancialDetailsInternational from '.';
import encrypt from '../encrypt';
import { mockLossPayeeFinancialDetailsInternational } from '../../test-mocks/mock-application';
import { ApplicationLossPayeeFinancialInternational } from '../../types';

describe('api/helpers/map-loss-payee-financial-details-international', () => {
  describe('when iban, bicSwiftCode and bankDetails are not defined', () => {
    const variables = {} as ApplicationLossPayeeFinancialInternational;

    it('should return variables as an empty string or undefined', () => {
      const result = mapLossPayeeFinancialDetailsInternational(variables);

      const expected = {
        international: {
          iban: '',
          bicSwiftCode: '',
          bankAddress: undefined,
        },
        vectors: {
          ibanVector: '',
          bicSwiftCodeVector: '',
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when all variables are defined', () => {
    const variables = mockLossPayeeFinancialDetailsInternational as ApplicationLossPayeeFinancialInternational;

    it('should return encrypted iban, bicSwiftCode, ivs and bankAddress', () => {
      const result = mapLossPayeeFinancialDetailsInternational(variables);

      const iban = encrypt(mockLossPayeeFinancialDetailsInternational.iban);
      const bicSwiftCode = encrypt(mockLossPayeeFinancialDetailsInternational.bicSwiftCode);

      expect(result.international.iban.length).toEqual(iban.value.length);
      expect(result.international.bicSwiftCode.length).toEqual(bicSwiftCode.value.length);
      expect(result.international.bankAddress).toEqual(mockLossPayeeFinancialDetailsInternational.bankAddress);
      expect(result.vectors.ibanVector.length).toEqual(iban.iv.length);
      expect(result.vectors.bicSwiftCodeVector.length).toEqual(bicSwiftCode.iv.length);
    });
  });

  describe('when the an error occurs', () => {
    it('should throw an error', async () => {
      try {
        mapLossPayeeFinancialDetailsInternational({ id: '1', vector: { id: '2' } });
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error mapping loss payee financial international')).toEqual(true);
      }
    });
  });
});
