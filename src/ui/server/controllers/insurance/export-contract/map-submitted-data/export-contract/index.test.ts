import mapSubmittedData from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import getCountryByIsoCode from '../../../../../helpers/get-country-by-iso-code';
import { mockCountries, mockExportContract } from '../../../../../test-mocks';
import { RequestBody } from '../../../../../../types';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
} = FIELD_IDS;

const mockCountryIsoCode = mockCountries[0].isoCode;
const mockAwardMethodId = mockExportContract.awardMethod.id;

describe('controllers/insurance/export-contract/map-submitted-data/export-contract', () => {
  let mockFormBody: RequestBody;

  beforeEach(() => {
    mockFormBody = {
      [DESCRIPTION]: 'Mock description about my services',
      [FINAL_DESTINATION_KNOWN]: 'true',
    };
  });

  describe(`when ${AWARD_METHOD} field is an empty string`, () => {
    it(`should return the form body without ${AWARD_METHOD}`, () => {
      const mockBodyWithAwardMethod = {
        ...mockFormBody,
        [AWARD_METHOD]: '',
      };

      const result = mapSubmittedData(mockBodyWithAwardMethod);

      expect(result[AWARD_METHOD]).toBeUndefined();
    });
  });

  describe(`when ${AWARD_METHOD} field is provided`, () => {
    it(`should return the form body with ${AWARD_METHOD} as a connect object`, () => {
      const mockBodyWithAwardMethod = {
        ...mockFormBody,
        [AWARD_METHOD]: mockAwardMethodId,
      };

      const result = mapSubmittedData(mockBodyWithAwardMethod);

      const expected = {
        ...mockFormBody,
        [AWARD_METHOD]: {
          connect: {
            id: mockAwardMethodId,
          },
        },
      };

      expect(result).toEqual(expected);
    });
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

  describe(`when ${AWARD_METHOD} is not equal to ${OTHER_AWARD_METHOD}`, () => {
    it(`should return the form body with an empty ${OTHER_AWARD_METHOD}`, () => {
      const mockBodyWithoutCountry = {
        ...mockFormBody,
        [AWARD_METHOD]: mockAwardMethodId,
        [OTHER_AWARD_METHOD]: 'test',
      };

      const result = mapSubmittedData(mockBodyWithoutCountry, mockCountries);

      const expected = {
        ...mockFormBody,
        [AWARD_METHOD]: {
          connect: {
            id: mockAwardMethodId,
          },
        },
        [OTHER_AWARD_METHOD]: '',
      };

      expect(result).toEqual(expected);
    });
  });
});
