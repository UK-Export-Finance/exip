import mapSubmittedData from '.';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import getCountryByIsoCode from '../../../../../helpers/get-country-by-iso-code';
import { mockCountries } from '../../../../../test-mocks';
import { RequestBody } from '../../../../../../types';

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
} = EXPORT_CONTRACT_FIELD_IDS;

const mockCountryIsoCode = mockCountries[0].isoCode;

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
      const mockBodyWithCountry = {
        ...mockFormBody,
        [FINAL_DESTINATION]: mockCountryIsoCode,
      };

      const result = mapSubmittedData(mockBodyWithCountry, mockCountries);

      const expected = {
        ...mockFormBody,
        [FINAL_DESTINATION]: getCountryByIsoCode(mockCountries, mockCountryIsoCode)?.isoCode,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FINAL_DESTINATION_KNOWN} field is a false string`, () => {
    it(`should return the form body with an empty ${FINAL_DESTINATION}`, () => {
      const mockBodyWithoutCountry = {
        ...mockFormBody,
        [FINAL_DESTINATION]: mockCountryIsoCode,
        [FINAL_DESTINATION_KNOWN]: 'false',
      };

      const result = mapSubmittedData(mockBodyWithoutCountry, mockCountries);

      const expected = {
        ...mockFormBody,
        [FINAL_DESTINATION]: '',
        [FINAL_DESTINATION_KNOWN]: 'false',
      };

      expect(result).toEqual(expected);
    });
  });
});
