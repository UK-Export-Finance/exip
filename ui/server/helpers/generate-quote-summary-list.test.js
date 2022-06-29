const {
  insuredForFieldValue,
  generateFields,
  generateSummaryListRows,
  generateQuoteSummaryList,
} = require('./generate-quote-summary-list');
const { mapQuoteToContent } = require('./map-quote-to-content');
const {
  LINKS,
  QUOTE_TITLES,
} = require('../content-strings');
const {
  FIELD_IDS,
  ROUTES,
} = require('../constants');
const { mockQuote } = require('../test-mocks');

const {
  POLICY_LENGTH,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  BUYER_COUNTRY,
  QUOTE,
} = FIELD_IDS;

const {
  INSURED_FOR,
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
  BUYER_LOCATION,
} = QUOTE;

describe('sever/helpers/generate-quote-summary-list', () => {
  describe('insuredForFieldValue', () => {
    describe('when field value has additionalText', () => {
      it('should return element with field text and additionalText', () => {
        const mockValue = {
          text: 'Test',
          additionalText: 'Mock',
        };

        const result = insuredForFieldValue(mockValue);

        const expected = `<span>${mockValue.text}<br> <small>${mockValue.additionalText}</small></span>`;

        expect(result).toEqual(expected);
      });
    });

    describe('when field value does NOT have additionalText', () => {
      it('should return element with field text', () => {
        const mockValue = {
          text: 'Test',
        };

        const result = insuredForFieldValue(mockValue);

        const expected = `<span>${mockValue.text}</span>`;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('generateFields', () => {
    it('should map over each field group with value from submittedData', () => {
      const mockQuoteContent = mapQuoteToContent(mockQuote);

      delete mockQuoteContent[SINGLE_POLICY_LENGTH];

      const result = generateFields(mockQuoteContent);

      const expected = [
        {
          id: INSURED_FOR,
          title: QUOTE_TITLES[INSURED_FOR],
          value: {
            html: insuredForFieldValue(mockQuoteContent[INSURED_FOR]),
          },
          renderChangeLink: true,
          changeRoute: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        },
        {
          id: PREMIUM_RATE_PERCENTAGE,
          title: QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE],
          value: {
            text: mockQuoteContent[PREMIUM_RATE_PERCENTAGE].text,
          },
        },
        {
          id: ESTIMATED_COST,
          title: QUOTE_TITLES[ESTIMATED_COST],
          value: {
            text: mockQuoteContent[ESTIMATED_COST].text,
          },
        },
        {
          id: BUYER_LOCATION,
          title: QUOTE_TITLES[BUYER_LOCATION],
          value: {
            text: mockQuoteContent[BUYER_COUNTRY].text,
          },
          renderChangeLink: true,
          changeRoute: ROUTES.BUYER_BASED_CHANGE,
        },
      ];

      expect(result).toEqual(expected);
    });

    describe('when policy length is single', () => {
      it(`should add a ${SINGLE_POLICY_LENGTH} object`, () => {
        let mockQuoteContent = mapQuoteToContent(mockQuote);

        mockQuoteContent = {
          ...mockQuoteContent,
          [SINGLE_POLICY_LENGTH]: {
            text: 1,
          },
        };

        const result = generateFields(mockQuoteContent);

        const expectedField = result[result.length - 2];

        const expected = {
          id: FIELD_IDS.SINGLE_POLICY_LENGTH,
          title: QUOTE_TITLES[POLICY_LENGTH],
          value: {
            text: mockQuoteContent[SINGLE_POLICY_LENGTH].text,
          },
          renderChangeLink: true,
          changeRoute: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy length is multi', () => {
      it(`should add a ${MULTI_POLICY_LENGTH} object`, () => {
        let mockQuoteContent = mapQuoteToContent(mockQuote);

        mockQuoteContent = {
          ...mockQuoteContent,
          [MULTI_POLICY_LENGTH]: {
            text: 2,
          },
        };

        const result = generateFields(mockQuoteContent);

        const expectedField = result[result.length - 2];

        const expected = {
          id: FIELD_IDS.MULTI_POLICY_LENGTH,
          title: QUOTE_TITLES[POLICY_LENGTH],
          value: {
            text: mockQuoteContent[MULTI_POLICY_LENGTH].text,
          },
          renderChangeLink: true,
          changeRoute: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        };

        expect(expectedField).toEqual(expected);
      });
    });
  });

  describe('generateSummaryListRows', () => {
    const expectedObjBase = (field) => ({
      classes: 'ukef-white-text',
      key: {
        text: field.title,
        classes: `${field.id}-key govuk-!-width-one-half`,
      },
      value: {
        classes: `${field.id}-value`,
      },
      actions: {
        items: [],
      },
    });

    it('returns an array of objects mapped to quote content', () => {
      const mockQuoteContent = mapQuoteToContent(mockQuote);

      const fields = generateFields(mockQuoteContent);

      const result = generateSummaryListRows(
        fields,
      );

      const expectedObj = (field) => {
        const initObj = expectedObjBase(field);

        const mapped = {
          ...initObj,
          value: {
            ...initObj.value,
            text: field.value.text,
          },
        };
        return mapped;
      };

      expect(result).toBeInstanceOf(Array);

      const expected = expectedObj(fields[1]);
      expect(result[1]).toEqual(expected);
    });

    describe('when a field has html value instead of text and renderChangeLink', () => {
      it('returns an object with value.html and change link', () => {
        const mockQuoteContent = mapQuoteToContent(mockQuote);

        const fields = generateFields(mockQuoteContent);

        const result = generateSummaryListRows(
          fields,
        );

        const expectedObj = (field) => {
          const initObj = expectedObjBase(field);

          const mapped = {
            ...initObj,
            value: {
              ...initObj.value,
              html: field.value.html,
            },
            actions: {
              items: [
                {
                  href: `${field.changeRoute}#${field.id}`,
                  text: LINKS.CHANGE,
                  visuallyHiddenText: field.title,
                  attributes: {
                    'data-cy': `${field.id}-change-link`,
                  },
                  classes: 'ukef-white-text govuk-link--no-visited-state',
                },
              ],
            },
          };
          return mapped;
        };

        expect(result).toBeInstanceOf(Array);

        const expected = expectedObj(fields[0]);
        expect(result[0]).toEqual(expected);
      });
    });
  });

  describe('generateSummaryList', () => {
    it('should return an object with multiple summary lists', () => {
      const mockQuoteContent = mapQuoteToContent(mockQuote);

      const result = generateQuoteSummaryList(mockQuoteContent);

      const fields = generateFields(mockQuoteContent);
      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
