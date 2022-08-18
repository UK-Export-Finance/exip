import { generateFields, generateSummaryListRows, quoteSummaryList } from './quote-summary-list';
import mapQuoteToContent from '../data-content-mappings/map-quote-to-content';
import { LINKS, QUOTE_TITLES } from '../../content-strings';
import { FIELD_IDS, ROUTES } from '../../constants';
import { mockQuote } from '../../test-mocks';
import { SummaryListItemData } from '../../../types';

const { BUYER_COUNTRY, CONTRACT_VALUE, MAX_AMOUNT_OWED, MULTI_POLICY_LENGTH, PERCENTAGE_OF_COVER, POLICY_LENGTH, QUOTE, SINGLE_POLICY_LENGTH } = FIELD_IDS;

const { INSURED_FOR, PREMIUM_RATE_PERCENTAGE, ESTIMATED_COST, BUYER_LOCATION } = QUOTE;

describe('server/helpers/summary-lists/quote-summary-list', () => {
  describe('generateFields', () => {
    it('should map over each field group with value from submittedData', () => {
      const mockQuoteContent = mapQuoteToContent(mockQuote);

      delete mockQuoteContent[SINGLE_POLICY_LENGTH];

      const result = generateFields(mockQuoteContent);

      const expected = [
        {
          id: PERCENTAGE_OF_COVER,
          title: QUOTE_TITLES[PERCENTAGE_OF_COVER],
          value: {
            text: mockQuoteContent[PERCENTAGE_OF_COVER].text,
          },
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`,
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
          href: `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`,
        },
      ];

      expect(result).toEqual(expected);
    });

    describe('when policy/policy length is single', () => {
      it(`should add an ${CONTRACT_VALUE} object`, () => {
        const mockQuoteContent = {
          ...mapQuoteToContent(mockQuote),
          [SINGLE_POLICY_LENGTH]: {
            text: 1,
          },
          [INSURED_FOR]: {
            text: '£123',
          },
          [CONTRACT_VALUE]: {
            text: '£567',
          },
        };

        const result = generateFields(mockQuoteContent);

        const expectedField = result[0];

        const expected = {
          id: FIELD_IDS.CONTRACT_VALUE,
          title: QUOTE_TITLES[CONTRACT_VALUE],
          value: {
            text: mockQuoteContent[CONTRACT_VALUE].text,
          },
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`,
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add an ${INSURED_FOR} object`, () => {
        const mockQuoteContent = {
          ...mapQuoteToContent(mockQuote),
          [SINGLE_POLICY_LENGTH]: {
            text: 1,
          },
          [INSURED_FOR]: {
            text: '£123',
          },
        };

        const result = generateFields(mockQuoteContent);

        const expectedField = result[2];

        const expected = {
          id: FIELD_IDS.QUOTE.INSURED_FOR,
          title: QUOTE_TITLES[`${QUOTE.INSURED_FOR}_SINGLE_POLICY`],
          value: {
            text: mockQuoteContent[INSURED_FOR].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add an ${SINGLE_POLICY_LENGTH} object`, () => {
        const mockQuoteContent = {
          ...mapQuoteToContent(mockQuote),
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
          href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`,
        };

        expect(expectedField).toEqual(expected);
      });
    });

    describe('when policy/policy length is multi', () => {
      it(`should add an ${MAX_AMOUNT_OWED} object`, () => {
        const mockQuoteContent = {
          ...mapQuoteToContent(mockQuote),
          [MULTI_POLICY_LENGTH]: {
            text: 1,
          },
          [INSURED_FOR]: {
            text: '£123',
          },
          [MAX_AMOUNT_OWED]: {
            text: '£567',
          },
        };

        const result = generateFields(mockQuoteContent);

        const expectedField = result[0];

        const expected = {
          id: FIELD_IDS.MAX_AMOUNT_OWED,
          title: QUOTE_TITLES[MAX_AMOUNT_OWED],
          value: {
            text: mockQuoteContent[MAX_AMOUNT_OWED].text,
          },
          renderChangeLink: true,
          href: `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`,
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add an ${INSURED_FOR} object`, () => {
        const mockQuoteContent = {
          ...mapQuoteToContent(mockQuote),
          [MULTI_POLICY_LENGTH]: {
            text: 1,
          },
          [INSURED_FOR]: {
            text: '£123',
          },
          [MAX_AMOUNT_OWED]: {
            text: '£567',
          },
        };

        delete mockQuoteContent[SINGLE_POLICY_LENGTH];

        const result = generateFields(mockQuoteContent);

        const expectedField = result[2];

        const expected = {
          id: FIELD_IDS.QUOTE.INSURED_FOR,
          title: QUOTE_TITLES[`${QUOTE.INSURED_FOR}_MULTI_POLICY`],
          value: {
            text: mockQuoteContent[INSURED_FOR].text,
          },
        };

        expect(expectedField).toEqual(expected);
      });

      it(`should add an ${MULTI_POLICY_LENGTH} object`, () => {
        const mockQuoteContent = {
          ...mapQuoteToContent(mockQuote),
          [MULTI_POLICY_LENGTH]: {
            text: 1,
          },
          [MAX_AMOUNT_OWED]: {
            text: '£567',
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
          href: `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${MULTI_POLICY_LENGTH}-label`,
        };

        expect(expectedField).toEqual(expected);
      });
    });
  });

  describe('generateSummaryListRows', () => {
    const expectedObjBase = (field: SummaryListItemData) => ({
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

      const result = generateSummaryListRows(fields);

      const expectedObj = (field: SummaryListItemData) => {
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

      const expected = expectedObj(fields[2]);
      expect(result[2]).toEqual(expected);
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
          href: '/page#field-label',
        };

        const result = generateSummaryListRows([mockField]);

        const expected = [
          {
            href: mockField.href,
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

      const result = quoteSummaryList(mockQuoteContent);

      const fields = generateFields(mockQuoteContent);
      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
