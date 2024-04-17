import decryptApplication from '.';
import decryptFinancialUkData from '../decrypt-financial-uk';
import mockApplication from '../../test-mocks/mock-application';
import decrypt from '../decrypt';

const {
  nominatedLossPayee: { financialUk },
} = mockApplication;

describe('api/helpers/decrypt-application', () => {
  jest.mock('../decrypt');

  let decryptSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    decryptSpy = jest.fn(() => '123456');

    decrypt.decrypt = decryptSpy;
  });

  describe('when "decryptFinancialUk" is "false"', () => {
    it('should return provided application', () => {
      const result = decryptApplication(mockApplication, false);

      expect(result).toEqual(mockApplication);
    });

    it('should not call the decrypt function', () => {
      decryptApplication(mockApplication, false);

      expect(decryptSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('when "decryptFinancialUk" is "true"', () => {
    it('should return result of decryptFinancialUkData for financialUk', () => {
      const result = decryptApplication(mockApplication, true);

      const expected = {
        ...mockApplication,
        nominatedLossPayee: {
          ...mockApplication.nominatedLossPayee,
          financialUk: {
            ...financialUk,
            ...decryptFinancialUkData(financialUk),
          },
        },
      };

      expect(result).toEqual(expected);
    });

    it('should call the decrypt function twice (for account number and sort code)', () => {
      decryptApplication(mockApplication, true);

      expect(decryptSpy).toHaveBeenCalledTimes(2);
    });
  });
});
