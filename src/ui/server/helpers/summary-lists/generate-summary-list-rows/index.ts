import getKeyText from '../get-key-text';
import { LINKS } from '../../../content-strings';
import { SummaryListItemData, SummaryListItem } from '../../../../types';

// TODO optional govuk-link--no-visited-state
// this is only required for the quote summary list.

/**
 * generateSummaryListRows
 * Map an array of fields with values for govukSummaryList component
 * @param {Array} Array of fields and answers
 * @returns {Array} Array of fields/answers in govukSummaryList data structure
 */
const generateSummaryListRows = (fields: Array<SummaryListItemData>): Array<SummaryListItem> =>
  fields.map((field: SummaryListItemData): SummaryListItem => {
    const mapped = {
      classes: 'ukef-white-text',
      key: {
        text: getKeyText(fields, field.id),
        classes: `${field.id}-key govuk-!-width-one-half`,
      },
      value: {
        text: field.value.text,
        classes: `${field.id}-value`,
      },
      actions: {
        items: [],
      },
    } as SummaryListItem;

    if (field.renderChangeLink) {
      mapped.actions.items.push({
        href: field.href,
        text: LINKS.CHANGE,
        visuallyHiddenText: field.title,
        attributes: {
          'data-cy': `${field.id}-change-link`,
        },
        classes: 'ukef-white-text govuk-link--no-visited-state',
      });
    }

    return mapped;
  });

export default generateSummaryListRows;
