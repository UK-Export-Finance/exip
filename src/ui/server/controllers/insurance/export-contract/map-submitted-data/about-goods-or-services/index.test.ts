import mapSubmittedData from '.';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import getCountryByName from '../../../../../helpers/get-country-by-name';
import { mockCountries } from '../../../../../test-mocks';
import { RequestBody } from '../../../../../../types';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/export-contract/map-submitted-data/about-goods-or-services', () => {
  let mockFormBody: RequestBody;

  beforeEach(() => {
    mockFormBody = {
      [DESCRIPTION]: 'Mock description about my services',
      [FINAL_DESTINATION_KNOWN]: 'true',
    };
  });

  describe(`when ${FINAL_DESTINATION} field is provided`, () => {
    it(`should return the form body with ${FINAL_DESTINATION} as a country ISO code`, () => {
      const mockCountryName = mockCountries[0].name;

      const mockBodyWithCountry = {
        ...mockFormBody,
        [FINAL_DESTINATION]: mockCountryName,
      };

      const result = mapSubmittedData(mockBodyWithCountry, mockCountries);

      const expected = {
        ...mockFormBody,
        [FINAL_DESTINATION]: getCountryByName(mockCountries, mockCountryName)?.isoCode,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FINAL_DESTINATION} field is NOT provided`, () => {
    it('should return the form body as is', () => {
      const mockBodyWithoutCountry = {
        ...mockFormBody,
        [FINAL_DESTINATION]: '',
      };

      const result = mapSubmittedData(mockBodyWithoutCountry, mockCountries);

      const expected = {
        ...mockFormBody,
        [FINAL_DESTINATION]: '',
      };

      expect(result).toEqual(expected);
    });
  });
});
