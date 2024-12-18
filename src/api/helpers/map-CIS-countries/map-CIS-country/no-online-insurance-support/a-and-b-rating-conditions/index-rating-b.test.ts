import aAndBRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    COUNTRY_RATINGS,
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH },
    SHORT_TERM_COVER_AVAILABLE: { NO, ILC, CILC },
  },
} = EXTERNAL_API_DEFINITIONS;

const createMockParams = (esraClassification: string, shortTermCover: string) =>
  COUNTRY_RATINGS.B.map((rating: string) => ({
    countryRating: rating,
    esraClassification,
    shortTermCover,
  }));

const params = {
  STANDARD: {
    [ILC]: createMockParams(STANDARD, ILC),
    [CILC]: createMockParams(STANDARD, CILC),
    [NO]: createMockParams(STANDARD, NO),
  },
  HIGH: {
    [ILC]: createMockParams(HIGH, ILC),
    [CILC]: createMockParams(HIGH, CILC),
    [NO]: createMockParams(HIGH, NO),
  },
  VERY_HIGH: {
    [ILC]: createMockParams(VERY_HIGH, ILC),
    [CILC]: createMockParams(VERY_HIGH, CILC),
    [NO]: createMockParams(VERY_HIGH, NO),
  },
};

describe('helpers/map-CIS-countries/map-CIS-country/no-insurance-support/a-and-b-rating-conditions - rating as B', () => {
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

    describe.each(params.STANDARD[NO])(`when the short term cover is ${NO}`, (countryObj) => {
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

    describe.each(params.HIGH[NO])(`when the short term cover is ${NO}`, (countryObj) => {
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

    describe.each(params.VERY_HIGH[NO])(`when the short term cover is ${NO}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = aAndBRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });
  });
});
