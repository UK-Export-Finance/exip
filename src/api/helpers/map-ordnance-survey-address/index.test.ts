import mapOrdnanceSurveyAddress from '.';
import mockOrdnanceSurveyResponse from '../../test-mocks/mock-ordnance-survey-response';
import { OrdnanceSurveyAddress } from '../../types';

describe('api/helpers/map-ordnance-survey-address', () => {
  const mockBuildingNumber = '100';
  const mockSubBuildingName = 'Mock sub building name';
  const mockOrganisationName = 'Mock organisation name';
  const mockBuildingName = 'Mock building name';

  const mockAddressFullyPopulated: OrdnanceSurveyAddress = {
    DPA: {
      ...mockOrdnanceSurveyResponse.results[0].DPA,
      BUILDING_NUMBER: mockBuildingNumber,
      SUB_BUILDING_NAME: mockSubBuildingName,
      ORGANISATION_NAME: mockOrganisationName,
      BUILDING_NAME: mockBuildingName,
    },
  };

  const expectedBase = {
    county: '',
    town: mockAddressFullyPopulated.DPA.POST_TOWN,
    postcode: mockAddressFullyPopulated.DPA.POSTCODE,
  };

  describe('when address has all conditional addressLine1 properties', () => {
    it('should return an object with fully populated addressLine1', () => {
      const result = mapOrdnanceSurveyAddress(mockAddressFullyPopulated);

      const expected = {
        ...expectedBase,
        addressLine1: `${mockBuildingNumber} ${mockSubBuildingName} ${mockOrganisationName} ${mockBuildingName}`,
        addressLine2: mockAddressFullyPopulated.DPA.THOROUGHFARE_NAME,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when address has only a SUB_BUILDING_NAME addressLine1 property', () => {
    it('should return an object with partially populated addressLine1', () => {
      const mockAddress = {
        DPA: {
          ...mockAddressFullyPopulated.DPA,
          BUILDING_NUMBER: '',
          ORGANISATION_NAME: '',
          BUILDING_NAME: '',
        },
      };

      const result = mapOrdnanceSurveyAddress(mockAddress);

      const expected = {
        ...expectedBase,
        addressLine1: mockSubBuildingName,
        addressLine2: mockAddress.DPA.THOROUGHFARE_NAME,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when address has only an ORGANISATION_NAME addressLine1 property', () => {
    it('should return an object with partially populated addressLine1', () => {
      const mockAddress = {
        DPA: {
          ...mockAddressFullyPopulated.DPA,
          BUILDING_NUMBER: '',
          SUB_BUILDING_NAME: '',
          BUILDING_NAME: '',
        },
      };

      const result = mapOrdnanceSurveyAddress(mockAddress);

      const expected = {
        ...expectedBase,
        addressLine1: mockOrganisationName,
        addressLine2: mockAddress.DPA.THOROUGHFARE_NAME,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when address has only a BUILDING_NAME addressLine1 property', () => {
    it('should return an object with partially populated addressLine1', () => {
      const mockAddress = {
        DPA: {
          ...mockAddressFullyPopulated.DPA,
          BUILDING_NUMBER: '',
          SUB_BUILDING_NAME: '',
          ORGANISATION_NAME: '',
        },
      };

      const result = mapOrdnanceSurveyAddress(mockAddress);

      const expected = {
        ...expectedBase,
        addressLine1: mockBuildingName,
        addressLine2: mockAddress.DPA.THOROUGHFARE_NAME,
      };

      expect(result).toEqual(expected);
    });
  });
});
