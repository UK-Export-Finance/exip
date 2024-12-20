import hasNoSupport from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    COUNTRY_RATINGS,
    ESRA_CLASSIFICATION: { VERY_HIGH, HIGH, STANDARD, NONE },
    SHORT_TERM_COVER: { UNLISTED, CILC },
  },
} = EXTERNAL_API_DEFINITIONS;

const mockInitCountry = {
  esraClassification: NONE,
  shortTermCover: UNLISTED,
};

const createMockParams = (countryRating: string, esraClassification?: string, shortTermCover?: string) => {
  const params = {
    ...mockInitCountry,
    countryRating,
  };

  if (esraClassification) {
    params.esraClassification = esraClassification;
  }

  if (shortTermCover) {
    params.shortTermCover = shortTermCover;
  }

  return params;
};

const params = {
  firstConditions: [
    {
      country: createMockParams(COUNTRY_RATINGS.A[0]),
      description: 'A',
      expectation: true,
    },
    {
      country: createMockParams(COUNTRY_RATINGS.B[0]),
      description: 'B',
      expectation: true,
    },
    {
      country: createMockParams(COUNTRY_RATINGS.C[0]),
      description: 'C',
      expectation: true,
    },
    {
      country: createMockParams(COUNTRY_RATINGS.D[0]),
      description: 'D',
      expectation: true,
    },
    {
      country: createMockParams(COUNTRY_RATINGS.NOT_APPLICABLE),
      description: 'NOT_APPLICABLE',
      expectation: true,
    },
    {
      country: createMockParams('not recognised'),
      description: 'not recognised',
      expectation: false,
    },
  ],
  secondConditions: [
    {
      country: createMockParams(COUNTRY_RATINGS.NOT_APPLICABLE, STANDARD, CILC),
      description: 'STANDARD',
      expectation: true,
    },
    {
      country: createMockParams(COUNTRY_RATINGS.NOT_APPLICABLE, HIGH, CILC),
      description: 'HIGH',
      expectation: true,
    },
    {
      country: createMockParams(COUNTRY_RATINGS.NOT_APPLICABLE, VERY_HIGH, CILC),
      description: 'VERY_HIGH',
      expectation: true,
    },

    {
      country: createMockParams(COUNTRY_RATINGS.NOT_APPLICABLE, NONE, CILC),
      description: 'NONE',
      expectation: true,
    },
  ],
};

describe('helpers/map-CIS-countries/map-CIS-country/has-no-support', () => {
  describe(`when shortTermCover is ${UNLISTED} and esraClassification is ${NONE}`, () => {
    describe.each(params.firstConditions)('', ({ country, description, expectation }) => {
      describe(`when the countryRating is ${description}`, () => {
        it(`should return ${expectation}`, () => {
          const result = hasNoSupport(country);

          expect(result).toEqual(expectation);
        });
      });
    });
  });

  describe(`when shortTermCover is ${CILC} and countryRating is ${COUNTRY_RATINGS.NOT_APPLICABLE}`, () => {
    describe.each(params.secondConditions)('', ({ country, description, expectation }) => {
      describe(`when the esraClassification is ${description}`, () => {
        it(`should return ${expectation}`, () => {
          const result = hasNoSupport(country);

          expect(result).toEqual(expectation);
        });
      });
    });
  });
});
