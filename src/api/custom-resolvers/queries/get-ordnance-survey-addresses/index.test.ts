import getOrdnanceSurveyAddress from '.';
import ordnanceSurvey from '../../../integrations/ordnance-survey';
import mapAndFilterOrdnanceSurveyAddresses from '../../../helpers/map-and-filter-ordnance-survey-addresses';
import mockOrdnanceSurveyResponse from '../../../test-mocks/mock-ordnance-survey-response';
import { MOCK_OS_ADDRESS_INPUT } from '../../../test-mocks/mock-os-address-input';
import { OrdnanceSurveyAddress } from '../../../types';
import { mockSpyPromiseRejection } from '../../../test-mocks';

describe('getOrdnanceSurveyAddresses', () => {
  jest.mock('../../../integrations/ordnance-survey');

  afterAll(() => {
    jest.resetAllMocks();
  });

  const { postcode, houseNameOrNumber } = MOCK_OS_ADDRESS_INPUT;

  describe('when ordnance survey API returns success=false', () => {
    beforeEach(() => {
      ordnanceSurvey.get = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return object containing success=false', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber });

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when ordnance survey API returns an empty data object', () => {
    beforeEach(() => {
      ordnanceSurvey.get = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return object containing success=false', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber });

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when the postcode is invalid', () => {
    it('should return object containing success=false and invalidPostcode=true', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode: 'S', houseNameOrNumber });

      const expected = { success: false, invalidPostcode: true };

      expect(response).toEqual(expected);
    });
  });

  describe('when ordnance survey API returns a valid response', () => {
    beforeEach(() => {
      const ordnanceSurveyResponse: Array<OrdnanceSurveyAddress> = mockOrdnanceSurveyResponse.results;

      ordnanceSurvey.get = jest.fn(() => Promise.resolve({ success: true, data: ordnanceSurveyResponse }));
    });

    it('should return an object containing success=true and mapped addresses', async () => {
      const response = await getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber });

      const expected = {
        success: true,
        addresses: mapAndFilterOrdnanceSurveyAddresses(mockOrdnanceSurveyResponse.results, houseNameOrNumber),
      };

      expect(response).toEqual(expected);
    });

    describe('when no addresses are found', () => {
      it('should return an object containing success=false and noAddressesFound=true', async () => {
        const response = await getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber: 'NOT FOUND' });

        const expected = { success: false, noAddressesFound: true };

        expect(response).toEqual(expected);
      });
    });
  });

  describe('when ordnanceSurvey API throws an error', () => {
    beforeEach(() => {
      ordnanceSurvey.get = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      const response = getOrdnanceSurveyAddress({}, { postcode, houseNameOrNumber });

      await expect(response).rejects.toThrow('Getting Ordnance Survey addresses');
    });
  });
});
