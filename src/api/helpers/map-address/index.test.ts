import mapAddress from '.';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';
import { OrdnanceSurveyAddress } from '../../types';

const generateAddress = (address: OrdnanceSurveyAddress) => ({
  addressLine1: `${address.ORGANISATION_NAME ?? ''} ${address.BUILDING_NAME ?? ''} ${address.BUILDING_NUMBER ?? ''} ${address.THOROUGHFARE_NAME ?? ''}`.trim(),
  town: address.POST_TOWN,
  postalCode: address.POSTCODE,
});

describe('mapAddress', () => {
  const ordnanceSurveyResponse = mockOrdnanceSurveyResponse.results;

  describe('when address does not have a building name', () => {
    it('should generate address object without building name present', () => {
      const address = ordnanceSurveyResponse[0].DPA;

      const result = mapAddress(ordnanceSurveyResponse[0]);
      const expected = generateAddress(address);

      expect(result).toEqual(expected);
      expect(result.addressLine1).toEqual(`${address.ORGANISATION_NAME}  ${address.BUILDING_NUMBER} ${address.THOROUGHFARE_NAME}`);
    });
  });

  describe('when address has a building name', () => {
    it('should generate address object with building name present', () => {
      const address = ordnanceSurveyResponse[2].DPA;

      const result = mapAddress(ordnanceSurveyResponse[2]);
      const expected = generateAddress(address);

      expect(result).toEqual(expected);
      expect(result.addressLine1).toEqual(`${address.ORGANISATION_NAME} ${address.BUILDING_NAME} ${address.BUILDING_NUMBER} ${address.THOROUGHFARE_NAME}`);
    });
  });
});
