import mapAndFilterOrdnanceSurveyAddresses from '.';
import filterOrdnanceSurveyAddresses from '../filter-ordnance-survey-addresses';
import mapAddress from '../map-ordnance-survey-address';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';

const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results;

describe('api/helpers/map-and-filter-ordnance-survey-addresses', () => {
  it('should return an filtered and mapped addresses', () => {
    const mockHouseNameOrNumber = 'ABC';

    const result = mapAndFilterOrdnanceSurveyAddresses(ordnanceSurveyResponse, mockHouseNameOrNumber);

    const filtered = filterOrdnanceSurveyAddresses(ordnanceSurveyResponse, mockHouseNameOrNumber);

    const expected = filtered.map((address) => mapAddress(address));

    expect(result).toEqual(expected);
  });
});
