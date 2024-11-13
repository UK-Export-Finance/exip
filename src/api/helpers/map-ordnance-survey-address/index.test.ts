import mapOrdnanceSurveyAddress from '.';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';
import { OrdnanceSurveyResponse } from '../../types';

describe('mapOrdnanceSurveyAddress', () => {
  const mockSubBuildingName = 'Mock sub building name';
  const mockOrganisationName = 'Mock organisation name';
  const mockBuildingName = 'Mock building name';

  const mockAddressFullyPopulated: OrdnanceSurveyResponse = {
    DPA: {
      ...mockOrdnanceSurveyResponse.results[0].DPA,
      SUB_BUILDING_NAME: mockSubBuildingName,
      ORGANISATION_NAME: mockOrganisationName,
      BUILDING_NAME: mockBuildingName,
    },
  };

  const expectedBase = {
    town: mockAddressFullyPopulated.DPA.POST_TOWN,
    postalCode: mockAddressFullyPopulated.DPA.POSTCODE,
  };

  describe('when address has all conditional addressLine1 properties', () => {
    it('should return an object with fully populated addressLine1', () => {
      const result = mapOrdnanceSurveyAddress(mockAddressFullyPopulated);

      const expected = {
        ...expectedBase,
        addressLine1: `${mockSubBuildingName} ${mockOrganisationName} ${mockBuildingName}`,
        addressLine2: mockAddressFullyPopulated.DPA.THOROUGHFARE_NAME,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when address has only a SUB_BUILDING_NAME addressLine1 property', () => {
    it('should return an object with partially populated addressLine1', () => {
      const mockAddress = mockAddressFullyPopulated;
      mockAddress.DPA.ORGANISATION_NAME = '';
      mockAddress.DPA.BUILDING_NAME = '';

      const result = mapOrdnanceSurveyAddress(mockAddressFullyPopulated);

      const expected = {
        ...expectedBase,
        addressLine1: mockSubBuildingName,
        addressLine2: mockAddressFullyPopulated.DPA.THOROUGHFARE_NAME,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when address has only an ORGANISATION_NAME addressLine1 property', () => {
    it('should return an object with partially populated addressLine1', () => {
      const mockAddress = mockAddressFullyPopulated;
      mockAddress.DPA.SUB_BUILDING_NAME = '';
      mockAddress.DPA.BUILDING_NAME = '';

      const result = mapOrdnanceSurveyAddress(mockAddressFullyPopulated);

      const expected = {
        ...expectedBase,
        addressLine1: mockOrganisationName,
        addressLine2: mockAddressFullyPopulated.DPA.THOROUGHFARE_NAME,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when address has only a BUILDING_NAME addressLine1 property', () => {
    it('should return an object with partially populated addressLine1', () => {
      const mockAddress = mockAddressFullyPopulated;
      mockAddress.DPA.SUB_BUILDING_NAME = '';
      mockAddress.DPA.ORGANISATION_NAME = '';

      const result = mapOrdnanceSurveyAddress(mockAddressFullyPopulated);

      const expected = {
        ...expectedBase,
        addressLine1: mockBuildingName,
        addressLine2: mockAddressFullyPopulated.DPA.THOROUGHFARE_NAME,
      };

      expect(result).toEqual(expected);
    });
  });
});
