import decryptNominatedLossPayee from '.';
import decryptFinancialUkData from '../decrypt-financial-uk';
import mockApplication from '../../test-mocks/mock-application';
import decrypt from '../decrypt';

const { nominatedLossPayee } = mockApplication;
const { financialUk } = nominatedLossPayee;

describe('api/helpers/decrypt-nominated-loss-payee', () => {
  jest.mock('../decrypt');

  let decryptSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    decryptSpy = jest.fn(() => '123456');

    decrypt.decrypt = decryptSpy;
  });

  describe('when "decryptFinancialUk" is "false"', () => {
    it('should return provided nominatedLossPayee', () => {
      const result = decryptNominatedLossPayee(nominatedLossPayee, false);

      expect(result).toEqual(nominatedLossPayee);
    });

    it('should not call the decrypt function', () => {
      decryptNominatedLossPayee(nominatedLossPayee, false);

      expect(decryptSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('when "decryptFinancialUk" is "true"', () => {
    it('should return result of decryptFinancialUkData for financialUk', () => {
      const result = decryptNominatedLossPayee(nominatedLossPayee, true);

      const expected = {
        ...mockApplication.nominatedLossPayee,
        financialUk: {
          ...financialUk,
          ...decryptFinancialUkData(financialUk),
        },
      };

      expect(result).toEqual(expected);
    });

    it('should call the decrypt function twice (for account number and sort code)', () => {
      decryptNominatedLossPayee(nominatedLossPayee, true);

      const { accountNumber, accountNumberVector, sortCode, sortCodeVector } = mockApplication.nominatedLossPayee.financialUk;

      expect(decryptSpy).toHaveBeenCalledTimes(2);
      expect(decryptSpy).toHaveBeenCalledWith({ iv: accountNumberVector, value: accountNumber });
      expect(decryptSpy).toHaveBeenCalledWith({ iv: sortCodeVector, value: sortCode });
    });
  });
});
