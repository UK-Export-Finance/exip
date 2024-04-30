import decryptFinancialInternational from '.';
import decryptData from '../decrypt';
import mockApplication, { mockLossPayeeFinancialDetailsInternationalVector } from '../../test-mocks/mock-application';

const {
  nominatedLossPayee: { financialInternational },
} = mockApplication;

const decryptSpyResponse = '123456';

const emptyVectorObj = {
  id: mockLossPayeeFinancialDetailsInternationalVector.id,
};

describe('api/helpers/decrypt-financial-international', () => {
  jest.mock('../decrypt');

  let decryptSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    decryptSpy = jest.fn(() => decryptSpyResponse);

    decryptData.decrypt = decryptSpy;
  });

  describe('when all fields are provided', () => {
    it('should return decrypted iban and bicSwiftCode', () => {
      const result = decryptFinancialInternational({
        ...financialInternational,
        vector: mockLossPayeeFinancialDetailsInternationalVector,
      });

      const expected = {
        iban: decryptSpyResponse,
        bicSwiftCode: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when iban is undefined', () => {
    it('should return decrypted bicSwiftCode', () => {
      const result = decryptFinancialInternational({
        ...financialInternational,
        iban: undefined,
        vector: mockLossPayeeFinancialDetailsInternationalVector,
      });

      const expected = {
        bicSwiftCode: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when ibanVector is undefined', () => {
    it('should return decrypted bicSwiftCode', () => {
      const result = decryptFinancialInternational({
        ...financialInternational,
        vector: {
          ...mockLossPayeeFinancialDetailsInternationalVector,
          ibanVector: undefined,
        },
      });

      const expected = {
        bicSwiftCode: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when bicSwiftCode is undefined', () => {
    it('should return decrypted iban', () => {
      const result = decryptFinancialInternational({
        ...financialInternational,
        bicSwiftCode: undefined,
        vector: mockLossPayeeFinancialDetailsInternationalVector,
      });

      const expected = {
        iban: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when bicSwiftCodeVector is undefined', () => {
    it('should return decrypted iban', () => {
      const result = decryptFinancialInternational({
        ...financialInternational,
        vector: {
          ...mockLossPayeeFinancialDetailsInternationalVector,
          bicSwiftCodeVector: undefined,
        },
      });

      const expected = {
        iban: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when all fields are undefined', () => {
    it('should return an empty object', () => {
      const result = decryptFinancialInternational({
        ...financialInternational,
        iban: undefined,
        bicSwiftCode: undefined,
        vector: emptyVectorObj,
      });

      expect(result).toEqual({});
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      try {
        decryptFinancialInternational({ id: '1', vector: emptyVectorObj });
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error decrypting financial uk')).toEqual(true);
      }
    });
  });
});
