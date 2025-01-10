import mapOrdnanceSurveyAddresses from '.';
import mapAddress from '../map-ordnance-survey-address';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';

const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results;

describe('api/helpers/map-ordnance-survey-addresses', () => {
  it('should return an array of mapped addresses', () => {
    const result = mapOrdnanceSurveyAddresses(ordnanceSurveyResponse);

    const expected = ordnanceSurveyResponse.map((address) => mapAddress(address));

    expect(result).toEqual(expected);
  });
});
