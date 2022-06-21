const {
  mapCountry,
  mapCurrency,
  mapPeriodDays,
  mapPeriodMonths,
  mapPreCreditPeriod,
  mapAnswersToContent,
} = require('./map-answers-to-content');
const FIELD_IDS = require('../constants/field-ids');
const { SUMMARY_ANSWERS } = require('../content-strings');
const formatCurrency = require('./format-currency');
const { mockSession, mockAnswers } = require('../test-mocks');

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

  describe('mapAnswersToContent', () => {
    it('should return an object of fields with mapped/formatted answers', () => {
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
        POLICY_LENGTH,
      } = FIELD_IDS;

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
        [POLICY_TYPE]: mockAnswers[POLICY_TYPE],
        [POLICY_LENGTH]: mapPeriodMonths(mockAnswers[POLICY_LENGTH]),
      };

      expect(result).toEqual(expected);
    });
  });
});
