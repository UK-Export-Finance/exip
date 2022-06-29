const {
  generateFields,
  generateSummaryListRows,
  generateQuoteSummaryList,
} = require('./generate-quote-summary-list');
const {
  LINKS,
  QUOTE_TITLES,
} = require('../content-strings');
const {
  FIELD_IDS,
  ROUTES,
} = require('../constants');
const { mockAnswers } = require('../test-mocks');

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
      const mockAnswersNoPolicyLength = mockAnswers;
      delete mockAnswersNoPolicyLength[POLICY_LENGTH];

      const result = generateFields(mockAnswersNoPolicyLength);

      const expected = [
        {
          id: INSURED_FOR,
          title: QUOTE_TITLES[INSURED_FOR],
          value: mockAnswers[AMOUNT],
          renderChangeLink: true,
          changeRoute: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        },
        {
          id: PREMIUM_RATE_PERCENTAGE,
          title: QUOTE_TITLES[PREMIUM_RATE_PERCENTAGE],
          value: '1.1% mock',
        },
        {
          id: ESTIMATED_COST,
          title: QUOTE_TITLES[ESTIMATED_COST],
          value: '123 mock',
        },
        {
          id: BUYER_LOCATION,
          title: QUOTE_TITLES[BUYER_LOCATION],
          value: mockAnswers[BUYER_COUNTRY],
          renderChangeLink: true,
          changeRoute: ROUTES.BUYER_BASED_CHANGE,
        },
      ];

      expect(result).toEqual(expected);
    });

    describe('when policy length is single', () => {
      it(`should add a ${SINGLE_POLICY_LENGTH} object`, () => {
        const mockAnswersSinglePolicyLength = {
          ...mockAnswers,
          [SINGLE_POLICY_LENGTH]: 1,
        };

        const result = generateFields(mockAnswersSinglePolicyLength);

        const expectedField = result[result.length - 2];

        const expected = {
          id: FIELD_IDS.SINGLE_POLICY_LENGTH,
          title: QUOTE_TITLES[POLICY_LENGTH],
          value: mockAnswersSinglePolicyLength[SINGLE_POLICY_LENGTH],
          renderChangeLink: true,
          changeRoute: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy length is multi', () => {
      it(`should add a ${MULTI_POLICY_LENGTH} object`, () => {
        const mockAnswersMultiPolicyLength = {
          ...mockAnswers,
          [MULTI_POLICY_LENGTH]: 2,
        };

        const result = generateFields(mockAnswersMultiPolicyLength);

        const expectedField = result[result.length - 2];

        const expected = {
          id: FIELD_IDS.MULTI_POLICY_LENGTH,
          title: QUOTE_TITLES[POLICY_LENGTH],
          value: mockAnswersMultiPolicyLength[MULTI_POLICY_LENGTH],
          renderChangeLink: true,
          changeRoute: ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE,
        };

        expect(expectedField).toEqual(expected);
      });
    });
  });

  describe('generateSummaryListRows', () => {
    it('returns an array of objects mapped to submitted data', () => {
      const fields = generateFields(mockAnswers);

      const result = generateSummaryListRows(
        fields,
        mockAnswers,
      );

      const expectedObj = (field) => {
        const mapped = {
          classes: 'ukef-white-text',
          key: {
            text: field.title,
            classes: `${field.id}-key govuk-!-width-one-half`,
          },
          value: {
            text: field.value,
            classes: `${field.id}-value`,
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

  describe('generateSummaryList', () => {
    it('should return an object with multiple summary lists', () => {
      const result = generateQuoteSummaryList(mockAnswers);

      const fields = generateFields(mockAnswers);
      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
