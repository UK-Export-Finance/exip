import mapAndFilterOrdnanceSurveyAddresses from '.';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';
import mapAddress from '../map-ordnance-survey-address';

describe('mapAndFilterOrdnanceSurveyAddresses', () => {
  const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results;

  describe('when an address is found', () => {
    it('should return a single element array when searching by house number', () => {
      const address = ordnanceSurveyResponse[0].DPA;

      const result = mapAndFilterOrdnanceSurveyAddresses(address.BUILDING_NUMBER, ordnanceSurveyResponse);

      const expected = [mapAddress(ordnanceSurveyResponse[0])];

      expect(result).toEqual(expected);
    });

    it('should return a single element array when searching by house name', () => {
      const result = mapAndFilterOrdnanceSurveyAddresses('TEST', ordnanceSurveyResponse);

      const expected = [mapAddress(ordnanceSurveyResponse[2])];

      expect(result).toEqual(expected);
    });
  });

  describe('when no addresses are found', () => {
    it('should return an empty array', () => {
      const result = mapAndFilterOrdnanceSurveyAddresses('ABC', ordnanceSurveyResponse);

      expect(result).toEqual([]);
    });
  });
});
