import decryptFinancialUk from '.';
import decryptData from '../decrypt';
import mockApplication, { mockLossPayeeFinancialDetailsUkVector } from '../../test-mocks/mock-application';

const {
  nominatedLossPayee: { financialUk },
} = mockApplication;

const decryptSpyResponse = '123456';

const emptyVectorObj = {
  id: mockLossPayeeFinancialDetailsUkVector.id,
};

describe('api/helpers/decrypt-financial-uk', () => {
  jest.mock('../decrypt');

  let decryptSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    decryptSpy = jest.fn(() => decryptSpyResponse);

    decryptData.decrypt = decryptSpy;
  });

  describe('when all fields are provided', () => {
    it('should return decrypted accountNumber and sortCode', () => {
      const result = decryptFinancialUk({
        ...financialUk,
        vector: mockLossPayeeFinancialDetailsUkVector,
      });

      const expected = {
        accountNumber: decryptSpyResponse,
        sortCode: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when accountNumber is undefined', () => {
    it('should return decrypted sortCode', () => {
      const result = decryptFinancialUk({
        ...financialUk,
        accountNumber: undefined,
        vector: mockLossPayeeFinancialDetailsUkVector,
      });

      const expected = {
        sortCode: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when accountNumberVector is undefined', () => {
    it('should return decrypted sortCode', () => {
      const result = decryptFinancialUk({
        ...financialUk,
        vector: {
          ...mockLossPayeeFinancialDetailsUkVector,
          accountNumberVector: undefined,
        },
      });

      const expected = {
        sortCode: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when sortCode is undefined', () => {
    it('should return decrypted accountNumber', () => {
      const result = decryptFinancialUk({
        ...financialUk,
        sortCode: undefined,
        vector: mockLossPayeeFinancialDetailsUkVector,
      });

      const expected = {
        accountNumber: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when sortCodeVector is undefined', () => {
    it('should return decrypted accountNumber', () => {
      const result = decryptFinancialUk({
        ...financialUk,
        vector: {
          ...mockLossPayeeFinancialDetailsUkVector,
          sortCodeVector: undefined,
        },
      });

      const expected = {
        accountNumber: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when all fields are undefined', () => {
    it('should return an empty object', () => {
      const result = decryptFinancialUk({
        ...financialUk,
        accountNumber: undefined,
        sortCode: undefined,
        vector: emptyVectorObj,
      });

      expect(result).toEqual({});
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      try {
        decryptFinancialUk({ id: '1', vector: emptyVectorObj });
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error decrypting financial uk')).toEqual(true);
      }
    });
  });
});
