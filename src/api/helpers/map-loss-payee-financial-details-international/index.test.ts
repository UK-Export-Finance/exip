import mapLossPayeeFinancialDetailsInternational from '.';
import encrypt from '../encrypt';
import { mockLossPayeeFinancialDetailsInternational } from '../../test-mocks/mock-application';
import { ApplicationLossPayeeFinancialInternational } from '../../types';

describe('api/helpers/map-loss-payee-financial-details-international', () => {
  describe('when iban, bicSwiftCode and bankDetails are not defined', () => {
    const variables = {} as ApplicationLossPayeeFinancialInternational;

    it('should return variables as an empty string or null', () => {
      const result = mapLossPayeeFinancialDetailsInternational(variables);

      const expected = {
        iban: '',
        ibanVector: '',
        bicSwiftCode: '',
        bicSwiftCodeVector: '',
        bankAddress: undefined,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when all variables are defined', () => {
    const variables = mockLossPayeeFinancialDetailsInternational as ApplicationLossPayeeFinancialInternational;

    it('should return encrypted iban and bicSwiftCode and ivs and bankAddress', () => {
      const result = mapLossPayeeFinancialDetailsInternational(variables);

      const iban = encrypt(mockLossPayeeFinancialDetailsInternational.iban);
      const bicSwiftCode = encrypt(mockLossPayeeFinancialDetailsInternational.bicSwiftCode);

      expect(result.iban.length).toEqual(iban.value.length);
      expect(result.ibanVector.length).toEqual(iban.iv.length);
      expect(result.bicSwiftCode.length).toEqual(bicSwiftCode.value.length);
      expect(result.bicSwiftCode.length).toEqual(bicSwiftCode.iv.length);
      expect(result.bankAddress).toEqual(mockLossPayeeFinancialDetailsInternational.bankAddress);
    });
  });
});
