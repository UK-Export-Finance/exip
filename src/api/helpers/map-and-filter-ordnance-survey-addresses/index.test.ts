import mapAndFilterOrdnanceSurveyAddresses from '.';
import filterOrdnanceSurveyAddresses from '../filter-ordnance-survey-addresses';
import mapOrdnanceSurveyAddresses from '../map-ordnance-survey-addresses';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';

const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results;

describe('api/helpers/map-and-filter-ordnance-survey-addresses', () => {
  it('should return an filtered and mapped addresses', () => {
    const mockHouseNameOrNumber = 'ABC';

    const result = mapAndFilterOrdnanceSurveyAddresses(ordnanceSurveyResponse, mockHouseNameOrNumber);

    const filtered = filterOrdnanceSurveyAddresses(ordnanceSurveyResponse, mockHouseNameOrNumber);

    const expected = mapOrdnanceSurveyAddresses(filtered);

    expect(result).toEqual(expected);
  });
});
