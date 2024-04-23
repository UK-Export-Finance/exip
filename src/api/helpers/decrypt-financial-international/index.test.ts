import decryptFinancialInternational from '.';
import mockApplication from '../../test-mocks/mock-application';
import decryptData from '../decrypt';

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
