import decryptFinancialInternational from '.';
import decryptData from '../decrypt';
import { ApplicationLossPayeeFinancialInternational, ApplicationLossPayeeFinancialInternationalVector } from '../../types';
import mockApplication, { mockLossPayeeFinancialDetailsInternationalVector } from '../../test-mocks/mock-application';

const {
  nominatedLossPayee: { financialInternational },
} = mockApplication;

const decryptSpyResponse = '123456';

const emptyVectorObj = {
  id: mockLossPayeeFinancialDetailsInternationalVector.id,
} as ApplicationLossPayeeFinancialInternationalVector;

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
      } as ApplicationLossPayeeFinancialInternational);

      const expected = {
        ...financialInternational,
        vector: mockLossPayeeFinancialDetailsInternationalVector,
        bicSwiftCode: decryptSpyResponse,
        iban: decryptSpyResponse,
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
      } as ApplicationLossPayeeFinancialInternational);

      const expected = {
        ...financialInternational,
        vector: mockLossPayeeFinancialDetailsInternationalVector,
        bicSwiftCode: '',
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
      } as ApplicationLossPayeeFinancialInternational);

      const expected = {
        ...financialInternational,
        vector: {
          ...mockLossPayeeFinancialDetailsInternationalVector,
          bicSwiftCodeVector: undefined,
        },
        bicSwiftCode: '',
        iban: decryptSpyResponse,
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
      } as ApplicationLossPayeeFinancialInternational);

      const expected = {
        ...financialInternational,
        vector: mockLossPayeeFinancialDetailsInternationalVector,
        iban: '',
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
      } as ApplicationLossPayeeFinancialInternational);

      const expected = {
        ...financialInternational,
        vector: {
          ...mockLossPayeeFinancialDetailsInternationalVector,
          ibanVector: undefined,
        },
        bicSwiftCode: decryptSpyResponse,
        iban: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when all fields are undefined', () => {
    it('should return the provided object with empty strings', () => {
      const emptyFields = {
        ...financialInternational,
        bicSwiftCode: undefined,
        iban: undefined,
        vector: emptyVectorObj,
      };

      const result = decryptFinancialInternational(emptyFields);

      const expected = {
        ...emptyFields,
        bicSwiftCode: '',
        iban: '',
      };

      expect(result).toEqual(expected);
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
