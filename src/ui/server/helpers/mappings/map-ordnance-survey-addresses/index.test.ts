import mapOrdnanceSurveyAddresses from '.';
import { mockOrdnanceSurveyAddressResponse } from '../../../test-mocks';

const { addresses: mockAddresses } = mockOrdnanceSurveyAddressResponse;

describe('helpers/mappings/map-ordnance-survey-addresses', () => {
  it('should return an array of mapped addresses', () => {
    const result = mapOrdnanceSurveyAddresses(mockAddresses);

    const expected = mockAddresses.map((address) => ({
      text: `${address.addressLine1} ${address.addressLine2}`,
      value: `${address.addressLine1} ${address.addressLine2}`,
    }));

    expect(result).toEqual(expected);
  });
});
