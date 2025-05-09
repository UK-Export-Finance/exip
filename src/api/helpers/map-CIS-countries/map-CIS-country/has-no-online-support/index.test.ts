import hasNoOnlineSupport from '.';
import aAndBRatingConditions from './a-and-b-rating-conditions';
import cAndDRatingConditions from './c-and-d-rating-conditions';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';
import { mockCisCountry } from '../../../../test-mocks';

const {
  CIS: { COUNTRY_RATINGS },
} = EXTERNAL_API_DEFINITIONS;

const mockInitCountry = {
  esraClassification: mockCisCountry.ESRAClassificationDesc,
  shortTermCover: mockCisCountry.shortTermCoverAvailabilityDesc,
};

describe('helpers/map-CIS-countries/map-CIS-country/has-no-online-support', () => {
  describe('when a country rating is `A`', () => {
    it('should return the result of aAndBRatingConditions', () => {
      const [mockRating] = COUNTRY_RATINGS.A;

      const mockCountry = {
        ...mockInitCountry,
        countryRating: mockRating,
      };

      const result = hasNoOnlineSupport(mockCountry);

      const expected = aAndBRatingConditions({
        countryRating: mockRating,
        esraClassification: mockInitCountry.esraClassification,
        shortTermCover: mockInitCountry.shortTermCover,
      });

      expect(result).toEqual(expected);
    });
  });

  describe('when a country rating is `B`', () => {
    it('should return the result of aAndBRatingConditions', () => {
      const [mockRating] = COUNTRY_RATINGS.B;

      const mockCountry = {
        ...mockInitCountry,
        countryRating: mockRating,
      };

      const result = hasNoOnlineSupport(mockCountry);

      const expected = aAndBRatingConditions({
        countryRating: mockRating,
        esraClassification: mockInitCountry.esraClassification,
        shortTermCover: mockInitCountry.shortTermCover,
      });

      expect(result).toEqual(expected);
    });
  });

  describe('when a country rating is `C`', () => {
    it('should return the result of cAndDRatingConditions', () => {
      const [mockRating] = COUNTRY_RATINGS.C;

      const mockCountry = {
        ...mockInitCountry,
        countryRating: mockRating,
      };

      const result = hasNoOnlineSupport(mockCountry);

      const expected = cAndDRatingConditions({
        countryRating: mockRating,
        esraClassification: mockInitCountry.esraClassification,
        shortTermCover: mockInitCountry.shortTermCover,
      });

      expect(result).toEqual(expected);
    });
  });

  describe('when a country rating is `D`', () => {
    it('should return the result of cAndDRatingConditions', () => {
      const [mockRating] = COUNTRY_RATINGS.D;

      const mockCountry = {
        ...mockInitCountry,
        countryRating: mockRating,
      };

      const result = hasNoOnlineSupport(mockCountry);

      const expected = cAndDRatingConditions({
        countryRating: mockRating,
        esraClassification: mockInitCountry.esraClassification,
        shortTermCover: mockInitCountry.shortTermCover,
      });

      expect(result).toEqual(expected);
    });
  });
});
