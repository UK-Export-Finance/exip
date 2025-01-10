import filterOrdnanceSurveyAddresses from '.';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';

const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results;

describe('api/helpers/filter-ordnance-survey-addresses', () => {
  describe('when an address has a SUB_BUILDING_NAME with a matching substring', () => {
    it('should return an array with address', () => {
      const [address] = ordnanceSurveyResponse;

      const substring = String(address.DPA.SUB_BUILDING_NAME)?.substring(0, 5);

      const result = filterOrdnanceSurveyAddresses(ordnanceSurveyResponse, substring);

      const expected = [address];

      expect(result).toEqual(expected);
    });
  });

  describe('when an address has a BUILDING_NAME with a matching substring', () => {
    it('should return an array with the address', () => {
      const { 1: address } = ordnanceSurveyResponse;

      const substring = String(address.DPA.BUILDING_NAME)?.substring(0, 5);

      const result = filterOrdnanceSurveyAddresses(ordnanceSurveyResponse, substring);

      const expected = [address];

      expect(result).toEqual(expected);
    });
  });

  describe('when an address has a ORGANISATION_NAME with a matching substring', () => {
    it('should return an array with the address', () => {
      const { 2: address } = ordnanceSurveyResponse;

      const substring = String(address.DPA.ORGANISATION_NAME)?.substring(0, 5);

      const result = filterOrdnanceSurveyAddresses(ordnanceSurveyResponse, substring);

      const expected = [address];

      expect(result).toEqual(expected);
    });
  });

  describe('when an address has a BUILDING_NUMBER with a matching substring', () => {
    it('should return an array with the address', () => {
      const { 3: address } = ordnanceSurveyResponse;

      const substring = String(address.DPA.BUILDING_NUMBER)?.substring(0, 5);

      const result = filterOrdnanceSurveyAddresses(ordnanceSurveyResponse, substring);

      const expected = [address];

      expect(result).toEqual(expected);
    });
  });

  describe('when no address is found', () => {
    it('should return an empty array', () => {
      const substring = 'mock sub string';

      const result = filterOrdnanceSurveyAddresses(ordnanceSurveyResponse, substring);

      expect(result).toEqual([]);
    });
  });
});
