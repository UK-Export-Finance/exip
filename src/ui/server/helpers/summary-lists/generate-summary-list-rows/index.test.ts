import generateSummaryListRows from '.';
import getKeyText from '../get-key-text';
import { LINKS } from '../../../content-strings';
import { generateFields } from '../quote-summary-list';
import mapQuoteToContent from '../../data-content-mappings/map-quote-to-content';
import { mockQuote } from '../../../test-mocks';
import { SummaryListItemData } from '../../../../types';

describe('server/helpers/summary-lists/generate-summary-list-rows', () => {
  const mockQuoteContent = mapQuoteToContent(mockQuote);
  const fields = generateFields(mockQuoteContent);

  const expectedObjBase = (field: SummaryListItemData) => ({
    classes: 'ukef-white-text',
    key: {
      text: getKeyText(fields, field.id),
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
