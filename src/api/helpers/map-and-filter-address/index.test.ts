import mapAndFilterAddress from '.';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';
import { OrdnanceSurveyAddress } from '../../types';

const generateAddress = (address: OrdnanceSurveyAddress) => ({
  addressLine1: `${address.ORGANISATION_NAME || ''} ${address.BUILDING_NAME || ''} ${address.BUILDING_NUMBER || ''} ${address.THOROUGHFARE_NAME || ''}`.trim(),
  addressLine2: undefined,
  town: address.POST_TOWN || undefined,
  county: undefined,
  postalCode: address.POSTCODE,
});

describe('mapAndFilterAddress', () => {
  const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results;

  describe('when an address is found', () => {
    it('should return a single element array when searching by house number', () => {
      const address = ordnanceSurveyResponse[0].DPA;

      const result = mapAndFilterAddress(address.BUILDING_NUMBER, ordnanceSurveyResponse);

      const expected = [generateAddress(address)];

      expect(result).toEqual(expected);
    });

    it('should return a single element array when searching by house number', () => {
      const address = ordnanceSurveyResponse[2].DPA;

      const result = mapAndFilterAddress('TEST', ordnanceSurveyResponse);

      const expected = [generateAddress(address)];

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
