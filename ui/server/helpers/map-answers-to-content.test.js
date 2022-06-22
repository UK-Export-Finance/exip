const {
  mapCountry,
  mapCurrency,
  mapPeriodDays,
  mapPeriodMonths,
  mapPreCreditPeriod,
  mapPolicyType,
  mapPolicyLength,
  mapAnswersToContent,
} = require('./map-answers-to-content');
const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../constants');
const { SUMMARY_ANSWERS } = require('../content-strings');
const formatCurrency = require('./format-currency');
const { mockSession, mockAnswers } = require('../test-mocks');

const {
  VALID_COMPANY_BASE,
  BUYER_COUNTRY,
  TRIED_PRIVATE_COVER,
  UK_CONTENT_PERCENTAGE,
  CURRENCY,
  AMOUNT,
  PRE_CREDIT_PERIOD,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_TYPE,
  MULTI_POLICY_TYPE,
  POLICY_LENGTH,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

describe('sever/helpers/map-answers-to-content', () => {
  describe('mapCountry', () => {
    it('should return country name', () => {
      const country = mockSession.submittedData[FIELD_IDS.BUYER_COUNTRY];

      const result = mapCountry(country);

      const expected = `${country.name}`;

      expect(result).toEqual(expected);
    });

    describe('when there is no value', () => {
      it('should return a dash', () => {
        const result = mapCountry();

        expect(result).toEqual('-');
      });
    });
  });

  describe('mapCurrency', () => {
    it('should return a formatted string', () => {
      const currency = mockAnswers[FIELD_IDS.CURRENCY];

      const result = mapCurrency(currency);

      const expected = `${currency.name} (${currency.isoCode})`;

      expect(result).toEqual(expected);
    });

    describe('when there is no object/values', () => {
      it('should return a dash', () => {
        const result = mapCurrency();

        expect(result).toEqual('-');
      });
    });
  });

  describe('mapPeriodDays', () => {
    it('should return a formatted string', () => {
      const result = mapPeriodDays(20);

      const expected = '20 days';

      expect(result).toEqual(expected);
    });
  });

  describe('mapPeriodMonths', () => {
    it('should return a formatted string', () => {
      const result = mapPeriodMonths(20);

      const expected = '20 months';

      expect(result).toEqual(expected);
    });
  });

  describe('mapPreCreditPeriod', () => {
    it('should return a formatted string', () => {
      const result = mapPreCreditPeriod(20);

      const expected = mapPeriodDays(20);

      expect(result).toEqual(expected);
    });

    describe('when there is no value', () => {
      it('should return a dash', () => {
        const result = mapPreCreditPeriod();

        expect(result).toEqual('-');
      });
    });
  });

  describe('mapPolicyType', () => {
    describe('when policy type is single', () => {
      it(`should return an object with ${SINGLE_POLICY_TYPE}`, () => {
        const mockAnswersSinglePolicyType = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        };

        const result = mapPolicyType(mockAnswersSinglePolicyType);

        const expected = {
          [SINGLE_POLICY_TYPE]: mockAnswersSinglePolicyType[POLICY_TYPE],
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is single', () => {
      it(`should return an object with ${MULTI_POLICY_TYPE}`, () => {
        const mockAnswersMultiPolicyType = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        };

        const result = mapPolicyType(mockAnswersMultiPolicyType);

        const expected = {
          [MULTI_POLICY_TYPE]: mockAnswersMultiPolicyType[POLICY_TYPE],
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapPolicyLength', () => {
    describe('when policy type is single', () => {
      it(`should return an object with mapped ${SINGLE_POLICY_LENGTH}`, () => {
        const mockAnswersSinglePolicyType = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [POLICY_LENGTH]: 10,
        };

        const result = mapPolicyLength(mockAnswersSinglePolicyType);

        const expected = {
          [SINGLE_POLICY_LENGTH]: mapPeriodMonths(mockAnswersSinglePolicyType[POLICY_LENGTH]),
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      it(`should return an object with mapped ${MULTI_POLICY_LENGTH}`, () => {
        const mockAnswersSinglePolicyType = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [POLICY_LENGTH]: 10,
        };

        const result = mapPolicyLength(mockAnswersSinglePolicyType);

        const expected = {
          [MULTI_POLICY_LENGTH]: mapPeriodMonths(mockAnswersSinglePolicyType[POLICY_LENGTH]),
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapAnswersToContent', () => {
    it('should return an object of fields with mapped/formatted answers', () => {
      const result = mapAnswersToContent(mockAnswers);

      const expected = {
        [VALID_COMPANY_BASE]: SUMMARY_ANSWERS[VALID_COMPANY_BASE],
        [BUYER_COUNTRY]: mapCountry(mockAnswers[BUYER_COUNTRY]),
        [TRIED_PRIVATE_COVER]: SUMMARY_ANSWERS[TRIED_PRIVATE_COVER],
        [UK_CONTENT_PERCENTAGE]: SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE],
        [AMOUNT]: formatCurrency(mockAnswers[AMOUNT], 'GBP'),
        [CURRENCY]: mapCurrency(mockAnswers[CURRENCY]),
        [PRE_CREDIT_PERIOD]: mapPreCreditPeriod(mockAnswers[PRE_CREDIT_PERIOD]),
        [CREDIT_PERIOD]: mapPeriodDays(mockAnswers[CREDIT_PERIOD]),
        ...mapPolicyType(mockAnswers),
        ...mapPolicyLength(mockAnswers),
      };

      expect(result).toEqual(expected);
    });
  });
});
