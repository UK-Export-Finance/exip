import decryptNominatedLossPayee from '.';
import decryptFinancialUkData from '../decrypt-financial-uk';
import decryptFinancialInternational from '../decrypt-financial-international';
import mockApplication, {
  mockNominatedLossPayee,
  mockLossPayeeFinancialDetailsInternationalVector,
  mockLossPayeeFinancialDetailsUkVector,
} from '../../test-mocks/mock-application';
import decrypt from '../decrypt';

const { nominatedLossPayee } = mockApplication;

const mockFinancialUk = {
  ...mockNominatedLossPayee.financialUk,
  vector: {
    id: '1',
    ...mockLossPayeeFinancialDetailsUkVector,
  },
};

const mockFinancialInternational = {
  ...mockNominatedLossPayee.financialInternational,
  vector: {
    id: '2',
    ...mockLossPayeeFinancialDetailsInternationalVector,
  },
};

const populatedNominatedLossPayee = {
  ...mockNominatedLossPayee,
  financialUk: mockFinancialUk,
  financialInternational: mockFinancialInternational,
};

describe('api/helpers/decrypt-nominated-loss-payee', () => {
  jest.mock('../decrypt');

  let decryptSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    decryptSpy = jest.fn(() => '123456');

    decrypt.decrypt = decryptSpy;
  });

  describe('when "decryptFinancialUk" and "decryptFinancialInternational" are false', () => {
    it('should return empty objects', () => {
      const result = decryptNominatedLossPayee(populatedNominatedLossPayee, false, false);

      const expected = {
        financialUk: {},
        financialInternational: {},
      };

      expect(result).toEqual(expected);
    });

    it('should NOT call the decrypt function', () => {
      decryptNominatedLossPayee(populatedNominatedLossPayee, false);

      expect(decryptSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('when "decryptFinancialUk" is true', () => {
    it('should return result of decryptFinancialUkData for financialUk', () => {
      const result = decryptNominatedLossPayee(populatedNominatedLossPayee, true);

      const expected = {
        financialUk: decryptFinancialUkData(mockFinancialUk),
        financialInternational: {},
      };

      expect(result).toEqual(expected);
    });

    it('should call the decrypt function twice', () => {
      decryptNominatedLossPayee(populatedNominatedLossPayee, true);

      const {
        accountNumber,
        sortCode,
        vector: { accountNumberVector, sortCodeVector },
      } = mockFinancialUk;

      expect(decryptSpy).toHaveBeenCalledTimes(2);
      expect(decryptSpy).toHaveBeenCalledWith({ iv: accountNumberVector, value: accountNumber });
      expect(decryptSpy).toHaveBeenCalledWith({ iv: sortCodeVector, value: sortCode });
    });
  });

  describe('when "decryptFinancialInternational" is true', () => {
    it('should return result of decryptFinancialInternationalData for financialInternational', () => {
      const result = decryptNominatedLossPayee(populatedNominatedLossPayee, false, true);

      const expected = {
        financialUk: {},
        financialInternational: decryptFinancialInternational(mockFinancialInternational),
      };

      expect(result).toEqual(expected);
    });

    it('should call the decrypt function twice', () => {
      decryptNominatedLossPayee(populatedNominatedLossPayee, false, true);

      const {
        bicSwiftCode,
        iban,
        vector: { bicSwiftCodeVector, ibanVector },
      } = mockFinancialInternational;

      expect(decryptSpy).toHaveBeenCalledTimes(2);
      expect(decryptSpy).toHaveBeenCalledWith({ iv: ibanVector, value: iban });
      expect(decryptSpy).toHaveBeenCalledWith({ iv: bicSwiftCodeVector, value: bicSwiftCode });
    });
  });

  describe('when the an error occurs', () => {
    it('should throw an error', async () => {
      const mockNominatedLossPayeeError = {
        ...nominatedLossPayee,
        id: '1',
        financialUk: { ...nominatedLossPayee.financialUk, id: '1' },
        financialInternational: { ...nominatedLossPayee.financialInternational, id: '2' },
      };

      try {
        decryptNominatedLossPayee(mockNominatedLossPayeeError, true);
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error decrypting nominated loss payee')).toEqual(true);
      }
    });
  });
});
