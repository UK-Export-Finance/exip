import { LINKS } from '../../../content-strings';
import { SummaryListItemData, SummaryListItem } from '../../../../types';

/**
 * generateSummaryListRows
 * Map an array of fields with values for govukSummaryList component
 * @param {Array} Array of fields and answers
 * @param {Boolean} Add white text classes
 * @returns {Array} Array of fields/answers in govukSummaryList data structure
 */
const generateSummaryListRows = (fields: Array<SummaryListItemData>, whiteText?: boolean): Array<SummaryListItem> => {
  let rowClasses = '';
  let changeLinkClasses = '';

  if (whiteText) {
    rowClasses = 'ukef-white-text';
    changeLinkClasses = 'ukef-white-text no-visited-state';
  }

  return fields.map((field: SummaryListItemData): SummaryListItem => {
    const mapped = {
      classes: rowClasses,
      key: {
        text: field.title,
        classes: `${field.id}-key govuk-!-width-one-half`,
      },
      value: {
        text: field.value,
        html: field.value,
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
        classes: changeLinkClasses,
      });
    }

    return mapped;
  });
};

export default generateSummaryListRows;
