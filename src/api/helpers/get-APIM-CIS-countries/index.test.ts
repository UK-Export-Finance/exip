import apimCisCountries from '.';
import APIM from '../../integrations/APIM';
import mapCisCountries from '../map-CIS-countries';
import mockCisCountriesResponse from '../../test-mocks/mock-APIM-CIS-countries-response';
import { mockCisCountries, mockErrorMessage, mockSpyPromiseRejection } from '../../test-mocks';

describe('helpers/get-APIM-CIS-countries', () => {
  jest.mock('../../integrations/APIM');

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when APIM CIS API returns success with data/countries', () => {
    beforeEach(() => {
      APIM.getCisCountries = jest.fn(() => Promise.resolve(mockCisCountriesResponse));
    });

    it('should return mapped countries', async () => {
      const response = await apimCisCountries.get();

      const expected = {
        success: true,
        countries: mapCisCountries(mockCisCountries),
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM CIS API returns success=false', () => {
    beforeEach(() => {
      APIM.getCisCountries = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return object containing success=false', async () => {
      const response = await apimCisCountries.get();

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM CIS API returns empty data object', () => {
    beforeEach(() => {
      APIM.getCisCountries = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return object containing success=false', async () => {
      const response = await apimCisCountries.get();

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when APIM CIS API is down', () => {
    beforeEach(() => {
      APIM.getCisCountries = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await apimCisCountries.get();
      } catch (error) {
        const expected = new Error(`Getting and mapping CIS countries from APIM (apimCisCountries helper) ${new Error(mockErrorMessage)}`);

        expect(error).toEqual(expected);
      }
    });
  });
});
