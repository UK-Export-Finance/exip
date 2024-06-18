import getOrdnanceSurveyAddress from '.';
import ordnanceSurvey from '../../../integrations/ordnance-survey';
import mapAndFilterAddress from '../../../helpers/map-and-filter-address';
import mockOrdnanceSurveyResponse from '../../../test-mocks/mock-ordnance-survey-response';
import { MOCK_OS_ADDRESS_INPUT } from '../../../test-mocks/mock-os-address-input';
import { OrdnanceSurveyResponse } from '../../../types';

describe('getOrdnanceSurveyAddress', () => {
  jest.mock('../../../integrations/ordnance-survey');

  afterAll(() => {
    jest.resetAllMocks();
  });

  const { postcode, houseNameOrNumber } = MOCK_OS_ADDRESS_INPUT;

  describe('when ordnance survey API returns success as false', () => {
    beforeEach(() => {
      ordnanceSurvey.get = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return object containing success as false', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber });

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when ordnance survey API returns empty data object', () => {
    beforeEach(() => {
      ordnanceSurvey.get = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return object containing success as false', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber });

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when ordnanceSurvey API is down', () => {
    beforeEach(() => {
      ordnanceSurvey.get = jest.fn(() => Promise.reject());
    });

    it('should return object containing success as false and apiError as true', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber });

      const expected = { success: false, apiError: true };

      expect(response).toEqual(expected);
    });
  });

  describe('when the postcode is invalid', () => {
    it('should return object containing success as false and invalidPostcode as true', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode: 'S', houseNameOrNumber });

      const expected = { success: false, invalidPostcode: true };

      expect(response).toEqual(expected);
    });
  });

  describe('when ordnance survey API returns a valid response', () => {
    beforeEach(() => {
      const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results as Array<OrdnanceSurveyResponse>;
      ordnanceSurvey.get = jest.fn(() => Promise.resolve({ success: true, data: ordnanceSurveyResponse }));
    });

    it('should return object containing success as true and the mapped address', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber });

      const expected = { success: true, addresses: mapAndFilterAddress('10', mockOrdnanceSurveyResponse.results) };

      expect(response).toEqual(expected);
    });

    it('should return object containing success as false and noAddressesFound as true when house number not found', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber: 'A' });

      const expected = { success: false, noAddressesFound: true };

      expect(response).toEqual(expected);
    });
  });
});
