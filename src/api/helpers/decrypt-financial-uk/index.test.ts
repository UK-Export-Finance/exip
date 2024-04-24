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

  try {
    decryptFinancialUk();
  } catch (err) {
    const errorString = String(err);

    expect(errorString.includes('Error decrypting financial uk')).toEqual(true);
  }
});
