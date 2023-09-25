import generateSummaryListRows, { generateItemText } from '.';
import getKeyText from '../get-key-text';
import { LINKS } from '../../../content-strings';
import replaceCharacterCodesWithCharacters from '../../replace-character-codes-with-characters';
import { generateFields } from '../quote-summary-list';
import mapQuoteToContent from '../../data-content-mappings/map-quote-to-content';
import { mockQuote } from '../../../test-mocks';
import { SummaryListItemData } from '../../../../types';

describe('server/helpers/summary-lists/generate-summary-list-rows', () => {
  describe('generateItemText', () => {
    describe('when renderChangeLink is true', () => {
      it(`should return ${LINKS.CHANGE}`, () => {
        const result = generateItemText(true);

        expect(result).toEqual(LINKS.CHANGE);
      });
    });

    describe('when renderChangeLink is false', () => {
      it(`should return ${LINKS.ADD}`, () => {
        const result = generateItemText(false);

        expect(result).toEqual(LINKS.ADD);
      });
    });

    describe('when renderChangeLink is not provided', () => {
      it(`should return ${LINKS.ADD}`, () => {
        const result = generateItemText();

        expect(result).toEqual(LINKS.ADD);
      });
    });
  });

  describe('generateSummaryListRows', () => {
    const mockQuoteContent = mapQuoteToContent(mockQuote);
    const fields = generateFields(mockQuoteContent);

    const expectedObjBase = (field: SummaryListItemData) => ({
      classes: '',
      key: {
        text: getKeyText(field),
        classes: `${field.id}-key govuk-!-width-one-half`,
      },
      value: {
        classes: `${field.id}-value`,
      },
      actions: {
        items: [],
      },
    });

    it('returns an array of objects mapped to answers/content', () => {
      const result = generateSummaryListRows(fields);

      const expectedObj = (field: SummaryListItemData) => {
        const initObj = expectedObjBase(field);

        const mapped = {
          ...initObj,
          value: {
            text: replaceCharacterCodesWithCharacters(field.value),
            html: field.value,
            classes: `${field.id}-value`,
          },
        };

        return mapped;
      };

      expect(result).toBeInstanceOf(Array);

      const expected = expectedObj(fields[2]);
      expect(result[2]).toEqual(expected);
    });

    describe('when a field has renderChangeLink', () => {
      it('should add a link to action.times', () => {
        const mockField = {
          id: 'mock',
          title: 'Test',
          value: 'mock',
          renderChangeLink: true,
          href: '/page#field-label',
        };

        const result = generateSummaryListRows([mockField]);

        const expected = [
          {
            href: mockField.href,
            text: generateItemText(mockField.renderChangeLink),
            visuallyHiddenText: mockField.title,
            attributes: {
              'data-cy': `${mockField.id}-change-link`,
            },
            classes: '',
          },
        ];

        expect(result[0].actions.items).toEqual(expected);
      });
    });

    describe('when whiteText param is passed', () => {
      it('should add a class to each row', () => {
        const whiteText = true;

        const result = generateSummaryListRows(fields, whiteText);

        expect(result[0].classes).toEqual('ukef-white-text');
        expect(result[1].classes).toEqual('ukef-white-text');
      });

      it('should add a class to each change link', () => {
        const whiteText = true;

        const result = generateSummaryListRows(fields, whiteText);

        expect(result[0].actions.items[0].classes).toEqual('ukef-white-text no-visited-state');
      });
    });
  });
});
