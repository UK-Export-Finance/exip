import aAndBRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    COUNTRY_RATINGS,
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH },
    SHORT_TERM_COVER: { ILC, CILC },
  },
} = EXTERNAL_API_DEFINITIONS;

const createMockParams = (esraClassification: string, shortTermCover: string) =>
  COUNTRY_RATINGS.A.map((rating: string) => ({
    countryRating: rating,
    esraClassification,
    shortTermCover,
  }));

const params = {
  STANDARD: {
    [ILC]: createMockParams(STANDARD, ILC),
    [CILC]: createMockParams(STANDARD, CILC),
  },
  HIGH: {
    [ILC]: createMockParams(HIGH, ILC),
    [CILC]: createMockParams(HIGH, CILC),
  },
  VERY_HIGH: {
    [ILC]: createMockParams(VERY_HIGH, ILC),
    [CILC]: createMockParams(VERY_HIGH, CILC),
  },
};

describe('helpers/map-CIS-countries/map-CIS-country/no-online-support/a-and-b-rating-conditions - rating as A', () => {
  describe(`when the ESRA classification is ${STANDARD}`, () => {
    describe.each(params.STANDARD[ILC])(`when the short term cover is ${ILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = aAndBRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.STANDARD[CILC])(`when the short term cover is ${CILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = aAndBRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });
  });

  describe(`when the ESRA classification is ${HIGH}`, () => {
    describe.each(params.HIGH[ILC])(`when the short term cover is ${ILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = aAndBRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.HIGH[CILC])(`when the short term cover is ${CILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = aAndBRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });
  });

  describe(`when the ESRA classification is ${VERY_HIGH}`, () => {
    describe.each(params.VERY_HIGH[ILC])(`when the short term cover is ${ILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = aAndBRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.VERY_HIGH[CILC])(`when the short term cover is ${CILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = aAndBRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });
  });
});
