import cAndDRatingConditions from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    COUNTRY_RATINGS,
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH },
    SHORT_TERM_COVER_AVAILABLE: { YES, NO, ILC, CILC, REFER, UNLISTED },
  },
} = EXTERNAL_API_DEFINITIONS;

const createMockParams = (esraClassification: string, shortTermCover: string) =>
  COUNTRY_RATINGS.C.map((rating: string) => ({
    countryRating: rating,
    esraClassification,
    shortTermCover,
  }));

const params = {
  STANDARD: {
    [YES]: createMockParams(STANDARD, YES),
    [ILC]: createMockParams(STANDARD, ILC),
    [CILC]: createMockParams(STANDARD, CILC),
    [REFER]: createMockParams(STANDARD, REFER),
    [UNLISTED]: createMockParams(STANDARD, UNLISTED),
    [NO]: createMockParams(STANDARD, NO),
  },
  HIGH: {
    [YES]: createMockParams(HIGH, YES),
    [ILC]: createMockParams(HIGH, ILC),
    [CILC]: createMockParams(HIGH, CILC),
    [REFER]: createMockParams(HIGH, REFER),
    [UNLISTED]: createMockParams(HIGH, UNLISTED),
    [NO]: createMockParams(HIGH, NO),
  },
  VERY_HIGH: {
    [YES]: createMockParams(VERY_HIGH, YES),
    [ILC]: createMockParams(VERY_HIGH, ILC),
    [CILC]: createMockParams(VERY_HIGH, CILC),
    [REFER]: createMockParams(VERY_HIGH, REFER),
    [UNLISTED]: createMockParams(VERY_HIGH, UNLISTED),
    [NO]: createMockParams(VERY_HIGH, NO),
  },
};

describe('helpers/map-CIS-countries/map-CIS-country/no-insurance-support/c-and-d-rating-conditions - rating as C', () => {
  describe(`when the ESRA classification is ${STANDARD}`, () => {
    describe.each(params.STANDARD[YES])(`when the short term cover is ${YES}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.STANDARD[ILC])(`when the short term cover is ${ILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.STANDARD[CILC])(`when the short term cover is ${CILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.STANDARD[REFER])(`when the short term cover is ${REFER}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.STANDARD[UNLISTED])(`when the short term cover is ${UNLISTED}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.STANDARD[NO])(`when the short term cover is ${NO}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });
  });

  describe(`when the ESRA classification is ${HIGH}`, () => {
    describe.each(params.HIGH[YES])(`when the short term cover is ${YES}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.HIGH[ILC])(`when the short term cover is ${ILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.HIGH[CILC])(`when the short term cover is ${CILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.HIGH[REFER])(`when the short term cover is ${REFER}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.HIGH[UNLISTED])(`when the short term cover is ${UNLISTED}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.HIGH[NO])(`when the short term cover is ${NO}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });
  });

  describe(`when the ESRA classification is ${VERY_HIGH}`, () => {
    describe.each(params.VERY_HIGH[YES])(`when the short term cover is ${YES}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.VERY_HIGH[ILC])(`when the short term cover is ${ILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.VERY_HIGH[CILC])(`when the short term cover is ${CILC}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.VERY_HIGH[REFER])(`when the short term cover is ${REFER}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.VERY_HIGH[UNLISTED])(`when the short term cover is ${UNLISTED}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });

    describe.each(params.VERY_HIGH[NO])(`when the short term cover is ${NO}`, (countryObj) => {
      it(`should return true for ${countryObj.countryRating}`, () => {
        const result = cAndDRatingConditions(countryObj);

        expect(result).toEqual(true);
      });
    });
  });
});
