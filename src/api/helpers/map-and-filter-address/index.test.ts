import mapAndFilterAddress from '.';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';
import mapAddress from '../map-address';

describe('mapAndFilterAddress', () => {
  const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results;

  describe('when an address is found', () => {
    it('should return a single element array when searching by house number', () => {
      const address = ordnanceSurveyResponse[0].DPA;

      const result = mapAndFilterAddress(address.BUILDING_NUMBER, ordnanceSurveyResponse);

      const expected = [mapAddress(ordnanceSurveyResponse[0])];

      expect(result).toEqual(expected);
    });

    it('should return a single element array when searching by house name', () => {
      const result = mapAndFilterAddress('TEST', ordnanceSurveyResponse);

      const expected = [mapAddress(ordnanceSurveyResponse[2])];

      expect(result).toEqual(expected);
    });
  });

  describe('when no addresses are found', () => {
    it('should return an empty array', () => {
      const result = mapAndFilterAddress('ABC', ordnanceSurveyResponse);

      expect(result).toEqual([]);
    });
  });
});
