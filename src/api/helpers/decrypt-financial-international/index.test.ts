import decryptFinancialInternational from '.';
import mockApplication from '../../test-mocks/mock-application';
import decryptData from '../decrypt';
import { ApplicationLossPayeeFinancialInternational } from '../../types';

const {
  nominatedLossPayee: { financialInternational },
} = mockApplication;

const decryptSpyResponse = '123456';

describe('api/helpers/decrypt-financial-international', () => {
  jest.mock('../decrypt');

  let decryptSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    decryptSpy = jest.fn(() => decryptSpyResponse);

    decryptData.decrypt = decryptSpy;
  });

  describe('when all variables are provided', () => {
    it('should return decrypted iban and bicSwiftCode', () => {
      const result = decryptFinancialInternational(financialInternational);

      const expected = {
        ...financialInternational,
        iban: decryptSpyResponse,
        bicSwiftCode: decryptSpyResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  // describe('when ibanVector is undefined', () => {
  //   it('should return iban as an empty string', () => {
  //     const variables = {
  //       ...financialInternational,
  //       ibanVector: undefined,
  //     } as ApplicationLossPayeeFinancialInternational;

  //     const result = decryptFinancialInternational(variables);

  //     const expected = {
  //       ...variables,
  //       iban: '',
  //     };

  //     expect(result).toEqual(expected);
  //   });
  // });

  describe('when iban is undefined', () => {
    it('should return iban as an empty string', () => {
      const variables = {
        ...financialInternational,
        iban: undefined,
      } as ApplicationLossPayeeFinancialInternational;

      const result = decryptFinancialInternational(variables);

      const expected = {
        ...variables,
        iban: '',
      };

      expect(result).toEqual(expected);
    });
  });

  // describe('when bicSwiftCodeVector is undefined', () => {
  //   it('should return bicSwiftCode as an empty string', () => {
  //     const variables = {
  //       ...financialInternational,
  //       bicSwiftCodeVector: undefined,
  //     } as ApplicationLossPayeeFinancialInternational;

  //     const result = decryptFinancialInternational(variables);

  //     const expected = {
  //       ...variables,
  //       bicSwiftCode: '',
  //     };

  //     expect(result).toEqual(expected);
  //   });
  // });

  // describe('when bicSwift is undefined', () => {
  //   it('should return bicSwiftCode as an empty string', () => {
  //     const variables = {
  //       ...financialInternational,
  //       bicSwiftCodeVector: undefined,
  //     } as ApplicationLossPayeeFinancialInternational;

  //     const result = decryptFinancialInternational(variables);

  //     const expected = {
  //       ...variables,
  //       bicSwiftCode: '',
  //     };

  //     expect(result).toEqual(expected);
  //   });
  // });

  describe('when all variables are undefined', () => {
    it('should return iban and bicSwiftCode as an empty string', () => {
      const variables = {
        ...financialInternational,
        iban: undefined,
        bicSwiftCode: undefined,
      } as ApplicationLossPayeeFinancialInternational;

      const result = decryptFinancialInternational(variables);

      const expected = {
        ...variables,
        iban: '',
        bicSwiftCode: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      try {
        decryptFinancialInternational({ ...financialInternational, id: '1' });
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error decrypting financial uk')).toEqual(true);
      }
    });
  });
});
