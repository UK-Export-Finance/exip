const {
  generateFields,
  generateSummaryListRows,
  generateQuoteSummaryList,
} = require('./generate-quote-summary-list');
const mapQuoteToContent = require('./data-content-mappings/map-quote-to-content');
const { QUOTE_TITLES, LINKS } = require('../content-strings');
const {
  FIELD_IDS,
  ROUTES,
} = require('../constants');
const { mockQuote } = require('../test-mocks');

const {
  AMOUNT,
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
  describe('generateFields', () => {
    it('should map over each field group with value from submittedData', () => {
      const mockQuoteContent = mapQuoteToContent(mockQuote);

      delete mockQuoteContent[SINGLE_POLICY_LENGTH];

      const result = generateFields(mockQuoteContent);

      const expected = [
        {
          id: AMOUNT,
          title: QUOTE_TITLES[INSURED_FOR],
          value: {
            text: mockQuoteContent[AMOUNT].text,
          },
          renderChangeLink: true,
          changeRoute: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
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
          changeRoute: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
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
          changeRoute: ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE,
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
        items: [
          {
            text: '',
          },
        ],
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

    describe('when a field has renderChangeLink', () => {
      it('should add a link to action.itmes', () => {
        const mockField = {
          id: 'mock',
          title: 'Test',
          value: {
            text: 'mock',
          },
          renderChangeLink: true,
        };

        const result = generateSummaryListRows([mockField]);

        const expected = [
          {
            href: `${mockField.changeRoute}#${mockField.id}`,
            text: LINKS.CHANGE,
            visuallyHiddenText: mockField.title,
            attributes: {
              'data-cy': `${mockField.id}-change-link`,
            },
            classes: 'ukef-white-text govuk-link--no-visited-state',
          },
        ];

        expect(result[0].actions.items).toEqual(expected);
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
