import decryptFinancialUk from '.';
import mockApplication from '../../test-mocks/mock-application';
import decryptData from '../decrypt';

const {
  nominatedLossPayee: { financialUk },
} = mockApplication;

const decryptSpyResponse = '123456';

describe('api/helpers/decrypt-financial-uk', () => {
  jest.mock('../decrypt');

  let decryptSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    decryptSpy = jest.fn(() => decryptSpyResponse);

    decryptData.decrypt = decryptSpy;
  });

  it('should return decrypted sortCode and accountNumber', () => {
    const result = decryptFinancialUk(financialUk);

    const expected = {
      ...financialUk,
      sortCode: decryptSpyResponse,
      accountNumber: decryptSpyResponse,
    };

    expect(result).toEqual(expected);
  });

  describe('when an empty object is provided', () => {
    it('should return empty strings for sortCode and accountNumber', () => {
      const result = decryptFinancialUk({ id: '1', accountNumber: '', sortCode: '' });

      const expected = {
        id: '1',
        sortCode: '',
        accountNumber: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      try {
        decryptFinancialUk({ ...financialUk, id: '1' });
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error decrypting financial uk')).toEqual(true);
      }
    });
  });
});
