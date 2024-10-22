import getApimCurrencies from '.';
import APIM from '../../../integrations/APIM';
import apimCisCurrencies from '../../../helpers/get-APIM-currencies';
import mockApimCurrenciesResponse from '../../../test-mocks/mock-APIM-currencies-response';
import { mockErrorMessage, mockSpyPromiseRejection } from '../../../test-mocks';

describe('custom-resolvers/get-APIM-currencies', () => {
  jest.mock('../../../helpers/get-APIM-currencies');

  beforeEach(() => {
    apimCisCurrencies.get = jest.fn(() => Promise.resolve(mockApimCurrenciesResponse));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the result of apimCisCurrencies.get', async () => {
    const response = await getApimCurrencies();

    const expected = await apimCisCurrencies.get();

    expect(response).toEqual(expected);
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      APIM.getCurrencies = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await getApimCurrencies();
      } catch (error) {
        const expected = new Error(`Getting and mapping currencies from APIM ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
