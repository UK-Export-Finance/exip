import mockOrdnanceSurveyResponse from './mock-ordnance-survey-response';

export const MOCK_OS_ADDRESS_INPUT = {
  postcode: mockOrdnanceSurveyResponse.results[1].DPA.POSTCODE || '',
  houseNameOrNumber: mockOrdnanceSurveyResponse.results[1].DPA.BUILDING_NAME || '',
};
