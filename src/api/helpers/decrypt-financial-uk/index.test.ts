import decryptFinancialUk from '.';
import mockApplication from '../../test-mocks/mock-application';
import decrypt from '../decrypt';

const {
  nominatedLossPayee: { financialUk },
} = mockApplication;

const mock = '123456';

describe('api/helpers/decrypt-application', () => {
  jest.mock('../decrypt');

  let decryptSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    decryptSpy = jest.fn(() => mock);

    decrypt.decrypt = decryptSpy;
  });

  it('should return decrypted sortCode and accountNumber', () => {
    const result = decryptFinancialUk(financialUk);

    const expected = {
      ...financialUk,
      sortCode: mock,
      accountNumber: mock,
    };

    expect(result).toEqual(expected);
  });
});
